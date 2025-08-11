import React, { useEffect, useState } from 'react';
import MiniPoster from '../components/MiniPoster';

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');

    fetch('http://localhost:3000/api/v1/saved_movies', {
      headers: { Authorization: `Bearer ${token}` }
    })
      .then((res) => res.json())
      .then((data) => {
        // keep the saved_movie id!
        const movies = (data?.data || []).map(({ id, attributes }) => ({
          id, // saved_movie id
          ...attributes, // includes title, poster_url, movie_id, etc.
        }));
        setSavedMovies(movies);
      })
      .catch((err) => console.error('Error fetching saved movies:', err));
  }, []);

  const handleRemove = async (savedMovieId) => {
    const token = localStorage.getItem('token');
    try {
      setRemovingId(savedMovieId);
      const res = await fetch(`http://localhost:3000/api/v1/saved_movies/${savedMovieId}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${token}` },
      });

      if (res.ok) {
        setSavedMovies((prev) => prev.filter((m) => m.id !== savedMovieId));
      } else {
        console.error('Failed to delete saved movie');
      }
    } catch (e) {
      console.error('Network error deleting movie:', e);
    } finally {
      setRemovingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <h1 className="text-3xl font-bitcount mb-6">Your Saved Movies</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {savedMovies.map((movie) => (
          <MiniPoster
            key={movie.id}                  // saved_movie id
            id={movie.id}
            title={movie.title}
            posterPath={movie.poster_url}
            onRemove={handleRemove}
            removing={movie.id === removingId}
          />
        ))}
      </div>
    </div>
  );
}

export default SavedMovies;