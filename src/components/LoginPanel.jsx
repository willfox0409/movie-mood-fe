import React, { useState } from 'react';
import useAuth from '../hooks/UseAuth';

function LoginPanel({ onCancel }) {
  const { login, error } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(username, password);
    if (result) {
      // alert(result.message); // TODO: Replace with redirect or set global user
    }
  };

  return (
    <div className="w-full sm:max-w-md bg-black/80 p-6 rounded-xl shadow-lg text-white font-bitcount">
      <h2 className="text-2xl font-bold mb-4">Log In</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="input input-bordered text-black"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="input input-bordered text-black"
        />
        <button type="submit" className="btn btn-primary">
          Log In
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
  );
}

export default LoginPanel;