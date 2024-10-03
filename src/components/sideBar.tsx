import React from 'react';

 
type SidebarProps = {
  categories: string[];                
  onSelectCategory: (category: string) => void;  
};

 
const Sidebar: React.FC<SidebarProps> = ({ categories, onSelectCategory }) => {
  return (
    <div className="w-60 min-h-screen bg-black opacity-90 text-white p-4">
      <h2 className="text-2xl font-bold mb-4">Movie Types</h2>
      <ul className="space-y-2">
        {categories.map((category, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-600 p-4 rounded font-serif font-bold"
            onClick={() => onSelectCategory(category)}
         >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
