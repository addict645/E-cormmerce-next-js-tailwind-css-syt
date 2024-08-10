'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FilterSidebar from '../components/FilterSidebar';
import Pagination from '../components/Pagination';
import AddToCartButton from '../components/AddToCartButton';
import SearchBar from '../components/SearchBar'; // Import SearchBar component

// Mock product data
const mockProducts = [
  { id: 1, name: 'Product 1', price: 49.99, image: '/images/product1.jpeg', category: 'Electronics', description: 'This is a great electronic product.' },
  { id: 2, name: 'Product 2', price: 79.99, image: '/images/product2.jpg', category: 'Clothing', description: 'Stylish and comfortable clothing.' },
  { id: 3, name: 'Product 3', price: 49.99, image: '/images/product1.jpeg', category: 'Electronics', description: 'Another fantastic electronic product.' },
  { id: 4, name: 'Product 4', price: 11.22, image: '/images/product2.jpg', category: 'Clothing', description: 'Trendy and fashionable clothing.' },
  { id: 5, name: 'Product 5', price: 36.35, image: '/images/product1.jpeg', category: 'Electronics', description: 'This is a great electronic product.' },
  { id: 6, name: 'Product 6', price: 102.96, image: '/images/product2.jpg', category: 'Clothing', description: 'Stylish and comfortable clothing.' },
  { id: 7, name: 'Product 7', price: 419.99, image: '/images/product1.jpeg', category: 'Electronics', description: 'Another fantastic electronic product.' },
  { id: 8, name: 'Product 8', price: 179.99, image: '/images/product2.jpg', category: 'Clothing', description: 'Trendy and fashionable clothing.' },
  { id: 9, name: 'Product 9', price: 429.99, image: '/images/product1.jpeg', category: 'Electronics', description: 'This is a great electronic product.' },
  { id: 10, name: 'Product 10', price: 19.99, image: '/images/product2.jpg', category: 'Clothing', description: 'Stylish and comfortable clothing.' },
  { id: 11, name: 'Product 11', price: 29.99, image: '/images/product1.jpeg', category: 'Electronics', description: 'Another fantastic electronic product.' },
  { id: 12, name: 'Product 12', price: 59.99, image: '/images/product2.jpg', category: 'Clothing', description: 'Trendy and fashionable clothing.' },
  { id: 13, name: 'Product 13', price: 41.99, image: '/images/product1.jpeg', category: 'Electronics', description: 'This is a great electronic product.' },
  { id: 14, name: 'Product 14', price: 89.99, image: '/images/product2.jpg', category: 'Clothing', description: 'Stylish and comfortable clothing.' },
  { id: 15, name: 'Product 15', price: 23.99, image: '/images/product1.jpeg', category: 'Electronics', description: 'Another fantastic electronic product.' },
  { id: 16, name: 'Product 16', price: 60.99, image: '/images/product2.jpg', category: 'Clothing', description: 'Trendy and fashionable clothing.' },
];

export default function Products() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [currentPage, setCurrentPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(12);

  useEffect(() => {
    const handleResize = () => {
      setProductsPerPage(window.innerWidth < 768 ? 10 : 12);
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filtering the products based on search term, category, and price range
  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
    (selectedCategory === '' || product.category === selectedCategory) &&
    product.price >= minPrice &&
    product.price <= maxPrice
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <>
      <div className="flex flex-col bg-green-600 md:flex-row">
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="md:hidden p-2 bg-blue-500 text-white"
        >
          {isSidebarOpen ? 'Close Filters' : 'Open Filters'}
        </button>

        <aside className={`w-full md:w-48 p-2 bg-gray-100 border-r border-gray-200 ${isSidebarOpen ? 'block' : 'hidden'} md:block sticky top-0`}>
          <FilterSidebar
            setSelectedCategory={setSelectedCategory}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
          />
        </aside>

        <main className={`flex-1 p-6 ${isSidebarOpen ? 'ml-0' : 'md:ml-32'} transition-margin duration-300`}>
          {/* Add SearchBar here */}
          <div className="mb-6">
            <SearchBar setSearchTerm={setSearchTerm} />
          </div>

          <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentProducts.length > 0 ? (
              currentProducts.map(product => (
                <div key={product.id} className="relative bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105">
                  <div className="relative w-full h-40">
                    <Image
                      src={product.image}
                      alt={product.name}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-300 ease-in-out hover:scale-110"
                    />
                  </div>
                  <div className="p-4 flex flex-col justify-between h-60 relative space-y-2">
                    <h3 className="text-lg font-semibold mb-1">{product.name}</h3>
                    <p className="text-md text-gray-600 mb-1">{product.description}</p>
                    <p className="text-md text-gray-600">{`$${product.price.toFixed(2)}`}</p>
                    <AddToCartButton product={product} />
                  </div>
                </div>
              ))
            ) : (
              <p className="col-span-full text-center text-gray-600">No products found</p>
            )}
          </section>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </>
  );
}
