import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);  

  const toggleMenu = () => {
    setIsOpen(!isOpen);  
  };

  return (
    <nav className="bg-black p-6 opacity-90 shadow-2xl">
      <div className="container mx-auto flex gap-20  items-center">
        <h1 className="text-white text-3xl font-bold">EgyTest</h1>
        <button onClick={toggleMenu} className="md:hidden text-white">
           
          <span className="material-icons">menu</span> 
        </button>
        <ul className="hidden md:flex space-x-7">
          <li>
            <Link to="/" className="text-white hover:text-gray-400 font-bold">
              Home
            </Link>
          </li>
          <li>
            <Link to="/about" className="text-white hover:text-gray-400 font-bold">
              About
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-white hover:text-gray-400 font-bold">
              Contact us
            </Link>
          </li>
          <li>
            <Link to="/topMovies" className="text-white hover:text-gray-400 font-bold">
              Top Movies
            </Link>
          </li>
          <li>
            <Link to="/likedMovies" className="text-white hover:text-gray-400 font-bold">
              Liked Movies
            </Link>
          </li>
        
        </ul>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <ul className="flex flex-col space-y-2 p-4 bg-black">
            <li>
              <Link to="/" className="text-white hover:text-gray-400 font-bold">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-white hover:text-gray-400 font-bold">
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-white hover:text-gray-400 font-bold">
                Contact us
              </Link>
            </li>
            <li>
              <Link to="/topMovies" className="text-white hover:text-gray-400 font-bold">
                Top Movies
              </Link>
            </li>
            <li>
              <Link to="/likedMovies" className="text-white hover:text-gray-400 font-bold">
                Liked Movies
              </Link>
            </li>
           
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
