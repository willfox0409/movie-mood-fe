import React, { useEffect, useState } from "react";
import MiniPoster from "../components/MiniPoster";
import { apiFetch } from "../api";

function SavedMovies() {
  const [savedMovies, setSavedMovies] = useState([]);
  const [removingId, setRemovingId] = useState(null);

  // Fetch saved movies on mount
  useEffect(() => {
    apiFetch("/saved_movies")
      .then((data) => {
        const movies = (data?.data || []).map(({ id, attributes }) => ({
          id, // saved_movie id
          ...attributes,
        }));
        setSavedMovies(movies);
      })
      .catch((err) => console.error("Error fetching saved movies:", err));
  }, []);

  const handleRemove = async (savedMovieId) => {
    try {
      setRemovingId(savedMovieId);

      await apiFetch(`/saved_movies/${savedMovieId}`, {
        method: "DELETE",
      });

      setSavedMovies((prev) => prev.filter((m) => m.id !== savedMovieId));
    } catch (e) {
      console.error("❌ Error deleting movie:", e);
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
            key={movie.id} // saved_movie id
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