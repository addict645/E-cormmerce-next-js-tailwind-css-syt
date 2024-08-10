// src/app/components/checkout.js
'use client';

import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';
import axios from 'axios'; // Import axios for making HTTP requests

const Checkout = () => {
  const { cart, totalAmount } = useCart();
  const router = useRouter();

  const handleOrder = async () => {
    if (!cart.length) {
      alert('Your cart is empty. Cannot proceed to checkout.');
      return;
    }

    try {
      // Send order details to your backend for STK Push
      const response = await axios.post('/api/mpesa-stk-push', {
        totalAmount,
        phoneNumber: '254791195226' // Example phone number
      });

      if (response.data && response.data.ResponseCode === '0') {
        alert('Payment request sent. Please complete the payment on your phone.');
        // Optionally, redirect or handle the response
        router.push('/success'); // Example redirect
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred while initiating payment.');
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <p className="mb-4">Total Amount: ${totalAmount}</p>
      <button
        onClick={handleOrder}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Place Order with M-Pesa
      </button>
    </div>
  );
};

export default Checkout;
