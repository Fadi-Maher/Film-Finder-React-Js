import React from 'react';


    interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;

}
const SearchBar: React.FC<SearchBarProps> = ({searchTerm , onSearch}) => {

const handleChange  = (event: React.ChangeEvent<HTMLInputElement>) =>{
    onSearch(event.target.value);
}



 


  return (
    <div>
        <input type='text'
         value={searchTerm}
         onChange={handleChange}
         placeholder="Search for a movie..."
         className=' p-2 rounded w-64'
        
         />

      
    </div>
  );
};

export default SearchBar;