import React from 'react';

function RecommendationsPage() {
  const username = localStorage.getItem('username');

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center font-bitcount">
      <h1 className="text-3xl font-bold">Welcome back, {username}!</h1>
      <p className="text-lg text-gray-300">Your personalized movie picks will show up here soon.</p>
    </div>
  );
}

export default RecommendationsPage;

