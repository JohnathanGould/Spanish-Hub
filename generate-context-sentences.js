'use strict';

// generate-context-sentences.js
// Reads paths.js + words.js, generates a vocabulary-constrained contextSentence
// for every word via the Anthropic API, then writes words.js back in place.
//
// Usage:
//   ANTHROPIC_API_KEY=sk-ant-... node generate-context-sentences.js
//   ANTHROPIC_API_KEY=sk-ant-... node generate-context-sentences.js --test
//
// --test  Process only the first 5 words, log results to console, do NOT
//         write anything to words.js. Use this to verify parsing and API
//         output before running the full generation.

const https = require('https');
const fs    = require('fs');
const path  = require('path');

// ─── Config ───────────────────────────────────────────────────────────────────

const API_KEY = process.env.ANTHROPIC_API_KEY;
if (!API_KEY) {
  console.error('ERROR: ANTHROPIC_API_KEY is not set.');
  console.error('Usage: ANTHROPIC_API_KEY=sk-ant-... node generate-context-sentences.js');
  process.exit(1);
}

const TEST_MODE = process.argv.includes('--test');
const FIX_MODE  = process.argv.includes('--fix');

const PATHS_FILE     = path.join(__dirname, 'frontend/src/content/es-en/paths.js');
const WORDS_FILE     = path.join(__dirname, 'frontend/src/content/es-en/words.js');
const BATCH_SIZE     = 10;
const BATCH_DELAY_MS = 1000;
const MODEL          = 'claude-sonnet-4-6';

// ─── Step 1: Build vocabulary maps from paths.js ──────────────────────────────
//
// Path IDs  : 'path1' … 'path13'  (id: 'pathN')
// Stop IDs  : 'p1s1', 'p1s2' …   (id: 'pNsM') — different prefix, won't collide
//
// The regex /\bid:\s*['"]path(\d+)['"]/g therefore matches ONLY path-level IDs.

function buildVocabMaps(src) {
  const pathIdRe  = /\bid:\s*['"]path(\d+)['"]/g;
  const positions = [];
  let m;

  while ((m = pathIdRe.exec(src)) !== null) {
    positions.push({ num: parseInt(m[1], 10), idx: m.index });
  }

  if (!positions.length) {
    throw new Error('No path IDs found in paths.js — check file format.');
  }

  const ownWords  = {};   // pathNum → string[] (words introduced in that path only)
  const wordToPath = {};  // word.es → pathNum of first introduction

  for (let i = 0; i < positions.length; i++) {
    const num   = positions[i].num;
    const start = positions[i].idx;
    const end   = i + 1 < positions.length ? positions[i + 1].idx : src.length;
    const slice = src.slice(start, end);

    // Extract every  words: ['a', 'b', ...]  block within this path section
    const wordsBlockRe = /words:\s*\[([^\]]*)\]/g;
    ownWords[num] = [];
    let wb;

    while ((wb = wordsBlockRe.exec(slice)) !== null) {
      const inner  = wb[1];
      // Pull each quoted string out of the array literal
      const strRe  = /['"]([^'"\\]*(?:\\.[^'"\\]*)*)['"]/g;
      let   sr;
      while ((sr = strRe.exec(inner)) !== null) {
        const word = sr[1];
        ownWords[num].push(word);
        if (!(word in wordToPath)) wordToPath[word] = num;
      }
    }
  }

  // Build cumulative vocab: each path's floor = all words up to and including it
  const sortedNums = positions.map(p => p.num).sort((a, b) => a - b);
  const vocabByPath = {};
  const running     = [];

  for (const n of sortedNums) {
    running.push(...(ownWords[n] || []));
    vocabByPath[n] = [...running];
  }

  const maxPath = sortedNums[sortedNums.length - 1];
  console.log(`  paths found: ${sortedNums.length}`);
  console.log(`  words mapped to paths: ${Object.keys(wordToPath).length}`);
  console.log(`  vocab[3]=${vocabByPath[3]?.length ?? 0}, vocab[${maxPath}]=${vocabByPath[maxPath]?.length ?? 0}`);

  return { vocabByPath, wordToPath, maxPath };
}

// ─── Step 2: Parse word entries from words.js ─────────────────────────────────
//
// Strategy: scan the file for each  contextSentence: "..."  occurrence.
// For each, scan backwards through the source to find the opening { of the
// enclosing object (tracking brace depth to skip nested sub-objects like
// sentence: { es: '...', en: '...' }), then extract es / en / type from
// that fragment.

function findObjectStart(src, pos) {
  let depth = 0;
  for (let i = pos - 1; i >= 0; i--) {
    if      (src[i] === '}') depth++;
    else if (src[i] === '{') {
      if (depth === 0) return i;
      depth--;
    }
  }
  return -1;
}

function parseWords(src) {
  const entries = [];
  // Matches both single- and double-quoted contextSentence values,
  // correctly handling backslash-escaped characters inside the string.
  const csRe = /contextSentence:\s*(['"])((?:(?!\1)[^\\]|\\[\s\S])*)\1/g;
  let m;

  while ((m = csRe.exec(src)) !== null) {
    const quote           = m[1];
    const contextSentence = m[2];
    const objStart        = findObjectStart(src, m.index);
    if (objStart === -1) continue;

    const fragment = src.slice(objStart, m.index);

    // \b ensures we match the field name exactly (not e.g. "contextSentence" again)
    const esM   = fragment.match(/\bes:\s*(['"])((?:(?!\1)[^\\]|\\[\s\S])*)\1/);
    if (!esM) continue;

    const enM   = fragment.match(/\ben:\s*(['"])((?:(?!\1)[^\\]|\\[\s\S])*)\1/);
    const typeM = fragment.match(/\btype:\s*(['"])((?:(?!\1)[^\\]|\\[\s\S])*)\1/);

    entries.push({
      es:              esM[2],
      en:              enM?.[2]   ?? '',
      type:            typeM?.[2] ?? '',
      contextSentence,
      quote,
    });
  }

  return entries;
}

// ─── Step 3: Determine available vocabulary per word ─────────────────────────
//
// - Word introduced in path N  → floor = max(N, 3), use vocabByPath[floor]
// - Word not in any path (orphaned) → use vocabByPath[maxPath] (all 522 words)

function vocabFor(word, vocabByPath, wordToPath, maxPath) {
  const p = wordToPath[word.es];
  if (p === undefined) return vocabByPath[maxPath] || [];
  const floor = Math.max(p, 3);
  return vocabByPath[floor] || vocabByPath[maxPath] || [];
}

// ─── Step 4: Anthropic API call ───────────────────────────────────────────────

function callAPI(word, vocab) {
  return new Promise((resolve, reject) => {
    const userContent =
`You are writing example sentences for a Spanish language learning app.

Word: "${word.es}" (${word.en}) — type: ${word.type}

Write ONE short, natural Spanish sentence (5–10 words) that:
1. Contains the word "${word.es}" exactly as written
2. Uses ONLY words from this allowed vocabulary list: ${JSON.stringify(vocab)}
3. Is natural and idiomatic Spanish
4. Is appropriate for A1/A2 beginners

CRITICAL: You may ONLY use words that appear in the allowed vocabulary list above.
Do not use any Spanish word not in that list, except for:
- Punctuation (¿ ¡ . , !)
- The numbers 1-10 written as digits
- Proper nouns that are place names (México, España, etc.)

Reply with ONLY the sentence. No explanation. No quotes. No punctuation outside the sentence.`;

    const body = JSON.stringify({
      model: MODEL,
      max_tokens: 150,
      messages: [{ role: 'user', content: userContent }],
    });

    const req = https.request(
      {
        hostname: 'api.anthropic.com',
        path:     '/v1/messages',
        method:   'POST',
        headers: {
          'x-api-key':        API_KEY,
          'anthropic-version': '2023-06-01',
          'content-type':     'application/json',
          'content-length':   Buffer.byteLength(body),
        },
      },
      (res) => {
        let raw = '';
        res.on('data', chunk => (raw += chunk));
        res.on('end', () => {
          try {
            const json = JSON.parse(raw);
            if (json.error) {
              return reject(new Error(json.error.message || JSON.stringify(json.error)));
            }
            let text = (json.content?.[0]?.text || '').trim();
            // Take only the first sentence — strip any model reasoning that
            // appeared after the response
            text = text.split('\n')[0].trim();
            // Also strip any trailing incomplete text after the last punctuation
            const lastPunct = Math.max(
              text.lastIndexOf('.'),
              text.lastIndexOf('!'),
              text.lastIndexOf('?')
            );
            if (lastPunct > 0) text = text.substring(0, lastPunct + 1);
            resolve(text);
          } catch (e) {
            reject(new Error(`Unparseable API response: ${raw.slice(0, 120)}`));
          }
        });
      }
    );

    req.on('error', reject);
    req.write(body);
    req.end();
  });
}

// Returns true if the sentence contains 3 or more consecutive ASCII-only words
// (a sign of English leaking into what should be a Spanish sentence)
function hasConsecutiveEnglishWords(s, n = 3) {
  const tokens = s.split(/[\s,\.!?¿¡]+/).filter(Boolean);
  let run = 0;
  for (const t of tokens) {
    if (/^[a-zA-Z]+$/.test(t)) {
      if (++run >= n) return true;
    } else {
      run = 0;
    }
  }
  return false;
}

function needsFix(word) {
  const cs = word.contextSentence;
  return cs.includes('Wait') || hasConsecutiveEnglishWords(cs);
}

const REFUSAL_PHRASES = ["i cannot", "i'm sorry", "i can't", "i am sorry", "as an ai"];
function looksLikeRefusal(s) {
  const low = s.toLowerCase();
  return REFUSAL_PHRASES.some(p => low.includes(p));
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {

  // ── Step 1 ────────────────────────────────────────────────────────────────
  console.log('Step 1 — building vocabulary maps from paths.js');
  const pathsSrc = fs.readFileSync(PATHS_FILE, 'utf8');
  const { vocabByPath, wordToPath, maxPath } = buildVocabMaps(pathsSrc);

  // ── Step 2 ────────────────────────────────────────────────────────────────
  console.log('\nStep 2 — parsing words.js');
  const wordsSrc  = fs.readFileSync(WORDS_FILE, 'utf8');
  const allWords  = parseWords(wordsSrc);
  console.log(`  ${allWords.length} entries with contextSentence found`);
  console.log(`  vocab floor (path 3): ${vocabByPath[3]?.length ?? 0} words`);

  if (!allWords.length) {
    console.error('No words parsed — aborting.');
    process.exit(1);
  }

  let words = TEST_MODE ? allWords.slice(0, 5) : allWords;

  if (TEST_MODE) {
    console.log('\n*** TEST MODE — processing first 5 words only, words.js will NOT be written ***');
  }

  if (FIX_MODE) {
    const fixable = allWords.filter(needsFix);
    console.log(`\n*** FIX MODE — ${fixable.length} of ${allWords.length} words qualify for reprocessing ***`);
    words = fixable;
  }

  // ── Step 4 — generate in batches ─────────────────────────────────────────
  console.log(`\nStep 4 — generating sentences`);
  console.log(`  ${words.length} words · batches of ${BATCH_SIZE} · ${BATCH_DELAY_MS}ms between batches`);

  const results      = [];
  const totalBatches = Math.ceil(words.length / BATCH_SIZE);

  for (let b = 0; b < words.length; b += BATCH_SIZE) {
    const batch  = words.slice(b, b + BATCH_SIZE);
    const bNum   = Math.floor(b / BATCH_SIZE) + 1;
    process.stdout.write(`\n  [${String(bNum).padStart(2)}/${totalBatches}] `);

    const batchResults = await Promise.all(
      batch.map(async (word) => {
        const vocab = vocabFor(word, vocabByPath, wordToPath, maxPath);
        try {
          const sentence = await callAPI(word, vocab);

          if (!sentence) {
            process.stdout.write('·');
            return { word, sentence: null, fail: 'empty response' };
          }
          if (looksLikeRefusal(sentence)) {
            process.stdout.write('✗');
            return { word, sentence: null, fail: `refusal: ${sentence.slice(0, 60)}` };
          }

          process.stdout.write('✓');
          return { word, sentence, fail: null };
        } catch (err) {
          process.stdout.write('✗');
          return { word, sentence: null, fail: err.message };
        }
      })
    );

    results.push(...batchResults);

    if (b + BATCH_SIZE < words.length) {
      await sleep(BATCH_DELAY_MS);
    }
  }

  // ── Test mode: log results and exit without touching words.js ───────────
  if (TEST_MODE) {
    console.log('\n\n*** TEST RESULTS (words.js not modified) ***\n');
    for (const { word, sentence, fail } of results) {
      const pathNum = wordToPath[word.es];
      const floor   = pathNum !== undefined ? Math.max(pathNum, 3) : maxPath;
      const vsize   = (vocabByPath[floor] || []).length;
      if (sentence) {
        console.log(`  [OK]   ${word.es} (path${pathNum ?? 'orphan'}, vocab=${vsize})`);
        console.log(`         old: ${word.contextSentence}`);
        console.log(`         new: ${sentence}`);
      } else {
        console.log(`  [FAIL] ${word.es}: ${fail}`);
      }
    }
    console.log('\n*** End of test — no file written ***');
    return;
  }

  // ── Step 5 — apply replacements ───────────────────────────────────────────
  console.log('\n\nStep 5 — writing results to words.js');

  let content  = wordsSrc;
  let replaced = 0;
  const noMatch  = [];
  const failures = [];

  for (const { word, sentence, fail } of results) {
    if (!sentence) {
      failures.push({ es: word.es, reason: fail });
      continue;
    }

    // Escape the new sentence for embedding in a JS double-quoted string literal
    const escapedNew = sentence.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    const newToken   = `contextSentence: "${escapedNew}"`;

    // Try to find the exact old value — handles both quote styles
    const oldSingle = `contextSentence: '${word.contextSentence}'`;
    const oldDouble = `contextSentence: "${word.contextSentence}"`;

    if (content.includes(oldSingle)) {
      content = content.replace(oldSingle, newToken); // replaces first occurrence
      replaced++;
    } else if (content.includes(oldDouble)) {
      content = content.replace(oldDouble, newToken);
      replaced++;
    } else {
      noMatch.push(word.es);
    }
  }

  fs.writeFileSync(WORDS_FILE, content, 'utf8');
  console.log(`  words.js written (${replaced} replacements applied)`);

  // ── Step 6 — validate ─────────────────────────────────────────────────────
  console.log('\nStep 6 — validating written file');

  const finalContent = fs.readFileSync(WORDS_FILE, 'utf8');
  let verified    = 0;
  let verifyFail  = 0;

  for (const { word, sentence } of results) {
    if (!sentence) continue;
    const escapedNew = sentence.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
    if (finalContent.includes(`contextSentence: "${escapedNew}"`)) {
      verified++;
    } else {
      verifyFail++;
      console.warn(`  [verify-fail] ${word.es}`);
    }
  }

  // ── Report ────────────────────────────────────────────────────────────────
  const apiOk   = results.filter(r => r.sentence).length;
  const apiFail = results.filter(r => !r.sentence).length;

  console.log('\n══════════════════════════════════════════════');
  console.log('COMPLETE');
  console.log(`  words processed:    ${words.length}`);
  console.log(`  API success:        ${apiOk}`);
  console.log(`  API failure:        ${apiFail}`);
  console.log(`  replaced in file:   ${replaced}`);
  console.log(`  verified in file:   ${verified}`);
  console.log(`  no-match:           ${noMatch.length}`);
  console.log(`  verify-fail:        ${verifyFail}`);

  if (failures.length) {
    console.log('\nAPI failures (old sentence kept):');
    failures.forEach(f => console.log(`  - ${f.es}: ${f.reason}`));
  }
  if (noMatch.length) {
    console.log('\nNo-match (could not locate in file — old sentence kept):');
    noMatch.forEach(w => console.log(`  - ${w}`));
  }
}

main().catch(err => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
