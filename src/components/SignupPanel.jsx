import React, { useState } from 'react';
import useAuth from '../hooks/UseAuth';

function SignupPanel({ onCancel }) {
  const { signup, error } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await signup(username, email, password);
    if (result) {
      // successful signup: redirected in the hook
    }
  };

  return (
    <div
      className="w-screen min-h-screen flex items-center justify-center bg-cover bg-center overflow-hidden"
      style={{ backgroundImage: "url('/images/video-store.png')" }}
    >
      <div className="w-full sm:max-w-md bg-black/70 p-6 rounded-xl shadow-lg text-white font-bitcount">
        <h2 className="text-2xl font-bold mb-4">Sign Up</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="input input-bordered text-black"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="email"
            placeholder="Email"
            className="input input-bordered text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="input input-bordered text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
        {error && <p className="text-red-400 mt-4">{error}</p>}
      </div>
    </div>
  );
}

export default SignupPanel;