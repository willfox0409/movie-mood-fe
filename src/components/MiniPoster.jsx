import React from 'react';

const MiniPoster = ({ id, title, posterPath, onRemove, removing }) => {
  return (
    <div className="relative w-40 h-60 rounded overflow-hidden shadow-lg group">
      <img
        src={posterPath}
        alt={title}
        className="w-full h-full object-cover"
        referrerPolicy="no-referrer"
        onError={(e) => { e.currentTarget.src = '/images/poster-placeholder.png'; }}
      />

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center gap-3 p-2 text-center">
        <p className="text-white text-sm px-2 font-bitcount line-clamp-3">{title}</p>

        <button
          type="button"
          disabled={removing}
          onClick={() => onRemove?.(id)}
          className="
            px-3 py-1 text-xs font-semibold
            bg-red-600 hover:bg-red-700
            disabled:opacity-60 disabled:cursor-not-allowed
            text-white rounded shadow
            transition-colors
          "
        >
          {removing ? 'Removing…' : 'Remove from List'}
        </button>
      </div>
    </div>
  );
};

export default MiniPoster;