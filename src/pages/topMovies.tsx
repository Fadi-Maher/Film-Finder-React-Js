import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie, MovieApiResponse } from '../types';
import { faStar, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useLikedMovies } from '../context/likedContext';
import { Link } from 'react-router-dom';
import SearchBar from '../components/search';

const TopMovies: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [likedMovies, setLikedMovies] = useState<Set<number>>(new Set());
  const [searchTerm, setSearchTerm] = useState<string>('');
  
  const { addLikedMovie } = useLikedMovies();

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError('');

      try {
        const response = await axios.get<MovieApiResponse>('https://yts.mx/api/v2/list_movies.json');
        const moviesData = response.data.data.movies;

        
        const highMovies = moviesData.filter(movie => movie.rating > 6);
        setMovies(highMovies);  

      } catch (error: any) {
        setError(error.message || 'An error occurred while fetching movies.');
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

 
  const searchedMovies = searchTerm.length > 0
    ? movies.filter(movie => movie.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : movies;

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

  return (

     
    <div className='flex flex-col items-center'>

      <div className='p-4 md:absolute md:right-52 md:-top-2 sm:relative  sm:mt-4'>
      <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
     </div>
     
      <h1>Top Rated Movies</h1>
     
      

      <div className="container mx-auto px-4">
        
        {loading && (
          <div className="text-white font-bold flex justify-center items-center">Loading...</div>
        )}
        {error && <div className="text-red-500 text-center">Error: {error}</div>}

        {!loading && !error && searchedMovies.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
                    style={{ cursor: likedMovies.has(movie.id) ? 'not-allowed' : 'pointer' }}
                  />
                </div>

                <div className='flex justify-center mt-3'>
                  <button className='bg-black text-white p-3 rounded'>Watch Now</button>
                </div>
              </div>
            ))}
          </div>
        )}

      
        {!loading && !error && searchedMovies.length === 0 && (
          <div className="text-center text-black">No movies found.</div>
        )}
      </div>
    </div>
    
  );
};

export default TopMovies;



















{/* // import React, { useState } from 'react'; */}
{/* //  const TopMovies: React.FC = () => { */}
 
{/* //   const [task, setTask] = useState('');  
//   const [tasks, setTasks] = useState<string[]>([]);  
//    const [markedTasks, setMarkedTasks] = useState<boolean[]>([]);  */}

  
{/* //   const handleAddTask = () => {
//      if (task !== '') {  
//        setTasks([...tasks, task]);  
//        setMarkedTasks([...markedTasks, false]); 
//        setTask('');  
//     }
//   };

//    const handleToggleTask = (index: number) => {
//      const updatedMarkedTasks = [...markedTasks];
    
//      updatedMarkedTasks[index] = !updatedMarkedTasks[index];
    
//      setMarkedTasks(updatedMarkedTasks); 
//   };

//   const handleDelete = (index : number) =>{
//     const updatedTask = [...tasks]
//     updatedTask.splice(index, 1)
//     setTasks(updatedTask)
//   }
 
//   return (
//     <div>
       
//        <h1>To Do List </h1>


//       <input
//         className='p-2 m-2'
//         value={task}  
//         onChange={(event) => setTask(event.target.value)} 
//         type="text"
//         placeholder='Add task'  
//       />
//        <button onClick={handleAddTask} className='bg-white text-black p-2'>
//         Add Task
//       </button>
//       <div>
//          {tasks.map((item, index) => (
//           <div
//             key={index}  
//             onClick={() => handleToggleTask(index)} 
//             className={ ` cursor-pointer text-white ${markedTasks[index] ? 'line-through' : ''}`}  
//           >
//             {item} 
//             <span onClick={() => handleDelete(index)}  className='text-white'> delete X</span> 
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

//  export default TopMovies; */}
