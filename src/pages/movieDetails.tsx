import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'; // Make sure you have react-router-dom installed
import axios from 'axios';
import { MovieApiResponse, Movie } from '../types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useLikedMovies } from '../context/likedContext';

const MovieDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();  
  const [movie, setMovie] = useState<Movie | null>(null);  
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const { addLikedMovie } = useLikedMovies();
  const [isLiked, setIsLiked] = useState(false); 

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get<MovieApiResponse>(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`);
        setMovie(response.data.data.movie);  
      } catch (e) {
        setError('Failed to fetch movie details.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleLike = () => {
    if (movie) {
      setIsLiked(!isLiked); 
      addLikedMovie(movie);  
    }
  };

  if (loading) return <div className="text-white font-bold">Loading...</div>;

  if (error) return <div className="text-red-500">{error}</div>;
  
  if (!movie) return <div>No movie found.</div>; // This will handle null movie state

  return (
    <div className="p-4">
      <h1 className="text-4xl font-bold text-white text-center p-2">{movie.title}</h1>

      <div className='flex flex-col md:flex-row items-center justify-around p-4'>
        <img 
          src={movie.large_cover_image} 
          alt={movie.title} 
          className="rounded-lg mb-4 md:mb-0 w-full md:w-1/3" 
        />
        <div className="text-base md:text-lg text-white w-full md:w-1/2">
          <p className="mb-2"><strong>Rating:</strong> {movie.rating} <FontAwesomeIcon icon={faStar} color="orange" /></p>
          <p className="mb-2"><strong>Genres:</strong> {movie.genres.join(', ')}</p>

          <p className="break-words md:text-3xl mb-4"><strong>Description:</strong> A thrilling cinematic experience that captures a compelling storyline, memorable characters, and breathtaking visuals. Directed by {movie.director}, this film explores themes of {movie.genres[0]} and keeps audiences engaged from start to finish.
          </p>

          <div className={`flex items-center ${isLiked ? 'bg-blue-500' : 'bg-transparent'} p-2 rounded-md`}>
            <FontAwesomeIcon
              icon={faThumbsUp}
              color="white"
              size="2xl"
              onClick={handleLike}
              style={{ cursor: 'pointer' }}
            />
            <span className="ml-2">Like To Save this movie</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
