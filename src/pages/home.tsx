import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MoviesListApiResponse } from '../types';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Sidebar from '../components/sideBar';
import { faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { useLikedMovies } from '../context/likedContext';
import SearchBar from '../components/search';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [likedMovies, setLikedMovies] = useState<Set<number>>(new Set()); 
   const [searchTerm, setSearchTerm] = useState<string>(''); 

  const { addLikedMovie } = useLikedMovies();

  const categories = ['All', 'Action', 'Romance', 'Comedy', 'Drama', 'Sci-Fi', 'Crime', 'Animation'];

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get<MoviesListApiResponse>('https://yts.mx/api/v2/list_movies.json');
        setMovies(response.data.data.movies);
      } catch (e: any) {
        setError(e.message || 'An error occurred while fetching movies.');
        console.error('Error fetching movies:', e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const handleLike = (movie: Movie) => {
    const updatedLikedMovies = new Set(likedMovies); 

    if (updatedLikedMovies.has(movie.id)) {
      updatedLikedMovies.delete(movie.id);  
    } else {
      updatedLikedMovies.add(movie.id);  
      addLikedMovie(movie);  
    }

    setLikedMovies(updatedLikedMovies); 
  };

const filteredMovies = selectedCategory === 'All'
  ? movies
  : movies.filter(movie => movie.genres && movie.genres.includes(selectedCategory));


     const searchedMovies = searchTerm.length > 0 
        ? filteredMovies.filter(movie =>
            movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : filteredMovies; 

  return ( <>
  
       <div className='p-4 md:absolute md:right-52 md:-top-2 sm:relative  sm:mt-4'>
        <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
      </div>


    <div className="flex sm:w-full">
 
      <Sidebar categories={categories} onSelectCategory={setSelectedCategory} />
    
     
    
      <div className="container mx-auto px-4">
        {isLoading && (
          <div className="text-white font-bold flex flex-row justify-center items-center">Loading...</div>
        )}
        {error && <div>Error: {error}</div>}
        {!isLoading && !error && filteredMovies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4  ">
            {searchedMovies.map((movie) => (
              <div key={movie.id} className="bg-white rounded-lg shadow-md p-4">
                <img
                  src={movie.medium_cover_image}
                  alt={movie.title}
                  className="rounded-lg mb-4 m-auto"
                />
                <Link to={`/movie/${movie.id}`}>
                 <h2 className="text-xl font-semibold text-black">{movie.title_long}</h2>
                </Link>
                <div className="text-lg text-black flex font-bold items-center gap-4">
                  {movie.rating}
                  <FontAwesomeIcon icon={faStar} color="orange" className="ml-1" />
                  <span className='truncate'>
                  {movie.genres ? movie.genres.slice(0, 3).join(', ') : 'Unknown Genre'}
                </span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: 14 }}>
                  <FontAwesomeIcon
                    icon={faThumbsUp}
                    color={likedMovies.has(movie.id) ? 'orange' : 'black'}
                    size="2xl"
                    onClick={() => handleLike(movie)}
                    style={{ cursor: likedMovies.has(movie.id) ? 'not-allowed' : 'pointer' }} // Disable cursor  
                  />
                </div>
                <div className='flex justify-center mt-3 '>
                   <button className='bg-black text-white p-3 rounded   '> Watch Now </button>
                </div>
               
              </div>
            ))}
          </div>
        )}
      </div>
      
    </div>
    </>
  );
};

export default Home;
