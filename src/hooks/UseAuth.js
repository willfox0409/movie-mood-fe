import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiFetch } from "../api";

function useAuth() {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const data = await apiFetch("/api/v1/login", {
        method: "POST",
        body: JSON.stringify({
          user: { username, password }
        }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      navigate("/recommendations");
      return data;
    } catch (err) {
      console.error("Login failed:", err);
      setError(err.message || "An error occurred.");
      return null;
    }
  };

  const signup = async (username, email, password) => {
    try {
      const data = await apiFetch("/api/v1/signup", {
        method: "POST",
        body: JSON.stringify({
          user: { username, email, password }
        }),
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("username", username);
      navigate("/recommendations");
      return data;
    } catch (err) {
      console.error("Signup failed:", err);
      setError(err.message || "An error occurred.");
      return null;
    }
  };

  return { login, signup, error };
}

export default useAuth;