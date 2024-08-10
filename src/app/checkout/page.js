'use client';

import { useState } from 'react';
import { useCart } from '../context/CartContext'; // Ensure this path is correct
import CartSummary from '../components/CartSummary'; // Ensure this path is correct

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    paymentMethod: 'creditCard',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      alert('Order placed successfully!');
      clearCart();
      setIsSubmitting(false);
      // Redirect or show confirmation here
    }, 2000);
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
            <span className="text-gray-700">Payment Method</span>
            <select
              name="paymentMethod"
              value={formData.paymentMethod}
              onChange={handleChange}
              className="mt-1 block w-full border rounded-lg px-3 py-2"
              required
            >
              <option value="creditCard">Credit Card</option>
              <option value="paypal">PayPal</option>
              {/* Add more payment methods if needed */}
            </select>
          </label>
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            {isSubmitting ? 'Processing...' : 'Place Order'}
          </button>
        </form>
      </div>
    </div>
  );
}
