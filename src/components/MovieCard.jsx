import React, { useState } from 'react';

function MovieCard({
  title,
  poster_url,
  description,
  runtime_minutes,
  release_year,
  onSave,     // expects () => Promise<Response>
  onReroll,
  compact = false, // pass compact to pull things closer to the navbar
}) {
  const [showDesc, setShowDesc] = useState(false);
  const [showWatch, setShowWatch] = useState(false);
  const [savedState, setSavedState] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleSave = async () => {
    try {
      const res = await onSave();
      if (res && (res.status === 201 || res.status === 200 || res.ok)) {
        setSavedState(true);
        setTimeout(() => setSavedState(false), 2000);
      }
    } catch {
      /* parent logs errors */
    }
  };

  const formatRuntime = (minutes) => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return h > 0 ? `${h} hour ${m} minutes` : `${m} minutes`;
  };

  // Compact mode tweaks
  const containerMt = compact ? 'mt-0' : 'mt-2';

  // Poster sizing + neon glow/hover
  const posterSizes = compact
    ? 'w-36 sm:w-40 md:w-48 mb-0'
    : 'w-40 sm:w-48 md:w-56 mb-1';
  const posterGlow =
    'border-4 border-pink-500 shadow-[0_0_15px_theme(colors.pink.500)] ' +
    'transition-all duration-200 hover:scale-105 ' +
    'hover:border-cyan-400 hover:shadow-[0_0_20px_theme(colors.cyan.400)]';

  // Title + Save button offsets on VHS
  const titleTop = compact ? 'top-[24%]' : 'top-[22%]';
  const saveTop  = compact ? 'top-[84%]' : 'top-[86%]';

  return (
    <div className={`${containerMt} w-full max-w-2xl mx-auto text-center px-4 animate-fade-in`}>

      {/* Poster (smaller, neon glow, subtle hover) */}
      <img
        src={poster_url}
        alt={`${title} poster`}
        referrerPolicy="no-referrer"
        loading="lazy"
        onError={(e) => { e.currentTarget.src = '/images/poster-placeholder.png'; }}
        className={`mx-auto rounded-xl shadow-lg ${posterSizes} ${posterGlow}`}
      />

      {/* VHS Tape Display */}
      <div className="relative mx-auto w-full max-w-2xl">
        <img
          src="/images/vhs-tape-display.png"
          alt="VHS tape"
          className="w-full h-auto mx-auto drop-shadow-xl"
          draggable={false}
        />

        {/* Title + Year (nudged down slightly) */}
        <div className={`absolute left-1/2 -translate-x-1/2 ${titleTop} w-[72%] text-white text-balance px-3`}>
          <h2 className="text-xl sm:text-2xl font-bold drop-shadow-md leading-tight">
            {title}{release_year ? ` (${release_year})` : ''}
          </h2>
        </div>

        {/* Center masking-tape button — opens description modal */}
        <button
          type="button"
          onClick={() => setShowDesc(true)}
          aria-label="View full description"
          className="
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
            w-96 h-36
            bg-transparent
            bg-[url('/images/masking-tape.png')] bg-contain bg-no-repeat bg-center
            font-['Permanent_Marker',cursive] text-black text-lg
            rotate-[2deg]
            drop-shadow-md
            whitespace-nowrap
            hover:rotate-0 hover:scale-105
            active:scale-95
            transition-transform duration-150
            flex items-center justify-center
          "
        >
          View Description
        </button>

        {/* Runtime strip */}
        {runtime_minutes ? (
          <div className="absolute left-1/2 -translate-x-1/2 bottom-[9%] w-[68%] px-3">
            <p className="text-xs sm:text-sm text-purple-200 italic drop-shadow">
              {formatRuntime(runtime_minutes)}
            </p>
          </div>
        ) : null}

        {/* Masking Tape — Save for Later (right side) */}
        <button
          type="button"
          onClick={handleSave}
          aria-label="Save for Later"
          className={`
            absolute right-2
            ${saveTop} -translate-y-1/2
            w-80 h-32
            bg-transparent
            bg-[url('/images/masking-tape.png')] bg-contain bg-no-repeat bg-center
            font-['Permanent_Marker',cursive] text-black text-md
            rotate-[-8deg]
            drop-shadow-md
            whitespace-nowrap
            hover:rotate-[-4deg] hover:scale-105
            active:scale-95
            transition-transform duration-150
            flex items-center justify-center
          `}
        >
          Save for Later
        </button>

        {/* Masking Tape — Where to Watch (left side) */}
        <button
          type="button"
          onClick={() => setShowWatch(true)}
          aria-label="Where to Watch"
          className={`
            absolute left-0 top-[76%]
            ${saveTop} -translate-y-1/2
            w-72 h-32
            bg-transparent
            bg-[url('/images/masking-tape.png')] bg-contain bg-no-repeat bg-center
            font-['Permanent_Marker',cursive] text-black
            rotate-[6deg]
            drop-shadow-md
            whitespace-nowrap
            hover:rotate-[2deg] hover:scale-105
            active:scale-95
            transition-transform duration-150
            flex items-center justify-center
          `}
        >
          Where to Watch
        </button>

        {/* Tiny toast near the save sticker */}
        {savedState && (
          <div
            className="
              absolute right-4 top-[64%]
              translate-y-[-50%]
              bg-emerald-600/95 text-white text-xs font-semibold
              px-3 py-1 rounded shadow-lg
              border border-emerald-700
            "
          >
            Saved!
          </div>
        )}
      </div>

      {/* Re-roll */}
      <div className="mt-4">
        <button
          type="button"
          onClick={onReroll}
          className="
            px-6 py-2 text-base font-semibold text-black
            bg-[#C0C0C0] border border-[#808080] rounded-sm
            shadow-[4px_4px_0px_#404040]
            hover:shadow-[2px_2px_0px_#404040]
            hover:translate-x-[1px] hover:translate-y-[1px]
            transition-all duration-150
          "
        >
          Re-roll
        </button>
      </div>

      {/* Description modal (readable font) */}
      {showDesc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowDesc(false)} />
          <div className="relative z-10 w-full max-w-xl rounded-xl bg-neutral-900/90 border border-neutral-700 p-6 text-left text-white shadow-2xl">
            <div className="mb-3 font-sans">
              <h3 className="text-xl font-extrabold">
                {title}{release_year ? ` (${release_year})` : ''}{' '}
                {runtime_minutes ? `• ${formatRuntime(runtime_minutes)}` : ''}
              </h3>
            </div>
            <div className="font-mono">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">
                {description}
              </p>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded font-sans"
              >
                Save for Later
              </button>
              <button
                type="button"
                onClick={() => setShowDesc(false)}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded font-sans"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Where to Watch modal (placeholder) */}
      {showWatch && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4" role="dialog" aria-modal="true">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowWatch(false)} />
          <div className="relative z-10 w-full max-w-lg rounded-xl bg-neutral-900/90 border border-neutral-700 p-6 text-left text-white shadow-2xl">
            <div className="mb-4 font-sans">
              <h3 className="text-xl font-extrabold">Where to Watch</h3>
              <p className="text-sm opacity-80">{title}{release_year ? ` (${release_year})` : ''}</p>
            </div>
            <div className="space-y-3 font-mono">
              <div className="rounded-md border border-yellow-400/60 bg-yellow-500/10 text-yellow-200 px-3 py-2 text-sm">
                Placeholder only — JustWatch integration coming soon.
              </div>
              <p className="text-sm text-neutral-200">
                This section will show real streaming, buy, and rent options once enabled.
              </p>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                type="button"
                onClick={() => setShowWatch(false)}
                className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded font-sans"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

export default MovieCard;