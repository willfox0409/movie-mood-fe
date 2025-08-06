import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-900 text-white shadow-md">
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
          className="w-17 h-17 rounded shadow-[0_0_15px_rgba(255,0,255,0.7)] animate-pulse"
        />
        <h1 className="text-6xl font-bold font-rubik text-shadow-neon-blue cursor-pointer hover:text-pink-400 transition-colors duration-300">
          Movie Mood
        </h1>
      </div>

      <div className="flex gap-6 text-xl font-geo">
        <Link to="/recommendations" className="font-rubik text-shadow-neon-blue hover:text-pink-400 transition-colors duration-300">
          Recommendation
        </Link>
        <Link to="/saved-movies" className="font-rubik text-shadow-neon-blue hover:text-pink-400 transition-colors duration-300">
          Saved For Later
        </Link>
        <Link to="/about" className="font-rubik text-shadow-neon-blue hover:text-pink-400 transition-colors duration-300">
          About the App
        </Link>
      </div>
    </nav>
  );
}