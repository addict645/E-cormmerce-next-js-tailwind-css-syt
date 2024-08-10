// src/app/components/FilterSidebar.js
'use client';

const categories = ['Electronics', 'Clothing', 'Home', 'Books'];

const FilterSidebar = ({ setSelectedCategory, setMinPrice, setMaxPrice }) => {
  return (
    <div className="bg-white p-4 shadow-md sticky top-0 left-0 mt-4 ml-4">
      <h2 className="text-lg font-semibold mb-4">Filters</h2>
      
      {/* Categories */}
      <div className="mb-4">
        <h3 className="font-semibold mb-2">Category</h3>
        <ul>
          {categories.map(category => (
            <li key={category} className="mb-2">
              <button 
                onClick={() => setSelectedCategory(category)} 
                className="w-full text-left border-b border-gray-300 pb-2"
              >
                {category}
              </button>
            </li>
          ))}
        </ul>
      </div>

      {/* Price Range */}
      <div>
        <h3 className="font-semibold mb-2">Price Range</h3>
        <input
          type="number"
          onChange={(e) => setMinPrice(Number(e.target.value))}
          placeholder="Min Price"
          className="border rounded-lg p-2 mb-2 w-full"
        />
        <input
          type="number"
          onChange={(e) => setMaxPrice(Number(e.target.value))}
          placeholder="Max Price"
          className="border rounded-lg p-2 w-full"
        />
      </div>
    </div>
  );
};

export default FilterSidebar;
