// === DRILLS METADATA ===
export const DRILLS = [
  { id: 'flashcard', n: '1', name: 'Flashcards', desc: 'Tap to flip — mark each word as known or still learning.', color: 'amber', wide: true },
  { id: 'es-en', n: '2', name: 'Spanish → English', desc: 'See a Spanish word — pick the English meaning.', color: 'teal', wide: false },
  { id: 'en-es', n: '3', name: 'English → Spanish', desc: 'See an English word — pick the Spanish translation.', color: 'coral', wide: false },
  { id: 'type-es-en', n: '4', name: 'Type it — Sp → En', desc: 'See Spanish — type the English translation.', color: 'green', wide: false },
  { id: 'type-en-es', n: '5', name: 'Type it — En → Sp', desc: 'See English — type the Spanish word.', color: 'rose', wide: false },
  { id: 'conjugation', n: '6', name: 'Conjugation Drill', desc: 'Present tense — choose the right verb form.', color: 'purple', wide: false },
  { id: 'past-tense', n: '7', name: 'Past Tense (Preterite)', desc: 'Practice irregular & regular preterite forms.', color: 'stone', wide: false },
  { id: 'gender', n: '8', name: 'Gender Drill', desc: 'Is this noun el (masculine) or la (feminine)?', color: 'violet', wide: false },
  { id: 'matching', n: '9', name: 'Matching Game', desc: 'Match Spanish words to their English pairs.', color: 'fuchsia', wide: false },
  { id: 'hear-choose', n: '10', name: 'Hear & Choose', desc: 'Listen to the Spanish word — pick the meaning.', color: 'sky', wide: false },
  { id: 'listen-type', n: '11', name: 'Listen & Type', desc: 'Hear a Spanish word — spell it back.', color: 'orange', wide: false },
  { id: 'sent-build', n: '12', name: 'Sentence Builder', desc: 'Arrange words into a correct Spanish sentence.', color: 'lime', wide: true },
  { id: 'fill-blank', n: '13', name: 'Fill in the Blank', desc: 'A sentence with one missing word — pick the right one.', color: 'pink', wide: true },
];
 
// ============================================================
// === CONJUGATION TOGGLE CONFIG ==============================
// ============================================================
 
// Pronoun groups — Latin American Spanish (no vosotros)
// Used to filter both CONJ and PRETERITE arrays
export const CONJ_PRONOUN_GROUPS = [
  { id: 'yo',       label: 'Yo',              subLabel: 'I' },
  { id: 'tu',       label: 'Tú',              subLabel: 'you' },
  { id: 'el_ella',  label: 'Él / Ella',       subLabel: 'he / she' },
  { id: 'nosotros', label: 'Nosotros',        subLabel: 'we' },
  { id: 'ustedes',  label: 'Ustedes / Ellos', subLabel: 'you all / they' },
];
 
export const DEFAULT_CONJ_PRONOUNS = Object.fromEntries(
  CONJ_PRONOUN_GROUPS.map(p => [p.id, true])
);
 
// Present tense verb groups
export const CONJ_VERB_GROUPS = [
  { id: 'hablar',    label: 'hablar',    en: 'to speak' },
  { id: 'beber',     label: 'beber',     en: 'to drink' },
  { id: 'comer',     label: 'comer',     en: 'to eat' },
  { id: 'ser',       label: 'ser',       en: 'to be (permanent)' },
  { id: 'estar',     label: 'estar',     en: 'to be (location)' },
  { id: 'necesitar', label: 'necesitar', en: 'to need' },
  { id: 'tener',     label: 'tener',     en: 'to have' },
  { id: 'ir',        label: 'ir',        en: 'to go' },
  { id: 'querer',    label: 'querer',    en: 'to want' },
  { id: 'poder',     label: 'poder',     en: 'can / to be able' },
  { id: 'hacer',     label: 'hacer',     en: 'to do / make' },
];
 
export const DEFAULT_CONJ_VERBS = Object.fromEntries(
  CONJ_VERB_GROUPS.map(v => [v.id, true])
);
 
// Past tense verb groups
export const PRETERITE_VERB_GROUPS = [
  { id: 'hablar',   label: 'hablar',   en: 'to speak' },
  { id: 'beber',    label: 'beber',    en: 'to drink' },
  { id: 'comer',    label: 'comer',    en: 'to eat' },
  { id: 'trabajar', label: 'trabajar', en: 'to work' },
  { id: 'vivir',    label: 'vivir',    en: 'to live' },
  { id: 'ir_ser',   label: 'ir / ser', en: 'to go / to be' },
  { id: 'tener',    label: 'tener',    en: 'to have' },
  { id: 'estar',    label: 'estar',    en: 'to be (location)' },
  { id: 'hacer',    label: 'hacer',    en: 'to do / make' },
  { id: 'querer',   label: 'querer',   en: 'to want' },
  { id: 'poder',    label: 'poder',    en: 'to be able' },
  { id: 'venir',    label: 'venir',    en: 'to come' },
  { id: 'decir',    label: 'decir',    en: 'to say' },
];
 
export const DEFAULT_PRETERITE_VERBS = Object.fromEntries(
  PRETERITE_VERB_GROUPS.map(v => [v.id, true])
);
 
// Helper: filter CONJ or PRETERITE by user toggle settings
// Usage: getActiveConj(CONJ, pronounSettings, verbSettings)
export function getActiveConj(pool, pronounSettings, verbSettings) {
  return pool.filter(item =>
    pronounSettings[item.pronoun] !== false &&
    verbSettings[item.verb] !== false
  );
}
 
// ============================================================
// === PRESENT TENSE CONJUGATIONS =============================
// Each entry tagged: verb (verb id) + pronoun (pronoun id)
// ============================================================
export const CONJ = [
  // hablar
  { verb: 'hablar', pronoun: 'yo',       q: 'yo → hablar',            hint: 'to speak', ans: 'hablo',       pool: ['hablas', 'habla', 'hablamos', 'hablan', 'bebo', 'como', 'soy', 'tengo'] },
  { verb: 'hablar', pronoun: 'tu',       q: 'tú → hablar',            hint: 'to speak', ans: 'hablas',      pool: ['hablo', 'habla', 'hablamos', 'hablan', 'bebes', 'comes', 'eres', 'tienes'] },
  { verb: 'hablar', pronoun: 'el_ella',  q: 'él/ella → hablar',       hint: 'to speak', ans: 'habla',       pool: ['hablo', 'hablas', 'hablamos', 'hablan', 'bebe', 'come', 'es', 'tiene'] },
  { verb: 'hablar', pronoun: 'nosotros', q: 'nosotros → hablar',      hint: 'to speak', ans: 'hablamos',    pool: ['hablo', 'hablas', 'habla', 'hablan', 'bebemos', 'comemos', 'somos', 'tenemos'] },
  { verb: 'hablar', pronoun: 'ustedes',  q: 'ustedes/ellos → hablar', hint: 'to speak', ans: 'hablan',      pool: ['hablo', 'hablas', 'habla', 'hablamos', 'beben', 'comen', 'son', 'tienen'] },
  // beber
  { verb: 'beber', pronoun: 'yo',       q: 'yo → beber',            hint: 'to drink', ans: 'bebo',      pool: ['bebes', 'bebe', 'bebemos', 'beben', 'hablo', 'como', 'soy', 'tengo'] },
  { verb: 'beber', pronoun: 'tu',       q: 'tú → beber',            hint: 'to drink', ans: 'bebes',     pool: ['bebo', 'bebe', 'bebemos', 'beben', 'hablas', 'comes', 'eres', 'tienes'] },
  { verb: 'beber', pronoun: 'el_ella',  q: 'él/ella → beber',       hint: 'to drink', ans: 'bebe',      pool: ['bebo', 'bebes', 'bebemos', 'beben', 'habla', 'come', 'es', 'tiene'] },
  { verb: 'beber', pronoun: 'nosotros', q: 'nosotros → beber',      hint: 'to drink', ans: 'bebemos',   pool: ['bebo', 'bebes', 'bebe', 'beben', 'hablamos', 'comemos', 'somos', 'tenemos'] },
  { verb: 'beber', pronoun: 'ustedes',  q: 'ustedes/ellos → beber', hint: 'to drink', ans: 'beben',     pool: ['bebo', 'bebes', 'bebe', 'bebemos', 'hablan', 'comen', 'son', 'tienen'] },
  // comer
  { verb: 'comer', pronoun: 'yo',       q: 'yo → comer',            hint: 'to eat', ans: 'como',      pool: ['comes', 'come', 'comemos', 'comen', 'hablo', 'bebo', 'soy', 'tengo'] },
  { verb: 'comer', pronoun: 'tu',       q: 'tú → comer',            hint: 'to eat', ans: 'comes',     pool: ['como', 'come', 'comemos', 'comen', 'hablas', 'bebes', 'eres', 'tienes'] },
  { verb: 'comer', pronoun: 'el_ella',  q: 'él/ella → comer',       hint: 'to eat', ans: 'come',      pool: ['como', 'comes', 'comemos', 'comen', 'habla', 'bebe', 'es', 'tiene'] },
  { verb: 'comer', pronoun: 'nosotros', q: 'nosotros → comer',      hint: 'to eat', ans: 'comemos',   pool: ['como', 'comes', 'come', 'comen', 'hablamos', 'bebemos', 'somos', 'tenemos'] },
  { verb: 'comer', pronoun: 'ustedes',  q: 'ustedes/ellos → comer', hint: 'to eat', ans: 'comen',     pool: ['como', 'comes', 'come', 'comemos', 'hablan', 'beben', 'son', 'tienen'] },
  // ser
  { verb: 'ser', pronoun: 'yo',       q: 'yo → ser',            hint: 'to be (permanent)', ans: 'soy',    pool: ['eres', 'es', 'somos', 'son', 'estoy', 'tengo', 'hablo', 'bebo'] },
  { verb: 'ser', pronoun: 'tu',       q: 'tú → ser',            hint: 'to be (permanent)', ans: 'eres',   pool: ['soy', 'es', 'somos', 'son', 'estás', 'tienes', 'hablas', 'bebes'] },
  { verb: 'ser', pronoun: 'el_ella',  q: 'él/ella → ser',       hint: 'to be (permanent)', ans: 'es',     pool: ['soy', 'eres', 'somos', 'son', 'está', 'tiene', 'habla', 'bebe'] },
  { verb: 'ser', pronoun: 'nosotros', q: 'nosotros → ser',      hint: 'to be (permanent)', ans: 'somos',  pool: ['soy', 'eres', 'es', 'son', 'estamos', 'tenemos', 'hablamos', 'bebemos'] },
  { verb: 'ser', pronoun: 'ustedes',  q: 'ustedes/ellos → ser', hint: 'to be (permanent)', ans: 'son',    pool: ['soy', 'eres', 'es', 'somos', 'están', 'tienen', 'hablan', 'beben'] },
  // estar
  { verb: 'estar', pronoun: 'yo',       q: 'yo → estar',            hint: 'to be (location)', ans: 'estoy',    pool: ['estás', 'está', 'estamos', 'están', 'soy', 'tengo', 'hablo', 'bebo'] },
  { verb: 'estar', pronoun: 'tu',       q: 'tú → estar',            hint: 'to be (location)', ans: 'estás',    pool: ['estoy', 'está', 'estamos', 'están', 'eres', 'tienes', 'hablas', 'bebes'] },
  { verb: 'estar', pronoun: 'el_ella',  q: 'él/ella → estar',       hint: 'to be (location)', ans: 'está',     pool: ['estoy', 'estás', 'estamos', 'están', 'es', 'tiene', 'habla', 'bebe'] },
  { verb: 'estar', pronoun: 'nosotros', q: 'nosotros → estar',      hint: 'to be (location)', ans: 'estamos',  pool: ['estoy', 'estás', 'está', 'están', 'somos', 'tenemos', 'hablamos', 'bebemos'] },
  { verb: 'estar', pronoun: 'ustedes',  q: 'ustedes/ellos → estar', hint: 'to be (location)', ans: 'están',    pool: ['estoy', 'estás', 'está', 'estamos', 'son', 'tienen', 'hablan', 'beben'] },
  // necesitar
  { verb: 'necesitar', pronoun: 'yo',       q: 'yo → necesitar',            hint: 'to need', ans: 'necesito',     pool: ['necesitas', 'necesita', 'necesitamos', 'necesitan', 'tengo', 'soy', 'hablo', 'como'] },
  { verb: 'necesitar', pronoun: 'tu',       q: 'tú → necesitar',            hint: 'to need', ans: 'necesitas',    pool: ['necesito', 'necesita', 'necesitamos', 'necesitan', 'tienes', 'eres', 'hablas', 'comes'] },
  { verb: 'necesitar', pronoun: 'el_ella',  q: 'él/ella → necesitar',       hint: 'to need', ans: 'necesita',     pool: ['necesito', 'necesitas', 'necesitamos', 'necesitan', 'tiene', 'es', 'habla', 'come'] },
  { verb: 'necesitar', pronoun: 'nosotros', q: 'nosotros → necesitar',      hint: 'to need', ans: 'necesitamos',  pool: ['necesito', 'necesitas', 'necesita', 'necesitan', 'tenemos', 'somos', 'hablamos', 'comemos'] },
  { verb: 'necesitar', pronoun: 'ustedes',  q: 'ustedes/ellos → necesitar', hint: 'to need', ans: 'necesitan',    pool: ['necesito', 'necesitas', 'necesita', 'necesitamos', 'tienen', 'son', 'hablan', 'comen'] },
  // tener
  { verb: 'tener', pronoun: 'yo',       q: 'yo → tener',            hint: 'to have', ans: 'tengo',    pool: ['tienes', 'tiene', 'tenemos', 'tienen', 'necesito', 'soy', 'hablo', 'como'] },
  { verb: 'tener', pronoun: 'tu',       q: 'tú → tener',            hint: 'to have', ans: 'tienes',   pool: ['tengo', 'tiene', 'tenemos', 'tienen', 'necesitas', 'eres', 'hablas', 'comes'] },
  { verb: 'tener', pronoun: 'el_ella',  q: 'él/ella → tener',       hint: 'to have', ans: 'tiene',    pool: ['tengo', 'tienes', 'tenemos', 'tienen', 'necesita', 'es', 'habla', 'come'] },
  { verb: 'tener', pronoun: 'nosotros', q: 'nosotros → tener',      hint: 'to have', ans: 'tenemos',  pool: ['tengo', 'tienes', 'tiene', 'tienen', 'necesitamos', 'somos', 'hablamos', 'comemos'] },
  { verb: 'tener', pronoun: 'ustedes',  q: 'ustedes/ellos → tener', hint: 'to have', ans: 'tienen',   pool: ['tengo', 'tienes', 'tiene', 'tenemos', 'necesitan', 'son', 'hablan', 'comen'] },
  // ir
  { verb: 'ir', pronoun: 'yo',       q: 'yo → ir',            hint: 'to go', ans: 'voy',    pool: ['vas', 'va', 'vamos', 'van', 'quiero', 'puedo', 'hago', 'tengo'] },
  { verb: 'ir', pronoun: 'tu',       q: 'tú → ir',            hint: 'to go', ans: 'vas',    pool: ['voy', 'va', 'vamos', 'van', 'quieres', 'puedes', 'haces', 'tienes'] },
  { verb: 'ir', pronoun: 'el_ella',  q: 'él/ella → ir',       hint: 'to go', ans: 'va',     pool: ['voy', 'vas', 'vamos', 'van', 'quiere', 'puede', 'hace', 'tiene'] },
  { verb: 'ir', pronoun: 'nosotros', q: 'nosotros → ir',      hint: 'to go', ans: 'vamos',  pool: ['voy', 'vas', 'va', 'van', 'queremos', 'podemos', 'hacemos', 'tenemos'] },
  { verb: 'ir', pronoun: 'ustedes',  q: 'ustedes/ellos → ir', hint: 'to go', ans: 'van',    pool: ['voy', 'vas', 'va', 'vamos', 'quieren', 'pueden', 'hacen', 'tienen'] },
  // querer
  { verb: 'querer', pronoun: 'yo',       q: 'yo → querer',            hint: 'to want', ans: 'quiero',    pool: ['quieres', 'quiere', 'queremos', 'quieren', 'puedo', 'hago', 'voy', 'tengo'] },
  { verb: 'querer', pronoun: 'tu',       q: 'tú → querer',            hint: 'to want', ans: 'quieres',   pool: ['quiero', 'quiere', 'queremos', 'quieren', 'puedes', 'haces', 'vas', 'tienes'] },
  { verb: 'querer', pronoun: 'el_ella',  q: 'él/ella → querer',       hint: 'to want', ans: 'quiere',    pool: ['quiero', 'quieres', 'queremos', 'quieren', 'puede', 'hace', 'va', 'tiene'] },
  { verb: 'querer', pronoun: 'nosotros', q: 'nosotros → querer',      hint: 'to want', ans: 'queremos',  pool: ['quiero', 'quieres', 'quiere', 'quieren', 'podemos', 'hacemos', 'vamos', 'tenemos'] },
  { verb: 'querer', pronoun: 'ustedes',  q: 'ustedes/ellos → querer', hint: 'to want', ans: 'quieren',   pool: ['quiero', 'quieres', 'quiere', 'queremos', 'pueden', 'hacen', 'van', 'tienen'] },
  // poder
  { verb: 'poder', pronoun: 'yo',       q: 'yo → poder',            hint: 'can / to be able', ans: 'puedo',    pool: ['puedes', 'puede', 'podemos', 'pueden', 'quiero', 'hago', 'voy', 'tengo'] },
  { verb: 'poder', pronoun: 'tu',       q: 'tú → poder',            hint: 'can / to be able', ans: 'puedes',   pool: ['puedo', 'puede', 'podemos', 'pueden', 'quieres', 'haces', 'vas', 'tienes'] },
  { verb: 'poder', pronoun: 'el_ella',  q: 'él/ella → poder',       hint: 'can / to be able', ans: 'puede',    pool: ['puedo', 'puedes', 'podemos', 'pueden', 'quiere', 'hace', 'va', 'tiene'] },
  { verb: 'poder', pronoun: 'nosotros', q: 'nosotros → poder',      hint: 'can / to be able', ans: 'podemos',  pool: ['puedo', 'puedes', 'puede', 'pueden', 'queremos', 'hacemos', 'vamos', 'tenemos'] },
  { verb: 'poder', pronoun: 'ustedes',  q: 'ustedes/ellos → poder', hint: 'can / to be able', ans: 'pueden',   pool: ['puedo', 'puedes', 'puede', 'podemos', 'quieren', 'hacen', 'van', 'tienen'] },
  // hacer
  { verb: 'hacer', pronoun: 'yo',       q: 'yo → hacer',            hint: 'to do / make', ans: 'hago',    pool: ['haces', 'hace', 'hacemos', 'hacen', 'quiero', 'puedo', 'voy', 'tengo'] },
  { verb: 'hacer', pronoun: 'tu',       q: 'tú → hacer',            hint: 'to do / make', ans: 'haces',   pool: ['hago', 'hace', 'hacemos', 'hacen', 'quieres', 'puedes', 'vas', 'tienes'] },
  { verb: 'hacer', pronoun: 'el_ella',  q: 'él/ella → hacer',       hint: 'to do / make', ans: 'hace',    pool: ['hago', 'haces', 'hacemos', 'hacen', 'quiere', 'puede', 'va', 'tiene'] },
  { verb: 'hacer', pronoun: 'nosotros', q: 'nosotros → hacer',      hint: 'to do / make', ans: 'hacemos', pool: ['hago', 'haces', 'hace', 'hacen', 'queremos', 'podemos', 'vamos', 'tenemos'] },
  { verb: 'hacer', pronoun: 'ustedes',  q: 'ustedes/ellos → hacer', hint: 'to do / make', ans: 'hacen',   pool: ['hago', 'haces', 'hace', 'hacemos', 'quieren', 'pueden', 'van', 'tienen'] },
];
 
// ============================================================
// === PAST TENSE (PRETERITE) =================================
// Each entry tagged: verb (verb id) + pronoun (pronoun id)
// ============================================================
export const PRETERITE = [
  // hablar
  { verb: 'hablar', pronoun: 'yo',      q: 'yo → hablar',      hint: 'to speak (past)', ans: 'hablé',    pool: ['hablaste', 'habló', 'comí', 'bebí', 'fui', 'tuve', 'hice', 'estuve'] },
  { verb: 'hablar', pronoun: 'tu',      q: 'tú → hablar',      hint: 'to speak (past)', ans: 'hablaste', pool: ['hablé', 'habló', 'comiste', 'bebiste', 'fuiste', 'tuviste', 'hiciste', 'estuviste'] },
  { verb: 'hablar', pronoun: 'el_ella', q: 'él/ella → hablar', hint: 'to speak (past)', ans: 'habló',    pool: ['hablé', 'hablaste', 'comió', 'bebió', 'fue', 'tuvo', 'hizo', 'estuvo'] },
  // beber
  { verb: 'beber', pronoun: 'yo',      q: 'yo → beber',      hint: 'to drink (past)', ans: 'bebí',    pool: ['bebiste', 'bebió', 'hablé', 'comí', 'fui', 'tuve', 'hice', 'pude'] },
  { verb: 'beber', pronoun: 'tu',      q: 'tú → beber',      hint: 'to drink (past)', ans: 'bebiste', pool: ['bebí', 'bebió', 'hablaste', 'comiste', 'fuiste', 'tuviste', 'hiciste', 'pudiste'] },
  { verb: 'beber', pronoun: 'el_ella', q: 'él/ella → beber', hint: 'to drink (past)', ans: 'bebió',   pool: ['bebí', 'bebiste', 'habló', 'comió', 'fue', 'tuvo', 'hizo', 'pudo'] },
  // comer
  { verb: 'comer', pronoun: 'yo',      q: 'yo → comer',      hint: 'to eat (past)', ans: 'comí',    pool: ['comiste', 'comió', 'hablé', 'bebí', 'fui', 'tuve', 'hice', 'pude'] },
  { verb: 'comer', pronoun: 'tu',      q: 'tú → comer',      hint: 'to eat (past)', ans: 'comiste', pool: ['comí', 'comió', 'hablaste', 'bebiste', 'fuiste', 'tuviste', 'hiciste', 'pudiste'] },
  { verb: 'comer', pronoun: 'el_ella', q: 'él/ella → comer', hint: 'to eat (past)', ans: 'comió',   pool: ['comí', 'comiste', 'habló', 'bebió', 'fue', 'tuvo', 'hizo', 'pudo'] },
  // trabajar
  { verb: 'trabajar', pronoun: 'yo',      q: 'yo → trabajar',      hint: 'to work (past)', ans: 'trabajé',    pool: ['trabajaste', 'trabajó', 'hablé', 'comí', 'fui', 'tuve', 'compré', 'caminé'] },
  { verb: 'trabajar', pronoun: 'tu',      q: 'tú → trabajar',      hint: 'to work (past)', ans: 'trabajaste', pool: ['trabajé', 'trabajó', 'hablaste', 'comiste', 'fuiste', 'tuviste', 'compraste', 'caminaste'] },
  { verb: 'trabajar', pronoun: 'el_ella', q: 'él/ella → trabajar', hint: 'to work (past)', ans: 'trabajó',    pool: ['trabajé', 'trabajaste', 'habló', 'comió', 'fue', 'tuvo', 'compró', 'caminó'] },
  // vivir
  { verb: 'vivir', pronoun: 'yo',      q: 'yo → vivir',      hint: 'to live (past)', ans: 'viví',    pool: ['viviste', 'vivió', 'hablé', 'comí', 'fui', 'tuve', 'bebí', 'hice'] },
  { verb: 'vivir', pronoun: 'tu',      q: 'tú → vivir',      hint: 'to live (past)', ans: 'viviste', pool: ['viví', 'vivió', 'hablaste', 'comiste', 'fuiste', 'tuviste', 'bebiste', 'hiciste'] },
  { verb: 'vivir', pronoun: 'el_ella', q: 'él/ella → vivir', hint: 'to live (past)', ans: 'vivió',   pool: ['viví', 'viviste', 'habló', 'comió', 'fue', 'tuvo', 'bebió', 'hizo'] },
  // ir/ser
  { verb: 'ir_ser', pronoun: 'yo',      q: 'yo → ir/ser',      hint: 'to go/be (past)', ans: 'fui',    pool: ['fuiste', 'fue', 'tuve', 'estuve', 'hice', 'quise', 'pude', 'vine'] },
  { verb: 'ir_ser', pronoun: 'tu',      q: 'tú → ir/ser',      hint: 'to go/be (past)', ans: 'fuiste', pool: ['fui', 'fue', 'tuviste', 'estuviste', 'hiciste', 'quisiste', 'pudiste', 'viniste'] },
  { verb: 'ir_ser', pronoun: 'el_ella', q: 'él/ella → ir/ser', hint: 'to go/be (past)', ans: 'fue',    pool: ['fui', 'fuiste', 'tuvo', 'estuvo', 'hizo', 'quiso', 'pudo', 'vino'] },
  // tener
  { verb: 'tener', pronoun: 'yo',      q: 'yo → tener',      hint: 'to have (past)', ans: 'tuve',    pool: ['tuviste', 'tuvo', 'fui', 'estuve', 'hice', 'quise', 'pude', 'vine'] },
  { verb: 'tener', pronoun: 'tu',      q: 'tú → tener',      hint: 'to have (past)', ans: 'tuviste', pool: ['tuve', 'tuvo', 'fuiste', 'estuviste', 'hiciste', 'quisiste', 'pudiste', 'viniste'] },
  { verb: 'tener', pronoun: 'el_ella', q: 'él/ella → tener', hint: 'to have (past)', ans: 'tuvo',    pool: ['tuve', 'tuviste', 'fue', 'estuvo', 'hizo', 'quiso', 'pudo', 'vino'] },
  // estar
  { verb: 'estar', pronoun: 'yo',      q: 'yo → estar',      hint: 'to be/location (past)', ans: 'estuve',    pool: ['estuviste', 'estuvo', 'fui', 'tuve', 'hice', 'quise', 'pude', 'vine'] },
  { verb: 'estar', pronoun: 'tu',      q: 'tú → estar',      hint: 'to be/location (past)', ans: 'estuviste', pool: ['estuve', 'estuvo', 'fuiste', 'tuviste', 'hiciste', 'quisiste', 'pudiste', 'viniste'] },
  { verb: 'estar', pronoun: 'el_ella', q: 'él/ella → estar', hint: 'to be/location (past)', ans: 'estuvo',    pool: ['estuve', 'estuviste', 'fue', 'tuvo', 'hizo', 'quiso', 'pudo', 'vino'] },
  // hacer
  { verb: 'hacer', pronoun: 'yo',      q: 'yo → hacer',      hint: 'to do/make (past)', ans: 'hice',    pool: ['hiciste', 'hizo', 'fui', 'tuve', 'estuve', 'quise', 'pude', 'vine'] },
  { verb: 'hacer', pronoun: 'tu',      q: 'tú → hacer',      hint: 'to do/make (past)', ans: 'hiciste', pool: ['hice', 'hizo', 'fuiste', 'tuviste', 'estuviste', 'quisiste', 'pudiste', 'viniste'] },
  { verb: 'hacer', pronoun: 'el_ella', q: 'él/ella → hacer', hint: 'to do/make (past)', ans: 'hizo',    pool: ['hice', 'hiciste', 'fue', 'tuvo', 'estuvo', 'quiso', 'pudo', 'vino'] },
  // querer
  { verb: 'querer', pronoun: 'yo',      q: 'yo → querer',      hint: 'to want (past)', ans: 'quise',    pool: ['quisiste', 'quiso', 'fui', 'tuve', 'estuve', 'hice', 'pude', 'vine'] },
  { verb: 'querer', pronoun: 'tu',      q: 'tú → querer',      hint: 'to want (past)', ans: 'quisiste', pool: ['quise', 'quiso', 'fuiste', 'tuviste', 'estuviste', 'hiciste', 'pudiste', 'viniste'] },
  { verb: 'querer', pronoun: 'el_ella', q: 'él/ella → querer', hint: 'to want (past)', ans: 'quiso',    pool: ['quise', 'quisiste', 'fue', 'tuvo', 'estuvo', 'hizo', 'pudo', 'vino'] },
  // poder
  { verb: 'poder', pronoun: 'yo',      q: 'yo → poder',      hint: 'to be able (past)', ans: 'pude',    pool: ['pudiste', 'pudo', 'fui', 'tuve', 'estuve', 'hice', 'quise', 'vine'] },
  { verb: 'poder', pronoun: 'tu',      q: 'tú → poder',      hint: 'to be able (past)', ans: 'pudiste', pool: ['pude', 'pudo', 'fuiste', 'tuviste', 'estuviste', 'hiciste', 'quisiste', 'viniste'] },
  { verb: 'poder', pronoun: 'el_ella', q: 'él/ella → poder', hint: 'to be able (past)', ans: 'pudo',    pool: ['pude', 'pudiste', 'fue', 'tuvo', 'estuvo', 'hizo', 'quiso', 'vino'] },
  // venir
  { verb: 'venir', pronoun: 'yo',      q: 'yo → venir',      hint: 'to come (past)', ans: 'vine',    pool: ['viniste', 'vino', 'fui', 'tuve', 'estuve', 'hice', 'quise', 'pude'] },
  { verb: 'venir', pronoun: 'tu',      q: 'tú → venir',      hint: 'to come (past)', ans: 'viniste', pool: ['vine', 'vino', 'fuiste', 'tuviste', 'estuviste', 'hiciste', 'quisiste', 'pudiste'] },
  { verb: 'venir', pronoun: 'el_ella', q: 'él/ella → venir', hint: 'to come (past)', ans: 'vino',    pool: ['vine', 'viniste', 'fue', 'tuvo', 'estuvo', 'hizo', 'quiso', 'pudo'] },
  // decir
  { verb: 'decir', pronoun: 'yo',      q: 'yo → decir',      hint: 'to say (past)', ans: 'dije',    pool: ['dijiste', 'dijo', 'fui', 'tuve', 'estuve', 'hice', 'quise', 'vine'] },
  { verb: 'decir', pronoun: 'tu',      q: 'tú → decir',      hint: 'to say (past)', ans: 'dijiste', pool: ['dije', 'dijo', 'fuiste', 'tuviste', 'estuviste', 'hiciste', 'quisiste', 'viniste'] },
  { verb: 'decir', pronoun: 'el_ella', q: 'él/ella → decir', hint: 'to say (past)', ans: 'dijo',    pool: ['dije', 'dijiste', 'fue', 'tuvo', 'estuvo', 'hizo', 'quiso', 'vino'] },
];
 
// === SENTENCE BUILDER ===
export const SENT_POOL = [
  { words: ['yo', 'bebo', 'leche'], hint: 'I drink milk' },
  { words: ['tú', 'comes', 'pan'], hint: 'you eat bread' },
  { words: ['ella', 'bebe', 'agua'], hint: 'she drinks water' },
  { words: ['yo', 'como', 'una', 'manzana'], hint: 'I eat an apple' },
  { words: ['tú', 'hablas', 'español'], hint: 'you speak Spanish' },
  { words: ['yo', 'hablo', 'inglés'], hint: 'I speak English' },
  { words: ['él', 'come', 'pan', 'y', 'manzana'], hint: 'he eats bread and apple' },
  { words: ['yo', 'bebo', 'leche', 'con', 'pan'], hint: 'I drink milk with bread' },
  { words: ['ella', 'es', 'una', 'mujer'], hint: 'she is a woman' },
  { words: ['él', 'es', 'un', 'hombre'], hint: 'he is a man' },
  { words: ['yo', 'soy', 'un', 'niño'], hint: 'I am a boy' },
  { words: ['yo', 'necesito', 'mi', 'pasaporte'], hint: 'I need my passport' },
  { words: ['tengo', 'una', 'reserva', 'en', 'el', 'hotel'], hint: 'I have a reservation at the hotel' },
  { words: ['dónde', 'está', 'mi', 'maleta'], hint: 'where is my suitcase' },
  { words: ['necesito', 'un', 'taxi'], hint: 'I need a taxi' },
  { words: ['estoy', 'en', 'el', 'hotel'], hint: 'I am at the hotel' },
  { words: ['tienes', 'mi', 'pasaporte'], hint: 'you have my passport' },
  { words: ['ella', 'necesita', 'un', 'teléfono'], hint: 'she needs a telephone' },
  { words: ['él', 'tiene', 'una', 'maleta'], hint: 'he has a suitcase' },
  { words: ['estás', 'en', 'el', 'taxi'], hint: 'you are in the taxi' },
  { words: ['yo', 'quiero', 'un', 'café'], hint: 'I want a coffee' },
  { words: ['ella', 'habla', 'muy', 'bien'], hint: 'she speaks very well' },
  { words: ['nosotros', 'vamos', 'al', 'mercado'], hint: 'we go to the market' },
  { words: ['él', 'tiene', 'un', 'perro'], hint: 'he has a dog' },
  { words: ['yo', 'puedo', 'hablar', 'español'], hint: 'I can speak Spanish' },
  { words: ['tú', 'necesitas', 'agua'], hint: 'you need water' },
  { words: ['la', 'casa', 'es', 'grande'], hint: 'the house is big' },
  { words: ['ellos', 'comen', 'en', 'el', 'restaurante'], hint: 'they eat at the restaurant' },
  { words: ['yo', 'voy', 'a', 'la', 'tienda'], hint: 'I go to the store' },
  { words: ['tú', 'eres', 'muy', 'amable'], hint: 'you are very kind' },
];
 
// === FILL IN THE BLANK ===
export const FITB_POOL = [
  { before: 'Yo', blank: 'bebo', after: 'leche.', choices: ['bebo', 'bebes', 'bebe', 'como'], hint: 'yo = I, beber' },
  { before: 'Tú', blank: 'comes', after: 'pan.', choices: ['como', 'comes', 'come', 'bebes'], hint: 'tú = you, comer' },
  { before: 'Ella', blank: 'bebe', after: 'agua.', choices: ['bebo', 'bebes', 'bebe', 'come'], hint: 'ella = she, beber' },
  { before: 'Él', blank: 'come', after: 'una manzana.', choices: ['como', 'comes', 'come', 'bebe'], hint: 'él = he, comer' },
  { before: 'Yo', blank: 'hablo', after: 'español.', choices: ['hablo', 'hablas', 'habla', 'bebo'], hint: 'yo = I, hablar' },
  { before: 'Tú', blank: 'hablas', after: 'inglés.', choices: ['hablo', 'hablas', 'habla', 'comes'], hint: 'tú = you, hablar' },
  { before: 'Ella', blank: 'habla', after: 'español.', choices: ['hablo', 'hablas', 'habla', 'come'], hint: 'ella = she, hablar' },
  { before: 'Yo', blank: 'soy', after: 'un niño.', choices: ['soy', 'eres', 'es', 'estoy'], hint: 'yo = I, ser (permanent)' },
  { before: 'Tú', blank: 'eres', after: 'una mujer.', choices: ['soy', 'eres', 'es', 'estás'], hint: 'tú = you, ser' },
  { before: 'Ella', blank: 'es', after: 'una niña.', choices: ['soy', 'eres', 'es', 'está'], hint: 'ella = she, ser' },
  { before: 'Yo', blank: 'estoy', after: 'en el hotel.', choices: ['estoy', 'estás', 'está', 'soy'], hint: 'yo = I, estar (location)' },
  { before: 'Tú', blank: 'estás', after: 'en el taxi.', choices: ['estoy', 'estás', 'está', 'eres'], hint: 'tú = you, estar' },
  { before: 'El hotel', blank: 'está', after: 'aquí.', choices: ['estoy', 'estás', 'está', 'es'], hint: 'él/ella — location uses estar' },
  { before: 'Yo', blank: 'necesito', after: 'un taxi.', choices: ['necesito', 'necesitas', 'necesita', 'tengo'], hint: 'yo = I, necesitar' },
  { before: 'Tú', blank: 'necesitas', after: 'mi pasaporte.', choices: ['necesito', 'necesitas', 'necesita', 'tienes'], hint: 'tú = you, necesitar' },
  { before: 'Ella', blank: 'necesita', after: 'un teléfono.', choices: ['necesito', 'necesitas', 'necesita', 'tiene'], hint: 'ella = she, necesitar' },
  { before: 'Yo', blank: 'tengo', after: 'una reserva.', choices: ['tengo', 'tienes', 'tiene', 'necesito'], hint: 'yo = I, tener' },
  { before: 'Tú', blank: 'tienes', after: 'mi maleta.', choices: ['tengo', 'tienes', 'tiene', 'necesitas'], hint: 'tú = you, tener' },
  { before: 'Él', blank: 'tiene', after: 'un pasaporte.', choices: ['tengo', 'tienes', 'tiene', 'necesita'], hint: 'él = he, tener' },
  { before: 'Nosotros', blank: 'hablamos', after: 'español.', choices: ['hablo', 'hablas', 'hablamos', 'hablan'], hint: 'nosotros = we, hablar' },
  { before: 'Ustedes', blank: 'tienen', after: 'mi equipaje.', choices: ['tengo', 'tiene', 'tenemos', 'tienen'], hint: 'ustedes = you all, tener' },
  { before: 'Nosotros', blank: 'somos', after: 'estudiantes.', choices: ['soy', 'eres', 'somos', 'son'], hint: 'nosotros = we, ser' },
  { before: 'Ellos', blank: 'van', after: 'al restaurante.', choices: ['voy', 'va', 'vamos', 'van'], hint: 'ellos = they, ir' },
  { before: '¿Dónde está', blank: 'el', after: 'hotel?', choices: ['el', 'la', 'un', 'una'], hint: 'hotel is masculine' },
  { before: 'Ella es', blank: 'una', after: 'mujer.', choices: ['una', 'un', 'la', 'el'], hint: 'feminine indefinite article' },
  { before: 'Necesito', blank: 'mi', after: 'pasaporte.', choices: ['mi', 'un', 'el', 'la'], hint: 'possessive — my' },
  { before: 'Yo', blank: 'voy', after: 'al hotel.', choices: ['voy', 'vas', 'va', 'vamos'], hint: 'yo = I, ir (to go)' },
  { before: 'Tú', blank: 'vas', after: 'al restaurante.', choices: ['voy', 'vas', 'va', 'van'], hint: 'tú = you, ir' },
  { before: 'Él', blank: 'va', after: 'a la tienda.', choices: ['voy', 'vas', 'va', 'vamos'], hint: 'él = he, ir' },
  { before: 'Yo', blank: 'quiero', after: 'un café.', choices: ['quiero', 'quieres', 'quiere', 'tengo'], hint: 'yo = I, querer (to want)' },
  { before: 'Tú', blank: 'quieres', after: 'agua, ¿verdad?', choices: ['quiero', 'quieres', 'quiere', 'bebes'], hint: 'tú = you, querer' },
  { before: 'Yo', blank: 'puedo', after: 'hablar español.', choices: ['puedo', 'puedes', 'puede', 'hablo'], hint: 'yo = I, poder (can)' },
  { before: 'Yo', blank: 'hago', after: 'la tarea.', choices: ['hago', 'haces', 'hace', 'tengo'], hint: 'yo = I, hacer (to do)' },
  { before: 'Nosotros', blank: 'comemos', after: 'juntos.', choices: ['como', 'comes', 'comemos', 'comen'], hint: 'nosotros = we, comer' },
  { before: 'Ellos', blank: 'hablan', after: 'muy rápido.', choices: ['habla', 'hablo', 'hablas', 'hablan'], hint: 'ellos = they, hablar' },
  { before: 'La maleta', blank: 'es', after: 'grande.', choices: ['está', 'estoy', 'es', 'son'], hint: 'use ser for descriptions' },
  { before: 'Yo', blank: 'estoy', after: 'bien, gracias.', choices: ['estoy', 'soy', 'estás', 'eres'], hint: 'estar for states and feelings' },
  { before: 'Tú', blank: 'bebes', after: 'mucho agua.', choices: ['bebo', 'bebes', 'bebe', 'comes'], hint: 'tú = you, beber' },
];
 