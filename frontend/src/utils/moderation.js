// Basic profanity / slur filter for Plaza chat. Not exhaustive — covers obvious cases.
// Returns { ok: boolean, reason?: string, masked?: string }

const BLOCKED = [
  // English slurs / hard offenders
  'nigger', 'nigga', 'faggot', 'fag', 'kike', 'spic', 'chink', 'gook', 'tranny', 'retard',
  // Spanish slurs / strong profanity
  'maricón', 'maricon', 'puto', 'puta', 'cabrón', 'cabron', 'pendejo', 'mierda', 'coño', 'cono',
  // Sexual / explicit
  'sex', 'porn', 'pornhub', 'xxx', 'cock', 'pussy', 'dick', 'whore',
  // Spam-y
  'http://', 'https://', 'www.', '.com/', '.net/', '.xyz', 't.me/', 'discord.gg',
];

export function checkMessage(text) {
  const t = (text || '').trim();
  if (t.length === 0) return { ok: false, reason: 'Empty' };
  if (t.length > 280) return { ok: false, reason: 'Too long (280 chars max)' };
  const lower = t.toLowerCase();
  for (const word of BLOCKED) {
    // Match as a whole word OR substring for multi-character patterns
    const re = word.includes(' ') || word.includes('.') || word.includes('://')
      ? new RegExp(word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i')
      : new RegExp(`\\b${word}\\b`, 'i');
    if (re.test(lower)) {
      return { ok: false, reason: 'Message contains blocked content. Keep it kind & on-topic.' };
    }
  }
  return { ok: true };
}

export function maskBlocked(text) {
  let out = text;
  for (const word of BLOCKED) {
    if (word.includes('://') || word.includes('.com/') || word.includes('www.') || word.includes('t.me/') || word.includes('discord.gg')) continue;
    const re = new RegExp(`\\b${word.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`, 'gi');
    out = out.replace(re, (m) => '*'.repeat(m.length));
  }
  return out;
}
