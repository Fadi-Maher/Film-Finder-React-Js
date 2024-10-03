// likedMovies.tsx
import React from 'react';
import { useLikedMovies } from '../context/likedContext';
import { Movie } from '../types';

const LikedMovies: React.FC = () => {
  const { likedMovies, removeLikedMovie } = useLikedMovies();

  const handleRemoveMovie = (movie: Movie) => {
    removeLikedMovie(movie);
  };

  return (
    <div className="  p-4">
      <h1 className="text-2xl font-bold text-white text-center">Liked Movies</h1>
      {likedMovies.length === 0 ? (
        <p className="text-white text-center">No liked movies yet.</p>
      ) : (
     
        <div className="mt-4  grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4  ">
          {likedMovies.map(movie => (
            
            <div key={movie.id} className="bg-white rounded-lg  flex flex-wrap flex-col  ">
              <img src={movie.medium_cover_image} alt={movie.title_long} className="rounded-t-lg" />
              <div className="p-4">
                <h2 className="text-xl text-black font-bold">{movie.title_long}</h2>
                
                <button
                  onClick={() => handleRemoveMovie(movie)}
                  className="mt-2 bg-red-600 text-white rounded py-1 px-3 hover:bg-red-700"
                >
                  Remove
                </button>
              </div>
            </div>
            
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedMovies;
