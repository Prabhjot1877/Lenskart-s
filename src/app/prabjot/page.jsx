"use client";

import { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import React from 'react';

export default function AddProduct() {
  const router = useRouter();
  const motionDivRef = React.useRef(null);
  const formRef = React.useRef(null);
  const isInView = useInView(motionDivRef, { once: false, amount: 0.1 });

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: 0,
    category: 'Eyeglasses',
    brand: '',
    images: [],
    stock: 0,
    frameType: 'Full Rim',
    gender: 'Unisex',
    color: '',
    material: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeField, setActiveField] = useState(null);

  // Enhanced animations
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.3
      }
    }
  };

  const item = {
    hidden: { opacity: 0, y: 20, scale: 0.98 },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        mass: 1
      }
    }
  };

  const fieldFocus = {
    focus: {
      scale: 1.02,
      transition: { duration: 0.2 }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: Number(value)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      setSuccess('Product added successfully!');
      
      // Success animation
      if (formRef.current) {
        formRef.current.classList.add('animate-pulse');
        setTimeout(() => {
          if (formRef.current) formRef.current.classList.remove('animate-pulse');
        }, 1000);
      }

      setTimeout(() => router.push('/admin/products'), 2000);
    } catch (err) {
      setError('Failed to add product. Please try again.');
      // Shake animation on error
      if (formRef.current) {
        formRef.current.classList.add('animate-shake');
        setTimeout(() => {
          if (formRef.current) formRef.current.classList.remove('animate-shake');
        }, 1000);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating background elements */}
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 0.1, y: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute top-20 left-10 w-32 h-32 rounded-full bg-indigo-200 blur-xl"
      />
      <motion.div 
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.1, x: 0 }}
        transition={{ duration: 2, repeat: Infinity, repeatType: "reverse", delay: 0.5 }}
        className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-blue-200 blur-xl"
      />

      <div className="max-w-4xl mx-auto relative">
        {/* Header with decorative elements */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 relative"
        >
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: 'spring' }}
            className="absolute -top-6 -left-6 w-16 h-16 rounded-full bg-indigo-100 opacity-80"
          />
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', delay: 0.2 }}
            className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full bg-blue-100 opacity-80"
          />
          <h1 className="text-4xl font-bold text-gray-900 mb-3 relative z-10">
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="inline-block"
            >
              Add New Product
            </motion.span>
          </h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="text-lg text-gray-600 max-w-2xl mx-auto"
          >
            Fill out the form to expand your eyewear collection
          </motion.p>
        </motion.div>

        {/* Status messages */}
        <AnimatePresence>
          {error && (
            <motion.div
              key="error"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="mb-8 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <motion.svg
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.6 }}
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </motion.svg>
                {error}
              </div>
            </motion.div>
          )}
          {success && (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="mb-8 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 rounded-lg shadow-sm"
            >
              <div className="flex items-center">
                <motion.svg
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 0.6 }}
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </motion.svg>
                {success}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main form */}
        <motion.div
          ref={motionDivRef}
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="bg-white rounded-2xl shadow-xl overflow-hidden border border-white/20 backdrop-blur-sm"
        >
          <form ref={formRef} onSubmit={handleSubmit} className="p-6 sm:p-8">
            <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-6">
              {/* Product Name */}
              <motion.div 
                variants={item}
                className="sm:col-span-6"
                onFocus={() => setActiveField('name')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Product Name *
                </label>
                <motion.input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'name' ? "focus" : ""}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                  required
                />
              </motion.div>

              {/* Description */}
              <motion.div 
                variants={item}
                className="sm:col-span-6"
                onFocus={() => setActiveField('description')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Description
                </label>
                <motion.textarea
                  name="description"
                  rows={4}
                  value={formData.description}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'description' ? "focus" : ""}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </motion.div>

              {/* Price */}
              <motion.div 
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('price')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Price *
                </label>
                <motion.div
                  variants={fieldFocus}
                  animate={activeField === 'price' ? "focus" : ""}
                  className="relative"
                >
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <span className="text-gray-500">$</span>
                  </div>
                  <input
                    type="number"
                    name="price"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={handleNumberChange}
                    className="w-full pl-10 pr-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                    required
                  />
                </motion.div>
              </motion.div>

              {/* Stock */}
              <motion.div 
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('stock')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Stock Quantity
                </label>
                <motion.input
                  type="number"
                  name="stock"
                  min="0"
                  value={formData.stock}
                  onChange={handleNumberChange}
                  variants={fieldFocus}
                  animate={activeField === 'stock' ? "focus" : ""}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </motion.div>

              {/* Category */}
              <motion.div 
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('category')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Category *
                </label>
                <motion.select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'category' ? "focus" : ""}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                  required
                >
                  <option value="Eyeglasses">Eyeglasses</option>
                  <option value="Sunglasses">Sunglasses</option>
                  <option value="Contact Lenses">Contact Lenses</option>
                  <option value="Accessories">Accessories</option>
                </motion.select>
              </motion.div>

              {/* Brand */}
              <motion.div 
                variants={item}
                className="sm:col-span-3"
                onFocus={() => setActiveField('brand')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Brand
                </label>
                <motion.input
                  type="text"
                  name="brand"
                  value={formData.brand}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'brand' ? "focus" : ""}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </motion.div>

              {/* Frame Type */}
              <motion.div 
                variants={item}
                className="sm:col-span-3"
                onFocus={() => setActiveField('frameType')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Frame Type
                </label>
                <motion.select
                  name="frameType"
                  value={formData.frameType}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'frameType' ? "focus" : ""}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                >
                  <option value="Full Rim">Full Rim</option>
                  <option value="Half Rim">Half Rim</option>
                  <option value="Rimless">Rimless</option>
                </motion.select>
              </motion.div>

              {/* Gender */}
              <motion.div 
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('gender')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Gender
                </label>
                <motion.select
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'gender' ? "focus" : ""}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md appearance-none bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJsdWNpZGUgbHVjaWRlLWNoZXZyb24tZG93biI+PHBhdGggZD0ibTYgOSA2IDYgNi02Ii8+PC9zdmc+')] bg-no-repeat bg-[center_right_1rem]"
                >
                  <option value="Men">Men</option>
                  <option value="Women">Women</option>
                  <option value="Unisex">Unisex</option>
                </motion.select>
              </motion.div>

              {/* Color */}
              <motion.div 
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('color')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Color
                </label>
                <motion.input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'color' ? "focus" : ""}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </motion.div>

              {/* Material */}
              <motion.div 
                variants={item}
                className="sm:col-span-2"
                onFocus={() => setActiveField('material')}
                onBlur={() => setActiveField(null)}
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Material
                </label>
                <motion.input
                  type="text"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  variants={fieldFocus}
                  animate={activeField === 'material' ? "focus" : ""}
                  className="w-full px-5 py-3.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all duration-300 shadow-sm hover:shadow-md"
                />
              </motion.div>

              {/* Image Upload */}
              <motion.div 
                variants={item}
                className="sm:col-span-6"
              >
                <label className="block text-sm font-medium text-gray-700 mb-2 ml-1">
                  Product Images
                </label>
                <motion.div
                  whileHover={{ scale: 1.005 }}
                  whileTap={{ scale: 0.995 }}
                  className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-all duration-300 bg-gray-50/50 hover:bg-gray-50"
                >
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="flex flex-col items-center justify-center space-y-3"
                  >
                    <svg
                      className="mx-auto h-14 w-14 text-gray-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-600">
                        <span className="font-medium text-indigo-600 hover:text-indigo-500 transition-colors">
                          Click to upload
                        </span>{' '}
                        or drag and drop
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        SVG, PNG, JPG or GIF (max. 10MB)
                      </p>
                    </div>
                  </motion.div>
                  <input
                    type="file"
                    className="hidden"
                    multiple
                    accept="image/*"
                  />
                </motion.div>
              </motion.div>
            </div>

            {/* Form actions */}
            <motion.div
              variants={item}
              className="mt-10 flex justify-end space-x-4"
            >
              <motion.button
                type="button"
                onClick={() => router.push('/admin/products')}
                whileHover={{ 
                  scale: 1.03,
                  backgroundColor: '#f3f4f6'
                }}
                whileTap={{ 
                  scale: 0.97,
                  backgroundColor: '#e5e7eb'
                }}
                transition={{ type: 'spring', stiffness: 400 }}
                className="px-7 py-3 rounded-xl text-sm font-medium text-gray-700 border border-gray-300 bg-white shadow-sm hover:shadow-md transition-all"
              >
                Cancel
              </motion.button>
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={!isSubmitting ? { 
                  scale: 1.03,
                  boxShadow: '0 4px 14px -2px rgba(99, 102, 241, 0.5)'
                } : {}}
                whileTap={!isSubmitting ? { scale: 0.97 } : {}}
                transition={{ type: 'spring', stiffness: 400 }}
                className={`px-7 py-3 rounded-xl text-sm font-medium text-white shadow-sm transition-all ${
                  isSubmitting
                    ? 'bg-indigo-400 cursor-not-allowed'
                    : 'bg-indigo-600 hover:bg-indigo-700 hover:shadow-md'
                }`}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <motion.svg
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="h-5 w-5 mr-2"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fill="currentColor"
                        d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                        opacity=".25"
                      />
                      <path
                        fill="currentColor"
                        d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                      />
                    </motion.svg>
                    Processing...
                  </span>
                ) : (
                  <span className="flex items-center">
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </motion.svg>
                    Add Product
                  </span>
                )}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </div>

      {/* Custom animations in tailwind.config.js */}
      <style jsx global>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
          20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.5s cubic-bezier(.36,.07,.19,.97) both;
        }
      `}</style>
    </div>
  );
}