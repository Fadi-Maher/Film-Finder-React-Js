import React, { createContext, useContext, useState, ReactNode  } from 'react';
import { Movie } from '../types';

interface LikedMoviesContextType {
  likedMovies: Movie[];
  addLikedMovie: (movie: Movie) => void;  
  removeLikedMovie: (movie: Movie) => void;  
}

const LikedMoviesContext = createContext<LikedMoviesContextType | undefined>(undefined);

 export const LikedMoviesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [likedMovies, setLikedMovies] = useState<Movie[]>(() => {
    const savedMovies = localStorage.getItem('likedMovies');
    return savedMovies ? JSON.parse(savedMovies) : [];
  });

   const addLikedMovie = (movie: Movie) => {
    setLikedMovies(prevMovies => {
      const updatedMovies = [...prevMovies, movie];  
      localStorage.setItem('likedMovies', JSON.stringify(updatedMovies));  
      return updatedMovies;
    });
  };

   const removeLikedMovie = (movie: Movie) => {
    setLikedMovies(prevMovies => {
      const updatedMovies = prevMovies.filter(m => m.id !== movie.id);  
      localStorage.setItem('likedMovies', JSON.stringify(updatedMovies));  
      return updatedMovies;
    });
  };

  return (
    <LikedMoviesContext.Provider value={{ likedMovies, addLikedMovie, removeLikedMovie }}>
      {children}
    </LikedMoviesContext.Provider>
  );
};

export const useLikedMovies = () => {
  const context = useContext(LikedMoviesContext);
  if (!context) {
    throw new Error('useLikedMovies must be used within a LikedMoviesProvider');
  }
  return context;
};
