'use client';

import Image from 'next/image';
import SliderComponent from './components/Slider';
import AddToCartButton from './components/AddToCartButton'; // Ensure this path is correct
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const mockProducts = [
  { id: 1, name: 'Product 1', price: 49.99, image: '/images/product1.jpeg' },
  { id: 2, name: 'Product 2', price: 99.99, image: '/images/product2.jpg' },
  { id: 3, name: 'Product 3', price: 49.99, image: '/images/product1.jpeg' },
  { id: 4, name: 'Product 4', price: 79.99, image: '/images/product2.jpg' },
  { id: 5, name: 'Product 5', price: 49.99, image: '/images/product1.jpeg' },
  { id: 6, name: 'Product 6', price: 79.99, image: '/images/product2.jpg' },
  { id: 7, name: 'Product 7', price: 49.99, image: '/images/product1.jpeg' },
  { id: 8, name: 'Product 8', price: 79.99, image: '/images/product2.jpg' },
  { id: 9, name: 'Product 9', price: 49.99, image: '/images/product1.jpeg' },
  { id: 10, name: 'Product 10', price: 79.99, image: '/images/product2.jpg' },
];

const mockSlides = [
  { image: '/images/banner-image.jpg', alt: 'Banner 1' },
  { image: '/images/banner2.jpg', alt: 'Banner 2' },
];

export default function Home() {
  return (
    <>
      {/* Slider Component */}
      <SliderComponent slides={mockSlides} />

      {/* Featured Products Section */}
      <section className="w-full bg-green-600 max-w-7xl py-3 mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold mb-8 text-center text-gray-900">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
          {mockProducts.map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl">
              <div className="relative w-full h-48 sm:h-32">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                  className="transition-transform duration-300 ease-in-out hover:scale-110"
                  onError={(e) => (e.target.src = '/images/placeholder-image.jpg')} // Fallback image
                />
              </div>
              <div className="p-4 flex flex-col h-40">
                <div className="flex flex-col flex-grow">
                  <h3 className="text-lg font-semibold text-gray-800 mb-1 truncate">{product.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">${product.price.toFixed(2)}</p>
                </div>
                <AddToCartButton product={product} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
