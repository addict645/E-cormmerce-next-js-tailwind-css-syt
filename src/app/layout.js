'use client'; // Ensure this is added for client-side functionality

import React from 'react'; // Import React
import './globals.css'; // Ensure this path is correct
import Navbar from './components/Navbar'; // Ensure this path is correct
import Footer from './components/Footer'; // Ensure this path is correct
import { CartProvider } from './context/CartContext'; // Ensure this path is correct

export default function RootLayout({ children }) {
  const [searchTerm, setSearchTerm] = React.useState(''); // Use React state

  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar setSearchTerm={setSearchTerm} />
          <main>{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
