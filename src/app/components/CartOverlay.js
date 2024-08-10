'use client';

import { useCart } from '../context/CartContext'; // Ensure this path is correct
import Image from 'next/image';

const CartSummary = () => {
  const { cart, incrementQuantity, decrementQuantity } = useCart();

  const handleCheckout = () => {
    window.location.href = '/checkout'; // Redirect to checkout page
  };

  if (cart.length === 0) {
    return <p className="text-center text-gray-600">Your cart is empty.</p>;
  }

  return (
    <div className="p-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Cart Summary</h2>
      <ul>
        {cart.map(item => (
          <li key={item.id} className="flex items-center mb-4">
            <div className="relative w-16 h-16 mr-4">
              <Image
                src={item.image}
                alt={item.name}
                layout="fill"
                objectFit="cover"
                className="rounded"
                unoptimized
              />
            </div>
            <div className="flex-grow">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <p className="text-gray-700">
                ${item.price.toFixed(2)} x {item.quantity}
              </p>
            </div>
            <div className="flex items-center ml-4">
              <button
                onClick={() => decrementQuantity(item.id)}
                className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400 transition"
              >
                -
              </button>
              <span className="mx-2">{item.quantity}</span>
              <button
                onClick={() => incrementQuantity(item.id)}
                className="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400 transition"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-semibold">
          Total: ${cart.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
        </span>
        <button
          onClick={handleCheckout}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

const CartOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white p-4 rounded-lg shadow-lg w-full max-w-md">
        <CartSummary />
        <button
          onClick={onClose}
          className="mt-4 w-full bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default CartOverlay;
