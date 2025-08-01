import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function useAuth() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await response.json(); // parse it no matter what for logging

      if (!response.ok) {
        console.error("Login failed:", data);
        setError(data.error || 'An error occurred.');
        return null;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('username', username);
      navigate('/recommendations');
      return data;
    } catch (error) {
      console.error("Fetch error:", error);
      setError('An error occurred. Please try again.');
      return null;
    }
  };

  return { login, error };
}

export default useAuth;