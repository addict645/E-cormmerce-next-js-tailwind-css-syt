'use client';

import { useCart } from '../context/CartContext';
import { useRouter } from 'next/navigation';

const Checkout = () => {
  const { cart, totalAmount } = useCart();
  const router = useRouter();
  
  const handleOrder = () => {
    // Process the order with totalAmount and cart details
    console.log('Order placed with total amount:', totalAmount);
    // Perform further actions like sending order details to the server
  };

  if (cart.length === 0) {
    return <p>Your cart is empty. Cannot proceed to checkout.</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Checkout</h2>
      <p className="mb-4">Total Amount: ${totalAmount}</p>
      <button
        onClick={handleOrder}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        Place Order
      </button>
    </div>
  );
};

export default Checkout;
