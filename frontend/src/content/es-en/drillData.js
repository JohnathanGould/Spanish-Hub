import { languageConfig } from '../../config/languageConfig';
import { VERB_TABLE } from './words';

// === DRILLS METADATA ===
export const DRILLS = [
  { id: 'flashcard', n: '1', name: 'Flashcards', desc: 'Tap to flip — mark each word as known or still learning.', color: 'amber', wide: true, tier: 'review' },
  { id: languageConfig.drillDirectionId, n: '2', name: `${languageConfig.sourceLanguageName} → ${languageConfig.targetLanguageName}`, desc: 'See a Spanish word — pick the English meaning.', color: 'teal', wide: false, tier: 'practice' },
  { id: languageConfig.reverseDrillDirectionId, n: '3', name: `${languageConfig.targetLanguageName} → ${languageConfig.sourceLanguageName}`, desc: 'See an English word — pick the Spanish translation.', color: 'coral', wide: false, tier: 'practice' },
  { id: 'type-es-en', n: '4', name: 'Type it — Sp → En', desc: 'See Spanish — type the English translation.', color: 'green', wide: false, tier: 'practice' },
  { id: 'type-en-es', n: '5', name: 'Type it — En → Sp', desc: 'See English — type the Spanish word.', color: 'rose', wide: false, tier: 'practice' },
  { id: 'conjugation', n: '6', name: 'Conjugation Drill', desc: 'Present tense — choose the right verb form.', color: 'purple', wide: false, tier: 'practice' },
  { id: 'past-tense', n: '7', name: 'Past Tense (Preterite)', desc: 'Practice irregular & regular preterite forms.', color: 'stone', wide: false },
  { id: 'gender', n: '8', name: 'Gender Drill', desc: 'Is this noun el (masculine) or la (feminine)?', color: 'violet', wide: false, tier: 'practice' },
  { id: 'matching', n: '9', name: 'Matching Game', desc: 'Match Spanish words to their English pairs.', color: 'fuchsia', wide: false, tier: 'warmup' },
  { id: 'hear-choose', n: '10', name: 'Hear & Choose', desc: 'Listen to the Spanish word — pick the meaning.', color: 'sky', wide: false, tier: 'warmup' },
  { id: 'listen-type', n: '11', name: 'Listen & Type', desc: 'Hear a Spanish word — spell it back.', color: 'orange', wide: false, tier: 'practice' },
  { id: 'sent-build', n: '12', name: 'Sentence Builder', desc: 'Arrange words into a correct Spanish sentence.', color: 'lime', wide: true, tier: 'practice' },
  { id: 'fill-blank', n: '13', name: 'Fill in the Blank', desc: 'A sentence with one missing word — pick the right one.', color: 'pink', wide: true, tier: 'practice' },
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
 
// Present tense verb groups — derived from VERB_TABLE so new verbs are included automatically
export const CONJ_VERB_GROUPS = VERB_TABLE.map(v => ({ id: v.inf, label: v.inf, en: v.en }));
 
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
// === PRESENT TENSE CONJUGATIONS — derived from VERB_TABLE ===
// ============================================================

const _PRONOUN_META = {
  yo:       { subj: 'Yo',             display: 'yo' },
  tu:       { subj: 'Tú',            display: 'tú' },
  el_ella:  { subj: 'Él/Ella',       display: 'él/ella' },
  nosotros: { subj: 'Nosotros',      display: 'nosotros' },
  ustedes:  { subj: 'Ustedes/Ellos', display: 'ustedes/ellos' },
};

const _ALL_PRESENT_FORMS = [...new Set(VERB_TABLE.flatMap(v => v.conj.map(c => c.es)))];

export const CONJ = VERB_TABLE.flatMap(verb =>
  CONJ_PRONOUN_GROUPS.map(p => {
    const meta = _PRONOUN_META[p.id];
    const conjEntry = verb.conj.find(c => c.subj === meta.subj);
    if (!conjEntry) return null;
    return {
      verb: verb.inf,
      pronoun: p.id,
      q: `${meta.display} → ${verb.inf}`,
      hint: verb.en,
      ans: conjEntry.es,
      pool: _ALL_PRESENT_FORMS.filter(f => f !== conjEntry.es),
    };
  }).filter(Boolean)
);
 
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
  { words: ['hola', 'amigo'], hint: 'hello, friend' },
  { words: ['buenos días', 'amigo'], hint: 'good morning, friend' },
  { words: ['gracias', 'amigo'], hint: 'thank you, friend' },
  { words: ['hola', '¿cómo estás?'], hint: 'hello, how are you?' },
  { words: ['muy', 'bien', 'gracias'], hint: 'very well, thank you' },
  { words: ['yo', 'también'], hint: 'me too' },
  { words: ['yo', 'soy', 'un', 'hombre'], hint: 'I am a man' },
  { words: ['tú', 'eres', 'una', 'mujer'], hint: 'you are a woman' },
  { words: ['él', 'es', 'un', 'niño'], hint: 'he is a boy' },
  { words: ['ella', 'es', 'una', 'niña'], hint: 'she is a girl' },
  { words: ['yo', 'soy', 'español'], hint: 'I am Spanish' },
  { words: ['tú', 'eres', 'inglés'], hint: 'you are English' },
  { words: ['él', 'es', 'colombiano'], hint: 'he is Colombian' },
  { words: ['ella', 'es', 'canadiense'], hint: 'she is Canadian' },
  { words: ['quién', 'es', 'él'], hint: 'who is he' },
  { words: ['quién', 'es', 'ella'], hint: 'who is she' },
  { words: ['cómo', 'es', 'tu', 'amigo'], hint: "what's your friend like" },
  { words: ['cómo', 'es', 'tu', 'amiga'], hint: "what's your friend like" },
  { words: ['hay', 'un', 'hombre', 'aquí'], hint: 'there is a man here' },
  { words: ['hay', 'una', 'mujer', 'aquí'], hint: 'there is a woman here' },
  { words: ['hay', 'gente', 'aquí'], hint: 'there are people here' },
  { words: ['somos', 'una', 'familia'], hint: 'we are a family' },
  { words: ['son', 'mi', 'familia'], hint: 'they are my family' },
  { words: ['también', 'soy', 'canadiense'], hint: 'I am also Canadian' },
  { words: ['yo', 'soy', 'canadiense', 'pero', 'mi', 'amigo', 'es', 'mexicano'], hint: 'I am Canadian but my friend is Mexican' },
  { words: ['él', 'es', 'mexicano', 'o', 'colombiano'], hint: 'he is Mexican or Colombian' },
  { words: ['ella', 'es', 'mi', 'amiga'], hint: 'she is my friend' },
  { words: ['él', 'es', 'mi', 'amigo'], hint: 'he is my friend' },
  { words: ['tú', 'eres', 'mi', 'amigo', 'también'], hint: 'you are my friend too' },
  { words: ['yo', 'soy', 'un', 'adulto'], hint: 'I am an adult' },
  { words: ['hasta luego', 'amigo'], hint: 'see you later, friend' },
  { words: ['salud', 'y', 'suerte'], hint: 'cheers and good luck' },
  { words: ['lo siento', 'amigo'], hint: "I'm sorry, friend" },
  { words: ['encantado', 'también'], hint: 'nice to meet you too' },
];

// === FILL IN THE BLANK ===
export const FITB_POOL = [
  { before: 'Yo', blank: 'bebo', after: 'leche.', choices: ['bebo', 'bebes', 'bebe', 'como'], hint: 'yo = I, beber', en: 'I drink milk.' },
  { before: 'Tú', blank: 'comes', after: 'pan.', choices: ['como', 'comes', 'come', 'bebes'], hint: 'tú = you, comer', en: 'You eat bread.' },
  { before: 'Ella', blank: 'bebe', after: 'agua.', choices: ['bebo', 'bebes', 'bebe', 'come'], hint: 'ella = she, beber', en: 'She drinks water.' },
  { before: 'Él', blank: 'come', after: 'una manzana.', choices: ['como', 'comes', 'come', 'bebe'], hint: 'él = he, comer', en: 'He eats an apple.' },
  { before: 'Yo', blank: 'hablo', after: 'español.', choices: ['hablo', 'hablas', 'habla', 'bebo'], hint: 'yo = I, hablar', en: 'I speak Spanish.' },
  { before: 'Tú', blank: 'hablas', after: 'inglés.', choices: ['hablo', 'hablas', 'habla', 'comes'], hint: 'tú = you, hablar', en: 'You speak English.' },
  { before: 'Ella', blank: 'habla', after: 'español.', choices: ['hablo', 'hablas', 'habla', 'come'], hint: 'ella = she, hablar', en: 'She speaks Spanish.' },
  { before: 'Yo', blank: 'soy', after: 'un niño.', choices: ['soy', 'eres', 'es', 'estoy'], hint: 'yo = I, ser (permanent)', en: 'I am a boy.' },
  { before: 'Tú', blank: 'eres', after: 'una mujer.', choices: ['soy', 'eres', 'es', 'estás'], hint: 'tú = you, ser', en: 'You are a woman.' },
  { before: 'Ella', blank: 'es', after: 'una niña.', choices: ['soy', 'eres', 'es', 'está'], hint: 'ella = she, ser', en: 'She is a girl.' },
  { before: 'Yo', blank: 'estoy', after: 'en el hotel.', choices: ['estoy', 'estás', 'está', 'soy'], hint: 'yo = I, estar (location)', en: 'I am at the hotel.' },
  { before: 'Tú', blank: 'estás', after: 'en el taxi.', choices: ['estoy', 'estás', 'está', 'eres'], hint: 'tú = you, estar', en: 'You are in the taxi.' },
  { before: 'El hotel', blank: 'está', after: 'aquí.', choices: ['estoy', 'estás', 'está', 'es'], hint: 'él/ella — location uses estar', en: 'The hotel is here.' },
  { before: 'Yo', blank: 'necesito', after: 'un taxi.', choices: ['necesito', 'necesitas', 'necesita', 'tengo'], hint: 'yo = I, necesitar', en: 'I need a taxi.' },
  { before: 'Tú', blank: 'necesitas', after: 'mi pasaporte.', choices: ['necesito', 'necesitas', 'necesita', 'tienes'], hint: 'tú = you, necesitar', en: 'You need my passport.' },
  { before: 'Ella', blank: 'necesita', after: 'un teléfono.', choices: ['necesito', 'necesitas', 'necesita', 'tiene'], hint: 'ella = she, necesitar', en: 'She needs a phone.' },
  { before: 'Yo', blank: 'tengo', after: 'una reserva.', choices: ['tengo', 'tienes', 'tiene', 'necesito'], hint: 'yo = I, tener', en: 'I have a reservation.' },
  { before: 'Tú', blank: 'tienes', after: 'mi maleta.', choices: ['tengo', 'tienes', 'tiene', 'necesitas'], hint: 'tú = you, tener', en: 'You have my suitcase.' },
  { before: 'Él', blank: 'tiene', after: 'un pasaporte.', choices: ['tengo', 'tienes', 'tiene', 'necesita'], hint: 'él = he, tener', en: 'He has a passport.' },
  { before: 'Nosotros', blank: 'hablamos', after: 'español.', choices: ['hablo', 'hablas', 'hablamos', 'hablan'], hint: 'nosotros = we, hablar', en: 'We speak Spanish.' },
  { before: 'Ustedes', blank: 'tienen', after: 'mi equipaje.', choices: ['tengo', 'tiene', 'tenemos', 'tienen'], hint: 'ustedes = you all, tener', en: 'You have my luggage.' },
  { before: 'Nosotros', blank: 'somos', after: 'estudiantes.', choices: ['soy', 'eres', 'somos', 'son'], hint: 'nosotros = we, ser', en: 'We are students.' },
  { before: 'Ellos', blank: 'van', after: 'al restaurante.', choices: ['voy', 'va', 'vamos', 'van'], hint: 'ellos = they, ir', en: 'They are going to the restaurant.' },
  { before: '¿Dónde está', blank: 'el', after: 'hotel?', choices: ['el', 'la', 'un', 'una'], hint: 'hotel is masculine', en: 'Where is the hotel?' },
  { before: 'Ella es', blank: 'una', after: 'mujer.', choices: ['una', 'un', 'la', 'el'], hint: 'feminine indefinite article', en: 'She is a woman.' },
  { before: 'Necesito', blank: 'mi', after: 'pasaporte.', choices: ['mi', 'un', 'el', 'la'], hint: 'possessive — my', en: 'I need my passport.' },
  { before: 'Yo', blank: 'voy', after: 'al hotel.', choices: ['voy', 'vas', 'va', 'vamos'], hint: 'yo = I, ir (to go)', en: 'I am going to the hotel.' },
  { before: 'Tú', blank: 'vas', after: 'al restaurante.', choices: ['voy', 'vas', 'va', 'van'], hint: 'tú = you, ir', en: 'You are going to the restaurant.' },
  { before: 'Él', blank: 'va', after: 'a la tienda.', choices: ['voy', 'vas', 'va', 'vamos'], hint: 'él = he, ir', en: 'He is going to the store.' },
  { before: 'Yo', blank: 'quiero', after: 'un café.', choices: ['quiero', 'quieres', 'quiere', 'tengo'], hint: 'yo = I, querer (to want)', en: 'I want a coffee.' },
  { before: 'Tú', blank: 'quieres', after: 'agua, ¿verdad?', choices: ['quiero', 'quieres', 'quiere', 'bebes'], hint: 'tú = you, querer', en: 'You want water, right?' },
  { before: 'Yo', blank: 'puedo', after: 'hablar español.', choices: ['puedo', 'puedes', 'puede', 'hablo'], hint: 'yo = I, poder (can)', en: 'I can speak Spanish.' },
  { before: 'Yo', blank: 'hago', after: 'la tarea.', choices: ['hago', 'haces', 'hace', 'tengo'], hint: 'yo = I, hacer (to do)', en: 'I do my homework.' },
  { before: 'Nosotros', blank: 'comemos', after: 'juntos.', choices: ['como', 'comes', 'comemos', 'comen'], hint: 'nosotros = we, comer', en: 'We eat together.' },
  { before: 'Ellos', blank: 'hablan', after: 'muy rápido.', choices: ['habla', 'hablo', 'hablas', 'hablan'], hint: 'ellos = they, hablar', en: 'They speak very fast.' },
  { before: 'La maleta', blank: 'es', after: 'grande.', choices: ['está', 'estoy', 'es', 'son'], hint: 'use ser for descriptions', en: 'The suitcase is big.' },
  { before: 'Yo', blank: 'estoy', after: 'bien, gracias.', choices: ['estoy', 'soy', 'estás', 'eres'], hint: 'estar for states and feelings', en: 'I am fine, thank you.' },
  { before: 'Tú', blank: 'bebes', after: 'mucho agua.', choices: ['bebo', 'bebes', 'bebe', 'comes'], hint: 'tú = you, beber', en: 'You drink a lot of water.' },
];
 