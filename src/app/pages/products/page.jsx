'use client';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import Navbar from '@/src/components/Navbar';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalProducts: 0,
    limit: 12,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState({});
  const controls = useAnimation();

  const fetchProducts = async (page = 1) => {
    try {
      setLoading(true);
      controls.start({
        opacity: 0,
        transition: { duration: 0.3 }
      });
      
      const response = await fetch(`/api/productcard?page=${page}&limit=${pagination.limit}`);
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.products);
        setPagination(data.pagination);
        setError(null);
        
        // Initialize active image index for each product
        const initialIndices = {};
        data.products.forEach(product => {
          initialIndices[product._id] = 0;
        });
        setActiveImageIndex(initialIndices);
        
        controls.start({
          opacity: 1,
          transition: { duration: 0.5 }
        });
      } else {
        setError(data.error || 'Failed to fetch products');
      }
    } catch (err) {
      setError('Failed to fetch products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(1);
  }, []);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.totalPages) {
      fetchProducts(newPage);
    }
  };

  const handleNextImage = (productId) => {
    setActiveImageIndex(prev => {
      const product = products.find(p => p._id === productId);
      const currentIndex = prev[productId];
      const nextIndex = (currentIndex + 1) % product.images.length;
      return { ...prev, [productId]: nextIndex };
    });
  };

  const handlePrevImage = (productId) => {
    setActiveImageIndex(prev => {
      const product = products.find(p => p._id === productId);
      const currentIndex = prev[productId];
      const prevIndex = (currentIndex - 1 + product.images.length) % product.images.length;
      return { ...prev, [productId]: prevIndex };
    });
  };

  // Animation variants
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      } 
    }
  };

  const loadingSkeleton = Array.from({ length: pagination.limit }).map((_, index) => (
    <motion.div 
      key={index}
      variants={item}
      className="border rounded-xl overflow-hidden shadow-sm bg-white/50 backdrop-blur-sm"
    >
      <div className="relative h-64 bg-gradient-to-r from-gray-100 to-gray-200 animate-pulse rounded-t-xl"></div>
      <div className="p-4 space-y-3">
        <div className="h-5 bg-gray-200 rounded-full w-3/4 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/2 animate-pulse"></div>
        <div className="h-4 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
        <div className="flex justify-between mt-4">
          <div className="h-6 bg-gray-200 rounded-full w-1/4 animate-pulse"></div>
          <div className="h-6 bg-gray-200 rounded-full w-1/3 animate-pulse"></div>
        </div>
      </div>
    </motion.div>
  ));

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
        <Navbar/>
      <div className="container mx-auto px-4 py-12">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, type: "spring" }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-3">
            Discover Our Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our premium selection of products designed to elevate your experience.
          </p>
        </motion.div>
        
        {error ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-xl max-w-md mx-auto text-center shadow-sm"
          >
            <p className="mb-3">{error}</p>
            <button
              onClick={() => fetchProducts(pagination.currentPage)}
              className="mt-2 bg-red-600 hover:bg-red-700 text-white font-medium py-2 px-4 rounded-lg text-sm transition-all duration-300 shadow hover:shadow-md"
            >
              Retry
            </button>
          </motion.div>
        ) : (
          <>
            <motion.div
              variants={container}
              initial="hidden"
              animate={loading ? "hidden" : "show"}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            >
              <AnimatePresence mode="wait">
                {loading ? (
                  loadingSkeleton
                ) : (
                  products.map((product) => (
                    <motion.div 
                      key={product._id}
                      variants={item}
                      whileHover={{ y: -8, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100"
                    >
                      <Link href={`/products/${product._id}`} className="block">
                        <div className="relative h-64 group">
                          {product.images && product.images.length > 0 ? (
                            <>
                              <Image
                                src={product.images[activeImageIndex[product._id]]?.url || '/placeholder-product.jpg'}
                                alt={product.name}
                                fill
                                className="object-cover transition-opacity duration-500"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                priority={products.indexOf(product) < 4}
                              />
                              
                              {/* Image navigation dots */}
                              {product.images.length > 1 && (
                                <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-1.5">
                                  {product.images.map((_, idx) => (
                                    <button
                                      key={idx}
                                      onClick={(e) => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setActiveImageIndex(prev => ({
                                          ...prev,
                                          [product._id]: idx
                                        }));
                                      }}
                                      className={`w-2 h-2 rounded-full transition-all ${activeImageIndex[product._id] === idx ? 'bg-white w-3' : 'bg-white/50'}`}
                                      aria-label={`View image ${idx + 1}`}
                                    />
                                  ))}
                                </div>
                              )}
                            </>
                          ) : (
                            <div className="w-full h-full bg-gray-100 flex items-center justify-center rounded-t-2xl">
                              <span className="text-gray-400">No Image Available</span>
                            </div>
                          )}
                          
                          {/* Navigation arrows */}
                          {product.images && product.images.length > 1 && (
                            <>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handlePrevImage(product._id);
                                }}
                                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                aria-label="Previous image"
                              >
                                <FiChevronLeft className="w-4 h-4" />
                              </button>
                              <button
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  handleNextImage(product._id);
                                }}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                                aria-label="Next image"
                              >
                                <FiChevronRight className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                        
                        <div className="p-5">
                          <div className="flex justify-between items-start mb-2">
                            <h2 className="text-lg font-semibold text-gray-900 line-clamp-2">
                              {product.name}
                            </h2>
                            <span className="text-lg font-bold text-blue-600 whitespace-nowrap ml-2">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-1.5 mb-3">
                            <span className="text-xs px-2.5 py-1 bg-blue-50 text-blue-700 rounded-full capitalize">
                              {product.category}
                            </span>
                            {product.brand && (
                              <span className="text-xs px-2.5 py-1 bg-purple-50 text-purple-700 rounded-full">
                                {product.brand}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center">
                            <div className="flex items-center mr-2">
                              {[...Array(5)].map((_, i) => (
                                <FiStar 
                                  key={i}
                                  className={`w-4 h-4 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">
                              ({product.numReviews || 0} reviews)
                            </span>
                          </div>
                        </div>
                      </Link>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
            </motion.div>

            {/* Pagination */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-16"
            >
              <div className="text-sm text-gray-600">
                Showing {(pagination.currentPage - 1) * pagination.limit + 1}-
                {Math.min(pagination.currentPage * pagination.limit, pagination.totalProducts)} of {pagination.totalProducts} products
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={pagination.currentPage === 1 || loading}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                    pagination.currentPage === 1 || loading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm'
                  }`}
                >
                  <FiChevronLeft className="w-4 h-4" />
                  <span>Previous</span>
                </button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }

                    return (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        disabled={loading}
                        className={`w-10 h-10 rounded-lg transition-all flex items-center justify-center ${
                          pagination.currentPage === pageNum
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  
                  {pagination.totalPages > 5 && pagination.currentPage < pagination.totalPages - 2 && (
                    <>
                      <span className="text-gray-500 px-2">...</span>
                      <button
                        onClick={() => handlePageChange(pagination.totalPages)}
                        disabled={loading}
                        className="w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700"
                      >
                        {pagination.totalPages}
                      </button>
                    </>
                  )}
                </div>
                
                <button
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={pagination.currentPage === pagination.totalPages || loading}
                  className={`flex items-center gap-1 px-4 py-2 rounded-lg transition-all ${
                    pagination.currentPage === pagination.totalPages || loading
                      ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                      : 'bg-gray-100 hover:bg-gray-200 text-gray-700 hover:shadow-sm'
                  }`}
                >
                  <span>Next</span>
                  <FiChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </div>
  );
}