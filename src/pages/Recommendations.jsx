import React, { useState, useRef, useEffect } from 'react';
import { moods, genres, decades, runtimes } from '../assets/dropdownOptions';
import MovieCard from '../components/MovieCard'; 

function RecommendationsPage() {
  const username = localStorage.getItem('username');
  const genreRef = useRef(null);
  const [selectedMood, setSelectedMood] = useState('');
  const [showGenre, setShowGenre] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showDecade, setShowDecade] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState('');
  const decadeRef = useRef(null);
  const [selectedRuntime, setSelectedRuntime] = useState('');
  const [showRuntime, setShowRuntime] = useState(false);
  const runtimeRef = useRef(null);
  const [recommendation, setRecommendation] = useState(null);

  // Scroll smoothly to genre dropdown when revealed
  useEffect(() => {
    if (showGenre && genreRef.current) {
      genreRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showGenre]);

  useEffect(() => {
    if (showDecade && decadeRef.current) {
      decadeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showDecade]);

  useEffect(() => {
    if (showRuntime && runtimeRef.current) {
      runtimeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [showRuntime]);

  const handleGetRecommendation = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3000/api/v1/recommendations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          username,
          mood: selectedMood,
          genre: selectedGenre,
          decade: selectedDecade,
          runtime: selectedRuntime
        })
      });

      if (response.ok) {
        const data = await response.json();
        setRecommendation(data.data.attributes); // <-- make sure this matches your backend response structure
      } else {
        console.error('🚫 Failed to fetch recommendation');
      }
    } catch (error) {
      console.error('❌ Network or server error:', error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center pt-16 px-4 font-bitcount"
      style={{ backgroundImage: "url('/images/summer_suburb_dusk.png')" }}
    >
      <h1 className="text-3xl font-bold mb-2">Welcome back, {username}!</h1>
      <p className="text-lg mb-6 text-purple-400 italic max-w-xl text-center">
        Pick a mood to get started — this isn’t about browsing a million titles. 
        It's about getting one good recommendation you can trust.
      </p>

      {/* Mood Dropdown */}
      <select
        className="select select-bordered text-black w-full max-w-xs mb-4"
        value={selectedMood}
        onChange={(e) => {
          setSelectedMood(e.target.value);
          setShowGenre(true);
        }}
      >
        <option value="">Pick a mood...</option>
        {moods.map((mood, idx) => (
          <option key={idx} value={mood}>
            {mood}
          </option>
        ))}
      </select>

      {/* Reveal Genre Dropdown if mood selected */}
      {showGenre && (
        <div ref={genreRef} className="mt-6 flex flex-col items-center">
          <p className="text-md text-purple-300 mb-2">
            Love that. Let’s narrow it down — got a genre in mind?
          </p>
          <select
            className="select select-bordered text-black w-full max-w-xs"
            value={selectedGenre}
            onChange={(e) => {
              setSelectedGenre(e.target.value);
              setShowDecade(true); // trigger reveal of decade panel
            }}
          >
            <option value="">Pick a genre...</option>
            {genres.map((genre, idx) => (
              <option key={idx} value={genre}>
                {genre}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Reveal Decade Dropdown if genre selected */}
      {showDecade && (
        <div ref={decadeRef} className="mt-6 flex flex-col items-center">
          <p className="text-md text-purple-300 mb-2">
            Nice. Want to stick to a particular decade?
          </p>
          <select
            className="select select-bordered text-black w-full max-w-xs"
            value={selectedDecade}
            onChange={(e) => {
              setSelectedDecade(e.target.value);
              setShowRuntime(true); // trigger reveal of runtime panel
            }}
          >
            <option value="">Pick a decade...</option>
            {decades.map((decade, idx) => (
              <option key={idx} value={decade}>
                {decade}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Reveal Runtime Dropdown if decade selected */}
      {showRuntime && (
        <div ref={runtimeRef} className="mt-6 flex flex-col items-center">
          <p className="text-md text-purple-300 mb-2">
            Almost there. Any preference on how long the movie should be?
          </p>
          <select
            className="select select-bordered text-black w-full max-w-xs"
            value={selectedRuntime}
            onChange={(e) => setSelectedRuntime(e.target.value)}
          >
            <option value="">Pick a runtime...</option>
            {runtimes.map((runtime, idx) => (
              <option key={idx} value={runtime}>
                {runtime}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Final Step: Get Recommendation Button */}
      {selectedRuntime && (
        <div className="mt-8 flex flex-col items-center">
          <p className="text-md text-purple-300 mb-4">
            Ready? Let’s find you a movie.
          </p>
          <button
            onClick={handleGetRecommendation}
            className="btn btn-accent px-6 py-2 text-white text-lg font-bold shadow-lg hover:scale-105 transition-transform"
          >
            🎲 Get Recommendation
          </button>
        </div>
      )}

      {/* MovieCard Result */}
      {recommendation && (
        <div className="mt-10 flex justify-center w-full px-4">
          <MovieCard {...recommendation} />
        </div>
      )}
    </div>
  );
}

export default RecommendationsPage;