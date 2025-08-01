import React, { useRef, useState } from 'react';
import LoginPanel from '../components/LoginPanel';
import SignupPanel from '../components/SignupPanel';

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
    }, 50); // slight delay to allow section to mount
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
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="h-screen w-full bg-cover bg-center flex flex-col items-center justify-center text-white px-6"
        style={{ backgroundImage: "url('/images/summer_suburb_dusk.png')" }}
      >
        <div className="bg-black/50 p-8 rounded-xl max-w-xl text-center shadow-xl">
          <h1 className="text-5xl font-bold mb-4 font-bitcount">Welcome to Movie Mood</h1>
          <p className="text-lg mb-6 font-bitcount">
            Find the perfect movie to match your mood — say goodbye to endless browsing.
          </p>
          <div className="flex justify-center gap-4">
            <button
              className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 font-semibold transition"
              onClick={handleLoginClick}
            >
              Log In
            </button>
            <button
              className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200 font-semibold transition"
              onClick={handleSignupClick}
            >
              Sign Up
            </button>
          </div>
        </div>
      </section>

      {/* Login Section — Only shows if `showLogin` is true */}
      {(showLogin || showSignup) && (
        <section
          ref={loginRef}
          className="h-screen w-full bg-cover bg-center flex items-center justify-center px-6 py-12"
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