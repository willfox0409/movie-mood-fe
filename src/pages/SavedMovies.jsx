import React, { useEffect, useState } from 'react';
import MiniPoster from '../components/MiniPoster';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/v1/saved_movies', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        const movieList = data.data.map((movie) => movie.attributes);
        setSavedMovies(movieList);
      })
      .catch((err) => console.error('Error fetching saved movies:', err));
  }, []);

    return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bitcount mb-6">Your Saved Movies</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {savedMovies.map((movie) => (
          <MiniPoster
            key={movie.id}
            title={movie.title}
            posterPath={movie.poster_url}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedMovies;