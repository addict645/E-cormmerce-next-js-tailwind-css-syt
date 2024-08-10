'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext'; // Ensure this path is correct
import CartSummary from '../components/CartSummary'; // Ensure this path is correct
import axios from 'axios'; // Import axios for making HTTP requests
import { useRouter } from 'next/navigation'; // Import useRouter for navigation

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '', // Ensure phone number is part of form data
    paymentMethod: 'mpesa', // Default to M-Pesa
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send order details to your backend for M-Pesa STK Push
      const response = await axios.post('/api/mpesa-stk-push', {
        totalAmount: cart.reduce((sum, item) => sum + item.price * item.quantity, 0), // Example calculation for total amount
        phoneNumber: formData.phoneNumber, // Include phone number from formData
      });

      if (response.data && response.data.ResponseCode === '0') {
        alert('Payment request sent. Please complete the payment on your phone.');
        clearCart();
        router.push('/success'); // Redirect to a success page
      } else {
        alert('Failed to initiate payment.');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('An error occurred while initiating payment.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Checkout</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Cart Summary */}
        <CartSummary />

        {/* Checkout Form */}
        <form onSubmit={handleSubmit} className="flex-1 bg-white border rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Billing Information</h2>
          <label className="block mb-4">
            <span className="text-gray-700">Name</span>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Email</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Address</span>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              rows="4"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Phone Number</span>
            <input
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              required
            />
          </label>
          <label className="block mb-4">
            <span className="text-gray-700">Payment Method</span>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="mpesa">M-Pesa</option>
              {/* Removed PayPal option */}
            </select>
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Processing...' : 'Place Order with M-Pesa'}
          </button>
        </form>
      </div>
    </div>
  );
}
