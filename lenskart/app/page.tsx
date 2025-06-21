"use client"
import Head from 'next/head';
import Navbar from './components/Navbar';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>ShopNext - Modern E-commerce</title>
        <meta name="description" content="Modern e-commerce platform built with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Navbar />

      <main>
        {/* Hero Section */}
        <section className={`relative bg-gradient-to-r from-indigo-500 to-purple-600 text-white overflow-hidden transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
            <div className="relative z-10">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fadeIn">Welcome to ShopNext</h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fadeIn delay-100">
                Discover amazing products at unbeatable prices. Quality you can trust, service you can rely on.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 animate-fadeIn delay-200">
                <button className="bg-white text-indigo-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 transform hover:scale-105">
                  Shop Now
                </button>
                <button className="bg-transparent border-2 border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors duration-300 transform hover:scale-105">
                  Learn More
                </button>
              </div>
            </div>
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-300 rounded-full opacity-20 animate-pulse"></div>
            <div className="absolute -top-20 -left-20 w-72 h-72 bg-indigo-300 rounded-full opacity-20 animate-pulse delay-500"></div>
          </div>
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Featured Products</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Check out our handpicked selection of premium products
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div 
                key={item}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-2"
              >
                <div className="h-64 bg-gray-200 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-gray-300 to-gray-400 animate-pulse"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Product {item}</h3>
                  <p className="text-gray-600 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-indigo-600">${(99 + item * 10).toFixed(2)}</span>
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors duration-300">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors duration-300 transform hover:scale-105">
              View All Products
            </button>
          </div>
        </section>

        {/* Banner Section */}
        <section className="bg-gray-900 text-white py-16 mb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-3xl font-bold mb-6">Summer Sale!</h2>
              <p className="text-xl mb-8 max-w-3xl mx-auto">
                Get up to 50% off on selected items. Limited time offer. Don't miss out!
              </p>
              <div className="flex justify-center">
                <div className="inline-flex items-center bg-white text-gray-900 px-6 py-3 rounded-lg font-bold animate-bounce">
                  <span className="mr-2">⏳</span> Ends in 3 days!
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">ShopNext</h3>
              <p className="text-gray-400">
                Your one-stop shop for all your needs. Quality products, exceptional service.
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Home</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Products</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">About Us</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Customer Service</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Returns & Refunds</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Newsletter</h4>
              <p className="text-gray-400 mb-4">Subscribe to get updates on new arrivals and special offers.</p>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email" 
                  className="px-4 py-2 w-full rounded-l-md text-gray-900 focus:outline-none"
                />
                <button className="bg-indigo-600 px-4 py-2 rounded-r-md hover:bg-indigo-700 transition-colors duration-300">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; {new Date().getFullYear()} ShopNext. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}