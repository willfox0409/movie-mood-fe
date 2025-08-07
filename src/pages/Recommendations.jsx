import React, { useState, useRef, useEffect } from 'react';
import { moods, genres, decades, runtimes } from '../assets/dropdownOptions';
import MovieCard from '../components/MovieCard'; 
import { Typewriter } from 'react-simple-typewriter';

function RecommendationsPage() {
  const username = localStorage.getItem('username');
  const genreRef = useRef(null);
  const [selectedMood, setSelectedMood] = useState('');
  const [showGenre, setShowGenre] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showDecade, setShowDecade] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState('');
  const decadeRef = useRef(null);
  const [selectedRuntimeFilter, setSelectedRuntimeFilter] = useState('');
  const [showRuntime, setShowRuntime] = useState(false);
  const runtimeRef = useRef(null);
  const [recommendation, setRecommendation] = useState(null);
  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

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

  useEffect(() => {
  const fadeTimer = setTimeout(() => {
    setFadeOut(true); // Start fading
  }, 3000); // wait 3s before fading

  const removeTimer = setTimeout(() => {
    setShowWelcome(false); // Fully remove after fade
  }, 4000); // wait 1s after fade to remove

  return () => {
    clearTimeout(fadeTimer);
    clearTimeout(removeTimer);
  };
}, []);

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
          runtime_filter: selectedRuntimeFilter
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

  console.log("🎬 Current recommendation:", recommendation);
  const handleSaveMovie = async () => {
  const token = localStorage.getItem('token');

    try {
      console.log("Sending to backend:", {
        movie_id: recommendation.movie_id
      });
      const response = await fetch('http://localhost:3000/api/v1/saved_movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          saved_movie: {
            movie_id: recommendation.movie_id
          }
        })
      });

      if (response.ok) {
        console.log('Movie saved!');
      } else {
        console.error('❌ Failed to save movie');
      }
    } catch (error) {
      console.error('⚠️ Network error saving movie:', error);
    }
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center text-white flex flex-col items-center pt-16 px-4 font-bitcount"
      style={{ backgroundImage: "url('/images/summer_suburb_dusk.png')" }}
    >
    {showWelcome && (
      <h1
        className={`text-3xl mb-8 transition-opacity duration-1000 ease-in-out ${
          fadeOut ? 'opacity-0' : 'opacity-100'
        }`}
      >
        Welcome back {username}!
      </h1>
    )}
      <p className="text-lg text-white mb-4 max-w-xl text-center">
        <Typewriter
          words={[
            'Less browsing. More watching. Pick a mood!',
            'Fewer clicks. Better picks. Start with a mood.',
            'One mood. One movie. Press play.'
          ]}
          loop={true}
          cursor
          cursorStyle="_"
          typeSpeed={80}
          deleteSpeed={40}
          delaySpeed={3000}
        />
      </p>

      {/* Mood Dropdown */}
      <select
        className="select select-bordered bg-white text-black w-full max-w-xs mb-4"
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
          <p className="text-lg text-white mb-2 text-shadow-pink">
            Love that. Let’s narrow it down — got a genre in mind?
          </p>
          <select
            className="select select-bordered bg-white text-black w-full max-w-xs mb-4"
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
          <p className="text-lg text-white mb-2 text-shadow-pink">
            Nice. Want to stick to a particular decade?
          </p>
          <select
            className="select select-bordered bg-white text-black w-full max-w-xs mb-4"
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
          <p className="text-lg text-white mb-2 text-shadow-pink">
            Almost there. Any preference on how long the movie should be?
          </p>
          <select
            className="select select-bordered bg-white text-black w-full max-w-xs mb-4"
            value={selectedRuntimeFilter}
            onChange={(e) => setSelectedRuntimeFilter(e.target.value)}
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

      {selectedRuntimeFilter && (
        <div className="mt-8 flex flex-col items-center">
          <p className="text-lg text-white mb-2 text-shadow-pink">
            Ready? Let’s find you a movie.
          </p>
          <div className="flex items-center gap-6">
            <img
              src="/animations/square-colors.gif"
              alt="Animated square sprite"
              className="w-12 h-12"
            />

            <button
              onClick={handleGetRecommendation}
              className="px-8 py-3 text-base font-semibold text-black bg-[#C0C0C0] border border-[#808080] rounded-sm shadow-[4px_4px_0px_#404040] hover:shadow-[2px_2px_0px_#404040] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150 ease-in-out"
            >
              Get Recommendation
            </button>

            <img
              src="/animations/square-colors.gif"
              alt="Animated square sprite"  
              className="w-12 h-12"
            />
          </div>
        </div>
      )}

      {/* MovieCard Result */}
      {recommendation && (
        <div className="mt-10 flex flex-col items-center">
          <MovieCard {...recommendation} />

          <button
            onClick={handleSaveMovie}
            className="btn mt-4 bg-black text-white px-6 py-2 text-md rounded hover:bg-gray-900 transition"
          >
            💾 Save for Later?
          </button>
        </div>
      )}
    </div>
  );
}

export default RecommendationsPage;