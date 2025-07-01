"use client"
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

const ProductPage = () => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedColor, setSelectedColor] = useState('black');
  const [selectedLens, setSelectedLens] = useState('classic');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Sample product data
  const product = {
    name: 'Vintage Round Glasses',
    price: 129.99,
    discount: 159.99,
    rating: 4.8,
    reviews: 124,
    description: 'Handcrafted vintage-inspired round glasses with premium acetate frames and UV-protected lenses. Perfect for both reading and fashion statements.',
    features: [
      '100% UV protection',
      'Premium acetate frames',
      'Lightweight design',
      'Scratch-resistant lenses',
      'Includes microfiber pouch'
    ],
    colors: ['black', 'tortoise', 'transparent', 'red'],
    lensTypes: ['classic', 'blue-light', 'sunglasses', 'prescription'],
    images: [
      '/glasses-front.jpg',
      '/glasses-side.jpg',
      '/glasses-detail.jpg',
      '/glasses-case.jpg'
    ]
  };

  // Animation for color selection
  useEffect(() => {
    const timer = setTimeout(() => {
      // Animation logic can go here
    }, 100);
    return () => clearTimeout(timer);
  }, [selectedColor]);

  // Mock function for adding to cart
  const addToCart = () => {
    alert(`Added ${quantity} ${product.name} (${selectedColor}, ${selectedLens}) to cart!`);
  };

  return (
    <>
      <Head>
        <title>{product.name} | LensCrafterHub</title>
        <meta name="description" content={product.description} />
      </Head>

      <div className="min-h-screen bg-gray-50">
        {/* Navigation */}
        <nav className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16">
              <div className="flex items-center">
                <span className="text-xl font-bold text-indigo-600">LensCrafterHub</span>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Shop</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Collections</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">About</a>
                <a href="#" className="text-gray-700 hover:text-indigo-600 transition-colors">Contact</a>
              </div>
              <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </button>
                <button className="p-2 rounded-full hover:bg-gray-100 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
                <button 
                  className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white shadow-md animate-fadeIn">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Shop</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Collections</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">About</a>
              <a href="#" className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50">Contact</a>
            </div>
          </div>
        )}

        {/* Product Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8">
            {/* Product Images */}
            <div className="mb-8 lg:mb-0">
              <div className="relative h-96 w-full bg-white rounded-lg shadow-md overflow-hidden mb-4 transition-all duration-300 hover:shadow-lg">
                <Image 
                  src={product.images[selectedImage]} 
                  alt={product.name}
                  layout="fill"
                  objectFit="contain"
                  className="transform hover:scale-105 transition-transform duration-500"
                  priority
                />
                {/* Sale Badge */}
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold animate-bounce">
                  SALE
                </div>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((img, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`h-20 bg-white rounded-md overflow-hidden border-2 ${selectedImage === index ? 'border-indigo-500' : 'border-transparent'} transition-all duration-200`}
                  >
                    <Image 
                      src={img} 
                      alt={`${product.name} view ${index + 1}`}
                      width={80}
                      height={80}
                      objectFit="contain"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="text-gray-600 ml-2">{product.rating} ({product.reviews} reviews)</span>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-900">${product.price}</span>
                  <span className="ml-3 text-lg text-gray-500 line-through">${product.discount}</span>
                  <span className="ml-3 text-sm font-semibold text-red-600 bg-red-100 px-2 py-1 rounded">Save {Math.round((1 - product.price/product.discount) * 100)}%</span>
                </div>
              </div>

              <p className="text-gray-700 mb-6">{product.description}</p>

              {/* Color Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Color</h3>
                <div className="flex space-x-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`w-8 h-8 rounded-full border-2 ${selectedColor === color ? 'border-indigo-500' : 'border-gray-300'} transition-all duration-200`}
                      style={{ backgroundColor: getColorValue(color) }}
                      title={color.charAt(0).toUpperCase() + color.slice(1)}
                    />
                  ))}
                </div>
              </div>

              {/* Lens Type Selection */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Lens Type</h3>
                <div className="grid grid-cols-2 gap-2">
                  {product.lensTypes.map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedLens(type)}
                      className={`px-4 py-2 rounded-md border ${selectedLens === type ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-gray-300 text-gray-700'} transition-all duration-200 hover:border-indigo-300`}
                    >
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Quantity</h3>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 border border-gray-300 rounded-l-md hover:bg-gray-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <div className="px-4 py-2 border-t border-b border-gray-300 text-center w-12">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 border border-gray-300 rounded-r-md hover:bg-gray-50 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <button
                  onClick={addToCart}
                  className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white py-3 px-6 rounded-md font-medium transition-colors duration-300 transform hover:scale-105"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => setIsFavorite(!isFavorite)}
                  className={`p-3 rounded-md border ${isFavorite ? 'text-red-500 border-red-300 bg-red-50' : 'text-gray-600 border-gray-300 hover:bg-gray-50'} transition-colors duration-300`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </button>
              </div>

              {/* Features */}
              <div className="mt-8">
                <h3 className="text-sm font-medium text-gray-900 mb-2">Features</h3>
                <ul className="space-y-2">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">You may also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 group">
                <div className="relative h-48 bg-gray-100">
                  <Image 
                    src={`/glasses-${item}.jpg`} 
                    alt={`Related product ${item}`}
                    layout="fill"
                    objectFit="contain"
                    className="transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-medium text-gray-900 mb-1">Related Glasses {item}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className={`w-4 h-4 ${i < 4 ? 'text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-gray-600 text-sm ml-1">(42)</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-gray-900">${(99 + item * 10).toFixed(2)}</span>
                    <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Helper function to get color values
function getColorValue(color: string) {
  const colors: Record<string, string> = {
    black: '#000000',
    tortoise: '#8B4513',
    transparent: 'rgba(255, 255, 255, 0.3)',
    red: '#FF0000'
  };
  return colors[color] || '#CCCCCC';
}

export default ProductPage;