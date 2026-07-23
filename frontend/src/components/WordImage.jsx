import React, { useEffect, useState } from 'react';
import { ImageOff } from 'lucide-react';
import { getWordImage } from '../utils/wikiImage';

// Displays a word's own image (word.imageUrl) when present.
// Falls back to a Wikipedia thumbnail lookup only when word.imageUrl is missing.
// variant: 'card' (full width, ~120px tall) | 'modal' (full width, ~180px tall) | 'inline' (small)
export default function WordImage({ word, variant = 'card', onLoaded, eager = true }) {
  const [data, setData] = useState(undefined); // undefined = loading, null = none, object = found
  const [err, setErr] = useState(false);

  const ownImage = word?.imageUrl || null;

  useEffect(() => {
    if (!eager) return;
    setErr(false);

    // Own image present — use it directly, skip Wikipedia entirely.
    if (ownImage) {
      setData({ thumb: ownImage, source: null, title: word.es, own: true });
      if (onLoaded) onLoaded(true);
      return;
    }

    // No own image — fall back to Wikipedia lookup.
    let cancelled = false;
    setData(undefined);
    getWordImage(word).then(res => {
      if (cancelled) return;
      setData(res);
      if (onLoaded) onLoaded(!!res);
    });
    return () => { cancelled = true; };
  }, [word.es, word.imageUrl, eager]); // eslint-disable-line react-hooks/exhaustive-deps

  if (data === undefined && eager) {
    return (
      <div data-testid="word-image-loading"
        className="w-full rounded-xl animate-pulse"
        style={{ aspectRatio: '1 / 1', background: 'hsl(var(--muted))' }} />
    );
  }
  if (!data || err) {
    return (
      <div data-testid="word-image-none"
        className={`w-full rounded-xl flex items-center justify-center ${variant === 'modal' ? 'h-32' : 'h-24'}`}
        style={{ background: 'hsl(var(--muted))', color: 'hsl(var(--muted-foreground))' }}>
        <div className="text-center">
          <ImageOff size={20} className="mx-auto mb-1 opacity-60" />
          <div className="text-xs italic opacity-70">No image found</div>
        </div>
      </div>
    );
  }

  // Own image — no Wikipedia attribution, not a link.
  if (data.own) {
    return (
      <div data-testid="word-image-own"
        className="block w-full rounded-xl overflow-hidden relative group"
        style={{ background: 'hsl(var(--muted))' }}>
        <img src={data.thumb} alt={word.es} onError={() => setErr(true)}
          className="w-full object-cover transition-transform group-hover:scale-105"
          style={{ aspectRatio: '1 / 1' }} />
      </div>
    );
  }

  // Wikipedia fallback — keep attribution + link, as before.
  return (
    <a data-testid="word-image-link" href={data.source} target="_blank" rel="noopener noreferrer"
      className="block w-full rounded-xl overflow-hidden relative group"
      style={{ background: 'hsl(var(--muted))' }}>
      <img src={data.thumb} alt={data.title} onError={() => setErr(true)}
        className={`w-full object-cover transition-transform group-hover:scale-105 ${variant === 'modal' ? 'h-44' : 'h-28'}`} />
      <div className="absolute bottom-0 left-0 right-0 px-2 py-1 text-[10px] text-white opacity-80"
        style={{ background: 'linear-gradient(transparent, rgba(0,0,0,0.5))' }}>
        Image: Wikipedia · {data.lang.toUpperCase()}
      </div>
    </a>
  );
}
