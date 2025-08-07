import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import Recommendations from './pages/Recommendations';
import SavedMovies from './pages/SavedMovies';
import AboutPage from './pages/AboutPage';
import NavBar from './components/NavBar';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/about" element={<AboutPage />} />
      </Routes>
    </Router>
  );
}

export default App;