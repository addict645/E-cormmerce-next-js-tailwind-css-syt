'use client';

import React, { useState } from 'react'; // Import React
import Image from 'next/image';
import Link from 'next/link';
import { FaUser, FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa';
import { useCart } from '../context/CartContext'; // Ensure this path is correct
import CartOverlay from './CartOverlay'; // Ensure this path is correct
import SearchBar from './SearchBar'; // Import the SearchBar component

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cart } = useCart(); // Get cart from context

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Get the count of items in the cart

  const handleSearch = (term) => {
    // This function will handle the search logic
    console.log('Search Term:', term);
    // You can trigger a search action here or update the state to filter products
    // For example, you might want to redirect to a search results page or filter products in state
  };

  return (
    <nav className="bg-blue-500 h-18 p-4 sticky top-0 shadow-md z-50 mb-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link href="/">
          <div className="text-white text-2xl font-bold flex items-center cursor-pointer">
            <Image src="/images/LOGO.png" alt="MyShop Logo" width={40} height={40} className="mr-2" />
            MyShop
          </div>
        </Link>

        {/* Search Bar */}
        <div className="flex-grow max-w-xs relative hidden md:block">
          <SearchBar setSearchTerm={setSearchTerm} />
        </div>

        {/* Navigation Links */}
        <div
          className={`${
            isMobileMenuOpen ? 'block' : 'hidden'
          } absolute md:static top-16 left-0 w-full md:w-auto bg-blue-600 md:bg-transparent md:flex md:space-x-6 md:items-center z-10`}
        >
          <Link href="/products">
            <div className="block md:inline-block text-white hover:text-gray-300 transition px-4 py-2 md:p-0 cursor-pointer">
              Products
            </div>
          </Link>
          <Link href="/about">
            <div className="block md:inline-block text-white hover:text-gray-300 transition px-4 py-2 md:p-0 cursor-pointer">
              About Us
            </div>
          </Link>
          <Link href="/contact">
            <div className="block md:inline-block text-white hover:text-gray-300 transition px-4 py-2 md:p-0 cursor-pointer">
              Contact
            </div>
          </Link>
        </div>

        {/* User Account and Cart */}
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/account">
            <div className="text-white hover:text-gray-300 transition cursor-pointer">
              <FaUser className="text-xl" />
            </div>
          </Link>
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center"
          >
            <FaShoppingCart className="text-xl" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white text-2xl focus:outline-none ml-auto"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Search Bar */}
      <div className="md:hidden mx-4 mt-4">
        <SearchBar setSearchTerm={setSearchTerm} />
      </div>

      {/* Mobile User Account and Cart */}
      <div className="flex md:hidden space-x-4 items-center mt-4">
        <Link href="/account">
          <div className="text-white hover:text-gray-300 transition cursor-pointer">
            <FaUser className="text-xl" />
          </div>
        </Link>
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative bg-green-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-green-700 transition-colors duration-300 flex items-center"
        >
          <FaShoppingCart className="text-xl" />
          {cartCount > 0 && (
            <span className="absolute top-0 right-0 -translate-x-1/2 translate-y-1/2 bg-red-500 text-white text-xs rounded-full px-2 py-1">
              {cartCount}
            </span>
          )}
        </button>
      </div>

      {/* Cart Overlay */}
      <CartOverlay isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </nav>
  );
};

export default Navbar;
