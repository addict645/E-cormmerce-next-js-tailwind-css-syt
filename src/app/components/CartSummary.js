'use client';

import { useCart } from '../context/CartContext'; // Ensure this path is correct
import Image from 'next/image';

const CartSummary = () => {
  const { cart, incrementQuantity, decrementQuantity, clearCart, totalAmount } = useCart();

  const handleCheckout = () => {
    // Redirect to checkout page and pass totalAmount as a query parameter or use context/state management
    window.location.href = `/checkout?total=${totalAmount}`; // Example: Redirect with total amount
  };

  if (cart.length === 0) {
    return <p>Your cart is empty.</p>;
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
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-l"
              >
                -
              </button>
              <span className="px-2">{item.quantity}</span>
              <button
                onClick={() => incrementQuantity(item.id)}
                className="bg-gray-200 text-gray-700 px-2 py-1 rounded-r"
              >
                +
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-semibold">
          Total: ${totalAmount}
        </span>
       
      </div>
    </div>
  );
};

export default CartSummary;
