"use client"
import Head from 'next/head'
import { useState, useEffect } from 'react'

export default function Home() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [scrolled, setScrolled] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const categories = [
    { name: 'Eyeglasses', icon: '👓' },
    { name: 'Sunglasses', icon: '🕶️' },
    { name: 'Contact Lenses', icon: '🔍' },
    { name: 'Computer Glasses', icon: '💻' },
    { name: 'Kids Glasses', icon: '🧒' },
  ]

  const products = [
    { id: 1, name: 'Aviator Sunglasses', price: 1999, image: '/sunglasses1.jpg', discount: 20 },
    { id: 2, name: 'Round Metal Frames', price: 1499, image: '/glasses1.jpg', discount: 15 },
    { id: 3, name: 'Daily Disposable Lenses', price: 999, image: '/lenses1.jpg', discount: 10 },
    { id: 4, name: 'Blue Light Glasses', price: 1799, image: '/computer1.jpg', discount: 25 },
  ]

  const brands = [
    { name: 'Ray-Ban', logo: '/rayban.png' },
    { name: 'Oakley', logo: '/oakley.png' },
    { name: 'Vincent Chase', logo: '/vc.png' },
    { name: 'Tom Ford', logo: '/tomford.png' },
    { name: 'Hugo Boss', logo: '/hugo.png' },
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      <Head>
        <title>Lenskart - Eyeglasses, Sunglasses & Contact Lenses</title>
        <meta name="description" content="India's largest eyewear brand" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      {/* Header */}
      <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <h1 className="text-3xl font-bold text-blue-600">Lenskart</h1>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 mx-8">
              <div className="relative w-full max-w-xl">
                <input
                  type="text"
                  placeholder="Search for eyeglasses, sunglasses, and more..."
                  className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-blue-600 text-white p-1 rounded-full hover:bg-blue-700 transition-colors duration-200">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex items-center space-x-6">
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Store Locator</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Try On</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Offers</a>
              <a href="#" className="text-gray-700 hover:text-blue-600 transition-colors duration-200">Help</a>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                <span className="ml-1">Cart</span>
              </a>
              <a href="#" className="flex items-center text-gray-700 hover:text-blue-600 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                <span className="ml-1">Account</span>
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Banner */}
      <section className="pt-24 pb-12 md:pt-32 md:pb-20 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 animate-fade-in-up">
              <h2 className="text-4xl md:text-5xl font-bold mb-4">Summer Collection 2023</h2>
              <p className="text-xl mb-6">Get 50% off on all sunglasses. Use code: LENSKART50</p>
              <button className="bg-white text-blue-600 px-6 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-200 transform hover:scale-105">
                Shop Now
              </button>
            </div>
            <div className="md:w-1/2 flex justify-center animate-fade-in-up delay-100">
              <div className="relative w-64 h-64 md:w-80 md:h-80">
                <div className="absolute inset-0 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
                <div className="absolute inset-4 bg-white bg-opacity-10 rounded-full animate-pulse delay-100"></div>
                <img 
                  src="/hero-glasses.png" 
                  alt="Sunglasses" 
                  className="relative z-10 w-full h-full object-contain transform hover:rotate-6 transition-transform duration-500"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Shop By Category</h3>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {categories.map((category, index) => (
              <div 
                key={index}
                className={`flex flex-col items-center p-4 rounded-lg cursor-pointer transition-all duration-300 transform hover:-translate-y-2 ${activeCategory === index ? 'bg-blue-100 border-2 border-blue-500' : 'bg-gray-100 hover:bg-gray-200'}`}
                onClick={() => setActiveCategory(index)}
              >
                <span className="text-3xl mb-2">{category.icon}</span>
                <span className="font-medium">{category.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Products */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Trending Now</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <div 
                key={product.id}
                className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-48 object-cover transform group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.discount && (
                    <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                      {product.discount}% OFF
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h4 className="font-semibold text-lg mb-1">{product.name}</h4>
                  <div className="flex items-center">
                    <span className="text-blue-600 font-bold">₹{product.price - (product.price * product.discount / 100)}</span>
                    {product.discount > 0 && (
                      <span className="text-gray-500 text-sm line-through ml-2">₹{product.price}</span>
                    )}
                  </div>
                  <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors duration-200">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <button className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full font-semibold hover:bg-blue-600 hover:text-white transition-colors duration-200">
              View All Products
            </button>
          </div>
        </div>
      </section>

      {/* Virtual Try On */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <div className="relative w-full h-64 md:h-96 bg-gray-100 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-32 h-32 bg-blue-500 rounded-full opacity-20 animate-ping"></div>
                </div>
                <div className="relative z-10 flex flex-col items-center justify-center h-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <h3 className="text-2xl font-bold mb-2">Virtual Try On</h3>
                  <p className="text-gray-600 mb-4">See how you look before you buy</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2 md:pl-12">
              <h3 className="text-3xl font-bold mb-4">Try Before You Buy</h3>
              <p className="text-gray-600 mb-6">
                Our advanced AR technology lets you try on thousands of frames from the comfort of your home. 
                See how different styles look on your face and find your perfect match!
              </p>
              <button className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition-colors duration-200 transform hover:scale-105">
                Try It Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Brands */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold text-center mb-8">Our Top Brands</h3>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {brands.map((brand, index) => (
              <div 
                key={index}
                className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 transform hover:scale-105"
              >
                <img 
                  src={brand.logo} 
                  alt={brand.name}
                  className="h-12 object-contain opacity-80 hover:opacity-100 transition-opacity duration-200"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-2">14-Day Returns</h4>
              <p className="text-gray-600">Not happy? Return within 14 days for a full refund.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-2">Free Shipping</h4>
              <p className="text-gray-600">Free shipping on all orders above ₹999.</p>
            </div>
            <div className="text-center p-6 rounded-lg bg-gray-50 hover:bg-blue-50 transition-colors duration-200">
              <div className="flex justify-center mb-4">
                <div className="bg-blue-100 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                </div>
              </div>
              <h4 className="font-bold text-lg mb-2">Easy EMI Options</h4>
              <p className="text-gray-600">Pay in easy installments with 0% interest.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h4 className="text-xl font-bold mb-4">Lenskart</h4>
              <p className="text-gray-400 mb-4">India's largest eyewear brand</p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                  </svg>
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Shop</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Men's Eyeglasses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Women's Eyeglasses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Kids' Eyeglasses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Sunglasses</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Contact Lenses</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Help</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">FAQs</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Shipping Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Return Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Privacy Policy</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors duration-200">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
              <ul className="space-y-2">
                <li className="text-gray-400">support@lenskart.com</li>
                <li className="text-gray-400">+91 9876543210</li>
                <li className="text-gray-400">Mon-Sat: 9AM-9PM</li>
                <li className="text-gray-400">Sun: 10AM-6PM</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>© 2023 Lenskart. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}