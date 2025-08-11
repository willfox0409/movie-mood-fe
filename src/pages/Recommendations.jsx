import React, { useState, useRef, useEffect } from 'react';
import { moods, genres, decades, runtimes } from '../assets/dropdownOptions';
import MovieCard from '../components/MovieCard';
import { Typewriter } from 'react-simple-typewriter';

function RecommendationsPage() {
  const username = localStorage.getItem('username');

  const genreRef = useRef(null);
  const decadeRef = useRef(null);
  const runtimeRef = useRef(null);

  const [selectedMood, setSelectedMood] = useState('');
  const [showGenre, setShowGenre] = useState(false);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [showDecade, setShowDecade] = useState(false);
  const [selectedDecade, setSelectedDecade] = useState('');
  const [selectedRuntimeFilter, setSelectedRuntimeFilter] = useState('');
  const [showRuntime, setShowRuntime] = useState(false);

  const [showWelcome, setShowWelcome] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  const [recBatch, setRecBatch] = useState(null); // { choices: [...] }
  const [recIndex, setRecIndex] = useState(0);    // 0..choices.length-1
  const [recommendation, setRecommendation] = useState(null); // current choice

  const [isLoading, setIsLoading] = useState(false);

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => { if (showGenre && genreRef.current) genreRef.current.scrollIntoView({ behavior: 'smooth' }); }, [showGenre]);
  useEffect(() => { if (showDecade && decadeRef.current) decadeRef.current.scrollIntoView({ behavior: 'smooth' }); }, [showDecade]);
  useEffect(() => { if (showRuntime && runtimeRef.current) runtimeRef.current.scrollIntoView({ behavior: 'smooth' }); }, [showRuntime]);

  useEffect(() => {
    const fadeTimer = setTimeout(() => setFadeOut(true), 3000);
    const removeTimer = setTimeout(() => setShowWelcome(false), 4000);
    return () => { clearTimeout(fadeTimer); clearTimeout(removeTimer); };
  }, []);

  const handleGetRecommendation = async () => {
    const token = localStorage.getItem('token');

    setHasSubmitted(true);          // hide selectors
    setRecBatch(null);
    setRecIndex(0);
    setRecommendation(null);
    setIsLoading(true);

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

      if (!response.ok) {
        console.error('🚫 Failed to fetch recommendation batch');
        setHasSubmitted(false); // show selectors again on failure
        return;
      }

      const data = await response.json();
      const batch = data?.data?.attributes;

      if (batch?.choices?.length > 0) {
        setRecBatch(batch);
        setRecIndex(0);
        setRecommendation(batch.choices[0]);

        // smooth scroll to the results area
        requestAnimationFrame(() => {
          resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
      } else {
        console.warn('No choices returned from backend.');
        setHasSubmitted(false);
      }
    } catch (err) {
      console.error('❌ Network or server error:', err);
      setHasSubmitted(false);
    } finally {
      setIsLoading(false);
    }
  };

const handleSaveMovie = async () => {
  const token = localStorage.getItem('token');
  if (!recommendation) return;

  // Build payload: use movie_id if we have it; otherwise tmdb path
  const body = recommendation.movie_id
    ? { saved_movie: { movie_id: recommendation.movie_id } }
    : {
        saved_movie: {
          tmdb_id: recommendation.tmdb_id,
          title: recommendation.title,
          poster_url: recommendation.poster_url,
          description: recommendation.description,
          runtime: recommendation.runtime_minutes
        }
      };

  try {
    const res = await fetch('http://localhost:3000/api/v1/saved_movies', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(body)
    });

    // <-- IMPORTANT: return it so the child can read res.ok / res.status
    return res;
  } catch (err) {
    console.error('⚠️ Network error saving movie:', err);
    // Return a fake-ish Response-like object so the child can handle it uniformly
    return { ok: false, status: 0 };
  }
};

  const handleReroll = () => {
    if (!recBatch?.choices) return;
    const next = recIndex + 1;
    if (next >= recBatch.choices.length) {
      alert('You’ve reached the end of the rolls for this mood. Try changing the mood or filters!');
      return;
    }
    setRecIndex(next);
    setRecommendation(recBatch.choices[next]);
  };

// ...imports and state stay the same

  return (
    <div
      className="
        min-h-screen text-white flex flex-col items-center pt-4 px-4
        font-mansalva-regular bg-top bg-repeat-y [background-size:110%_auto]
      "
      style={{ backgroundImage: "url('/images/summer_suburb_dusk.png')" }}
    >
      {/* Gradient overlay in bottom-left */}
      {/* <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-black/40 to-transparent pointer-events-none"></div> */}

      {showWelcome && (
        <h1 className={`text-3xl mb-8 transition-opacity duration-1000 ease-in-out ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
          Welcome back {username}!
        </h1>
      )}

      {/* Headline / typewriter can always show */}
      <p className="text-lg text-white mb-4 max-w-xl text-center">
        {/* ...Typewriter unchanged... */}
      </p>

      {/* --- SELECTORS & CTA: only before submission --- */}
      {!hasSubmitted && (
        <>
          {/* Mood */}
          <select
            className="select select-bordered bg-white text-black w-full max-w-xs mb-4"
            value={selectedMood}
            onChange={(e) => { setSelectedMood(e.target.value); setShowGenre(true); }}
          >
            <option value="">Pick a mood...</option>
            {moods.map((mood, idx) => <option key={idx} value={mood}>{mood}</option>)}
          </select>

          {/* Genre */}
          {showGenre && (
            <div ref={genreRef} className="mt-6 flex flex-col items-center">
              <p className="text-lg text-white mb-2 text-shadow-pink">Genre</p>
              <select
                className="select select-bordered bg-white text-black w-full max-w-xs mb-4"
                value={selectedGenre}
                onChange={(e) => { setSelectedGenre(e.target.value); setShowDecade(true); }}
              >
                <option value="">Pick a genre...</option>
                {genres.map((g, idx) => <option key={idx} value={g}>{g}</option>)}
              </select>
            </div>
          )}

          {/* Decade */}
          {showDecade && (
            <div ref={decadeRef} className="mt-6 flex flex-col items-center">
              <p className="text-lg text-white mb-2 text-shadow-pink">Decade</p>
              <select
                className="select select-bordered bg-white text-black w-full max-w-xs mb-4"
                value={selectedDecade}
                onChange={(e) => { setSelectedDecade(e.target.value); setShowRuntime(true); }}
              >
                <option value="">Pick a decade...</option>
                {decades.map((d, idx) => <option key={idx} value={d}>{d}</option>)}
              </select>
            </div>
          )}

          {/* Runtime */}
          {showRuntime && (
            <div ref={runtimeRef} className="mt-6 flex flex-col items-center">
              <p className="text-lg text-white mb-2 text-shadow-pink">Runtime</p>
              <select
                className="select select-bordered bg-white text-black w-full max-w-xs mb-4"
                value={selectedRuntimeFilter}
                onChange={(e) => setSelectedRuntimeFilter(e.target.value)}
              >
                <option value="">Pick a runtime...</option>
                {runtimes.map((r, idx) => <option key={idx} value={r}>{r}</option>)}
              </select>
            </div>
          )}

          {/* CTA */}
          {selectedRuntimeFilter && (
            <div className="mt-8 flex flex-col items-center">
              <p className="text-lg text-white mb-2 text-shadow-pink">
                Ready? Let’s find you a movie.
              </p>
              <div className="flex items-center gap-6">
                <img src="/animations/square-colors.gif" alt="Animated square sprite" className="w-12 h-12" />
                {isLoading ? (
                  <img src="/animations/tv-loading-spinner.gif" alt="Loading..." className="w-24 h-24" />
                ) : (
                  <button
                    onClick={handleGetRecommendation}
                    className="px-8 py-3 text-base font-semibold text-black bg-[#C0C0C0] border border-[#808080] rounded-sm shadow-[4px_4px_0px_#404040] hover:shadow-[2px_2px_0px_#404040] hover:translate-x-[1px] hover:translate-y-[1px] transition-all duration-150 ease-in-out"
                  >
                    Get Recommendation
                  </button>
                )}
                <img src="/animations/square-colors.gif" alt="Animated square sprite" className="w-12 h-12" />
              </div>
            </div>
          )}
        </>
      )}

      {hasSubmitted && isLoading && (
        <div className="mt-10 relative flex items-center justify-center">
          {/* TV GIF */}
          <img
            src="/animations/tv-loading-spinner.gif"
            alt="Loading..."
            className="w-40 h-40"
          />

          {/* CRT overlay + pixel dots */}
          <div className="retro-loader-wrap">
            <div className="retro-scanlines"></div>
            <div className="flex flex-col items-center justify-center">
              <div className="retro-dots" aria-label="Loading">
                <span className="retro-dot" />
                <span className="retro-dot" />
                <span className="retro-dot" />
              </div>
              <div className="retro-loading-label">Loading</div>
            </div>
          </div>
        </div>
      )}

      {/* --- RESULT --- */}
      {recommendation && (
        <section ref={resultsRef} className="w-full">
          <div className="min-h-[calc(100vh-120px)] flex flex-col items-center justify-center pb-28">
            <div
              key={recommendation.tmdb_id || recIndex}
              className="transition-opacity duration-500 ease-in-out opacity-100"
            >
              <MovieCard
                {...recommendation}
                onSave={handleSaveMovie}
                onReroll={handleReroll}
                compact
              />
            </div>

            <p className="mt-4 text-sm opacity-80">
              Pick {recIndex + 1} of {recBatch?.choices?.length ?? 0}
            </p>

            {/* Change filters (reset) */}
            <button
              className="mt-6 px-4 py-2 text-sm font-semibold text-black bg-white/80 hover:bg-white border border-gray-300 rounded"
              onClick={() => {
                setHasSubmitted(false);
                setRecBatch(null);
                setRecIndex(0);
                setRecommendation(null);
                setSelectedMood('');
                setSelectedGenre('');
                setSelectedDecade('');
                setSelectedRuntimeFilter('');
                setShowGenre(false);
                setShowDecade(false);
                setShowRuntime(false);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              Change filters
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default RecommendationsPage;