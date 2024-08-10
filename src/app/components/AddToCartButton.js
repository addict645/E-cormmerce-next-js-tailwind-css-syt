import React from 'react';
import { useCart } from '../context/CartContext';

const AddToCartButton = ({ product }) => {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
    console.log(`${product.name} added to cart`); // Debugging line
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white hover:bg-green-500 px-3 py-1 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition duration-300 inline-flex items-center justify-center w-32"
    >
      Add to Cart
    </button>
  );
};

export default AddToCartButton;
