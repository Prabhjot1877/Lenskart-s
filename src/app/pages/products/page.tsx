"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import { motion, AnimatePresence } from 'framer-motion';

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedLens, setSelectedLens] = useState('classic');
  const [quantity, setQuantity] = useState(1);
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [activeTab, setActiveTab] = useState('description');

  const product = {
    name: 'Premium Photochromic Glasses',
    price: 149.99,
    description: 'Experience the ultimate in eye comfort with our premium photochromic lenses that automatically adjust to changing light conditions. Perfect for outdoor enthusiasts and urban explorers alike.',
    features: [
      '100% UV protection',
      'Scratch-resistant coating',
      'Anti-reflective treatment',
      'Lightweight titanium frame',
      'Adjustable nose pads'
    ],
    colors: [
      { name: 'black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
      { name: 'brown', class: 'bg-amber-800', selectedClass: 'ring-amber-800' },
      { name: 'tortoise', class: 'bg-gradient-to-r from-amber-700 to-gray-800', selectedClass: 'ring-amber-500' },
      { name: 'silver', class: 'bg-gray-300', selectedClass: 'ring-gray-300' },
    ],
    lensTypes: [
      { id: 'classic', name: 'Classic', desc: 'Standard clear lenses' },
      { id: 'blue-light', name: 'Blue Light', desc: 'Filters harmful blue light' },
      { id: 'photochromic', name: 'Photochromic', desc: 'Adapts to light conditions' },
      { id: 'polarized', name: 'Polarized', desc: 'Reduces glare' },
    ],
    images: [
      '/glasses1.jpg',
      '/glasses2.jpg',
      '/glasses3.jpg',
      '/glasses4.jpg',
    ]
  };

  useEffect(() => {
    if (isAddedToCart) {
      const timer = setTimeout(() => {
        setIsAddedToCart(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isAddedToCart]);

  const handleAddToCart = () => {
    setIsAddedToCart(true);
    // Add to cart logic here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>{product.name} | LensCrafterHub</title>
        <meta name="description" content={product.description} />
      </Head>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="lg:grid lg:grid-cols-2 lg:gap-x-8"
        >
          {/* Image gallery */}
          <div className="space-y-4">
            <div className="aspect-w-3 aspect-h-2 overflow-hidden rounded-lg bg-gray-100">
              <motion.img
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                src={product.images[selectedImage]}
                alt={`${product.name} view ${selectedImage + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={index}
                  type="button"
                  onClick={() => setSelectedImage(index)}
                  className={`rounded-md overflow-hidden ${selectedImage === index ? 'ring-2 ring-indigo-500' : ''}`}
                >
                  <img
                    src={image}
                    alt={`${product.name} thumbnail ${index + 1}`}
                    className="h-20 w-full object-cover object-center"
                  />
                </motion.button>
              ))}
            </div>
          </div>

          {/* Product info */}
          <div className="mt-10 px-4 sm:mt-16 sm:px-0 lg:mt-0">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">{product.name}</h1>

            <div className="mt-3">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl text-gray-900">${product.price.toFixed(2)}</p>
            </div>

            <div className="mt-6">
              <h3 className="sr-only">Description</h3>
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            {/* Color selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Color</h3>
              <div className="flex items-center space-x-3 mt-2">
                {product.colors.map((color) => (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    key={color.name}
                    type="button"
                    onClick={() => setSelectedColor(color.name)}
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${color.class} ${selectedColor === color.name ? `ring-2 ring-offset-2 ${color.selectedClass}` : ''}`}
                  >
                    <span className="sr-only">{color.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Lens type selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Lens Type</h3>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {product.lensTypes.map((lens) => (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    key={lens.id}
                    type="button"
                    onClick={() => setSelectedLens(lens.id)}
                    className={`p-3 rounded-md border ${selectedLens === lens.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300'}`}
                  >
                    <p className="text-sm font-medium">{lens.name}</p>
                    <p className="text-xs text-gray-500">{lens.desc}</p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Quantity selector */}
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Quantity</h3>
              <div className="flex items-center mt-2">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <span className="sr-only">Decrease quantity</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 12H4" />
                  </svg>
                </motion.button>
                <span className="px-4 text-lg font-medium">{quantity}</span>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-gray-500 hover:text-gray-700"
                >
                  <span className="sr-only">Increase quantity</span>
                  <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                  </svg>
                </motion.button>
              </div>
            </div>

            {/* Add to cart button */}
            <div className="mt-10">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleAddToCart}
                className="w-full bg-indigo-600 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Add to cart
              </motion.button>
            </div>

            <AnimatePresence>
              {isAddedToCart && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="mt-4 p-3 bg-green-100 text-green-800 rounded-md flex items-center"
                >
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                  Added to cart successfully!
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Product details */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('description')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'description' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab('features')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'features' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Features
              </button>
              <button
                onClick={() => setActiveTab('reviews')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'reviews' ? 'border-indigo-500 text-indigo-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
              >
                Reviews
              </button>
            </nav>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="py-8"
            >
              {activeTab === 'description' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Product Details</h3>
                  <p className="mt-4 text-gray-600">
                    Our premium photochromic glasses are designed for those who demand both style and functionality. 
                    The lenses transition seamlessly from clear indoors to dark outdoors, providing optimal vision 
                    in any lighting condition. The lightweight titanium frame ensures all-day comfort without 
                    compromising on durability.
                  </p>
                </div>
              )}

              {activeTab === 'features' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Key Features</h3>
                  <ul className="mt-4 space-y-3">
                    {product.features.map((feature, index) => (
                      <motion.li 
                        whileHover={{ x: 5 }}
                        key={index}
                        className="flex items-start"
                      >
                        <svg className="h-5 w-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                        </svg>
                        <span className="text-gray-600">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              )}

              {activeTab === 'reviews' && (
                <div>
                  <h3 className="text-lg font-medium text-gray-900">Customer Reviews</h3>
                  <div className="mt-6 space-y-6">
                    {[1, 2, 3].map((review) => (
                      <motion.div 
                        whileHover={{ scale: 1.01 }}
                        key={review}
                        className="p-4 bg-white rounded-lg shadow"
                      >
                        <div className="flex items-center">
                          <div className="flex-shrink-0">
                            <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                              <span className="text-indigo-600 font-medium">U{review}</span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <h4 className="text-sm font-medium text-gray-900">User {review}</h4>
                            <div className="flex mt-1">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <svg
                                  key={star}
                                  className={`h-5 w-5 ${star <= 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                                  fill="currentColor"
                                  viewBox="0 0 20 20"
                                >
                                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                </svg>
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="mt-3 text-gray-600">
                          These glasses are amazing! The transition is smooth and they're so comfortable to wear all day. 
                          I've received multiple compliments on the style too.
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Related products */}
        <section className="mt-16">
          <h2 className="text-2xl font-extrabold tracking-tight text-gray-900">You may also like</h2>
          <div className="mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {[1, 2, 3, 4].map((product) => (
              <motion.div 
                whileHover={{ y: -5 }}
                key={product}
                className="group relative"
              >
                <div className="w-full min-h-80 bg-gray-200 aspect-w-1 aspect-h-1 rounded-md overflow-hidden group-hover:opacity-75 lg:h-80 lg:aspect-none">
                  <img
                    src={`/glasses${product}.jpg`}
                    alt={`Related product ${product}`}
                    className="w-full h-full object-center object-cover lg:w-full lg:h-full"
                  />
                </div>
                <div className="mt-4 flex justify-between">
                  <div>
                    <h3 className="text-sm text-gray-700">
                      <a href="#">
                        <span aria-hidden="true" className="absolute inset-0" />
                        {['Classic Aviators', 'Modern Round', 'Square Retro', 'Sport Wraparound'][product - 1]}
                      </a>
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Black</p>
                  </div>
                  <p className="text-sm font-medium text-gray-900">${[99.99, 129.99, 89.99, 119.99][product - 1]}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default ProductPage;