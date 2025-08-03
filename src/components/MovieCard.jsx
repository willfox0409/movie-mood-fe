import React from 'react';

function MovieCard({ title, poster_url, description, runtime }) {
  return (
    <div className="mt-12 w-full max-w-lg mx-auto text-center px-4 animate-fade-in">
      <img
        src={poster_url}
        alt={`${title} poster`}
        className="w-full max-w-sm mx-auto rounded-xl shadow-lg mb-6"
      />
      <h2 className="text-2xl font-bold text-white mb-2">{title}</h2>
      <p className="text-purple-300 italic mb-2">{runtime} minutes</p>
      <p className="text-gray-200">{description}</p>
    </div>
  );
}

export default MovieCard;