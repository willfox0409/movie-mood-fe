import React, { useRef, useState } from 'react';
import LoginPanel from '../components/LoginPanel';
import SignupPanel from '../components/SignupPanel';
import { Typewriter } from 'react-simple-typewriter';

function LandingPage() {
  const heroRef = useRef(null);
  const loginRef = useRef(null);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleLoginClick = () => {
    setShowSignup(false);
    setShowLogin(true);
    setTimeout(() => {
      loginRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  const handleSignupClick = () => {
    setShowLogin(false);
    setShowSignup(true);
    setTimeout(() => loginRef.current?.scrollIntoView({ behavior: 'smooth' }), 50);
  };

  const handleCancel = () => {
    heroRef.current?.scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => {
      setShowLogin(false);
      setShowSignup(false);
    }, 500);
  };

  return (
    <div className="w-full">
     {/* Hero */}
      <section
        ref={heroRef}
        className="
          relative w-full min-h-screen
          bg-cover bg-center bg-no-repeat
          flex flex-col items-center justify-center
          text-white px-6
        "
        style={{ backgroundImage: "url('/images/summer_suburb_dusk.png')" }}
      >
        {/* Soft gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-black/20 pointer-events-none" />

        {/* Neon title */}
        <h1
          className="
            relative z-10
            text-5xl md:text-6xl font-permanent-marker tracking-wide text-center
            [text-shadow:_0_0_12px_rgba(0,255,255,0.9),_0_0_24px_rgba(255,0,255,0.6)]
            drop-shadow-[0_0_18px_rgba(255,0,255,0.55)]
            -translate-y-4
          "
          style={{
            backgroundImage:
              'linear-gradient(90deg, #7DF9FF 0%, #FF6EC7 50%, #7DF9FF 100%)',
            WebkitBackgroundClip: 'text',
            color: 'transparent'
          }}
        >
          Welcome to Movie Mood
        </h1>

        {/* TV with overlaid buttons */}
        <div className="relative z-10 mt-12 w-[88%] max-w-md translate-y-2">
          <img
            src="/images/tv-sky.png"
            alt="Retro TV"
            className="w-full h-auto drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
            loading="lazy"
            draggable={false}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col gap-3">
              <button
                className="
                  px-6 py-2 text-black bg-white rounded
                  border border-white/60 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  hover:shadow-[2px_2px_0px_rgba(0,0,0,0.5)]
                  transition-all
                "
                onClick={handleLoginClick}
              >
                Log In
              </button>
              <button
                className="
                  px-6 py-2 text-black bg-white rounded
                  border border-white/60 shadow-[4px_4px_0px_rgba(0,0,0,0.5)]
                  hover:translate-x-[1px] hover:translate-y-[1px]
                  hover:shadow-[2px_2px_0px_rgba(0,0,0,0.5)]
                  transition-all
                "
                onClick={handleSignupClick}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Auth section */}
      {(showLogin || showSignup) && (
        <section
          ref={loginRef}
          className="min-h-screen w-full bg-cover bg-center flex items-center justify-center px-6 py-12"
          style={{ backgroundImage: "url('/images/video-store.png')" }}
        >
          {showLogin && <LoginPanel onCancel={handleCancel} />}
          {showSignup && <SignupPanel onCancel={handleCancel} />}
        </section>
      )}
    </div>
  );
}

export default LandingPage;