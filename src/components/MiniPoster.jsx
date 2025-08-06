import React from 'react';

const MiniPoster = ({ title, posterPath }) => {
  console.log("MiniPoster props:", { title, posterPath });
  
  return (
    <div className="relative w-40 h-60 rounded overflow-hidden shadow-lg group">
      <img
        src={posterPath}
        alt={title}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity duration-300">
        <p className="text-white text-center text-sm px-2 font-bitcount">{title}</p>
      </div>
    </div>
  );
};

export default MiniPoster;