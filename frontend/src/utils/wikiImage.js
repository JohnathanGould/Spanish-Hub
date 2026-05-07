// Fetch a thumbnail image for a Spanish word from Wikipedia.
// Tries Spanish Wikipedia first, falls back to English. Caches in localStorage forever.
// Returns { thumb, source, title } or null if no image.

const CACHE_PREFIX = 'spanish-hub-img-';
const NEGATIVE_TTL = 1000 * 60 * 60 * 24 * 7; // 7 days for misses

function cacheGet(key) {
  try {
    const raw = localStorage.getItem(CACHE_PREFIX + key);
    if (!raw) return undefined;
    const parsed = JSON.parse(raw);
    if (parsed.expiresAt && parsed.expiresAt < Date.now()) {
      localStorage.removeItem(CACHE_PREFIX + key);
      return undefined;
    }
    return parsed.value;
  } catch (e) { return undefined; }
}

function cacheSet(key, value, ttl) {
  try {
    const payload = { value, expiresAt: ttl ? Date.now() + ttl : null };
    localStorage.setItem(CACHE_PREFIX + key, JSON.stringify(payload));
  } catch (e) { /* localStorage full — ignore */ }
}

async function fetchWiki(lang, term) {
  try {
    const url = `https://${lang}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(term)}?redirect=true`;
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    if (!res.ok) return null;
    const data = await res.json();
    if (data.type === 'disambiguation') return null;
    if (!data.thumbnail?.source) return null;
    return {
      thumb: data.thumbnail.source,
      source: data.content_urls?.desktop?.page || `https://${lang}.wikipedia.org/wiki/${encodeURIComponent(term)}`,
      title: data.title || term,
      lang,
    };
  } catch (e) { return null; }
}

export async function getWordImage(word) {
  if (!word?.es) return null;
  const key = word.es.toLowerCase();
  const cached = cacheGet(key);
  if (cached !== undefined) return cached; // null is a valid cached "no image"

  // Try Spanish Wikipedia first
  let result = await fetchWiki('es', word.es);
  // Fall back to English Wikipedia using the English translation
  if (!result && word.en) {
    // Strip parentheticals like "(m)" or "(alive)"
    const cleanEn = word.en.replace(/\([^)]*\)/g, '').split('/')[0].trim();
    if (cleanEn) result = await fetchWiki('en', cleanEn);
  }

  if (result) cacheSet(key, result);
  else cacheSet(key, null, NEGATIVE_TTL);
  return result;
}
