 

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/home';
import AboutUs from './pages/about';
import Contact from './pages/contact'; 
import Navbar from './components/navBar';
import TopMovies from './pages/topMovies';
import LikedMovies from './pages/likedMovies';
import MovieDetails from './pages/movieDetails';
import { LikedMoviesProvider } from './context/likedContext';
const App: React.FC = () => {
  return (
    
    <div className='bg-black opacity-90 min-h-screen'>
      <LikedMoviesProvider>
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/topMovies" element={<TopMovies />} />
        <Route path="/likedMovies" element={<LikedMovies />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
    </LikedMoviesProvider>
    </div>
  );
};

export default App;
