import React from 'react';

function SignupPanel({ onCancel }) {
  return (
    <div
      className="w-screen min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/video-store.png')" }}
    >
      <div className="w-full sm:max-w-md bg-black/70 p-6 rounded-xl shadow-lg text-white font-bitcount">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered text-black"
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered text-black"
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered text-black"
          />
          <button type="submit" className="btn btn-primary">
            Create Account
          </button>
          <button
            type="button"
            className="btn btn-ghost mt-2"
            onClick={onCancel}
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignupPanel;