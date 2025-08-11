import { Link, useNavigate, useLocation } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token"); // or however you're storing auth
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center px-6 py-2 md:py-3 bg-gray-900 text-white shadow-md">
      {/* Logo + Title */}
      <div
        className="flex items-center gap-10 cursor-pointer"
        onClick={() => navigate("/recommendations")}
      >
        <video
          src="/animations/ezgif.com-gif-to-mp4-converter.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="w-14 h-14 rounded shadow-[0_0_15px_rgba(255,0,255,0.7)] animate-pulse"
        />
        <h1 className="text-6xl font-bold font-rubik text-shadow-neon-blue cursor-pointer hover:text-pink-400 transition-colors duration-300">
          Movie Mood
        </h1>
      </div>

      {/* Links + Logout */}
      <div className="flex items-center gap-6 text-xl font-geo">
        <Link to="/recommendations" className="font-rubik text-shadow-neon-blue hover:text-pink-400 transition-colors duration-300">
          Recommendation
        </Link>
        <Link to="/saved-movies" className="font-rubik text-shadow-neon-blue hover:text-pink-400 transition-colors duration-300">
          Saved
        </Link>
        <Link to="/about" className="font-rubik text-shadow-neon-blue hover:text-pink-400 transition-colors duration-300">
          About
        </Link>

        {/* Show Logout button if NOT on landing page */}
        {location.pathname !== "/" && (
          <button
            onClick={handleLogout}
            className="px-4 py-1 border border-pink-400 text-pink-400 rounded hover:bg-pink-400 hover:text-white transition-all"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}