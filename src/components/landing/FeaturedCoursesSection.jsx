import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function FeaturedCoursesSection({ loading, classes, containerVariants, itemVariants }) {
  const navigate = useNavigate();
  
  return (
    <section id="featured-courses" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <span className="block text-sm font-semibold uppercase tracking-wide text-indigo-600 mb-1">Learning Opportunities</span>
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4">
            Featured Courses
          </h2>
          <div className="h-1 w-20 bg-indigo-600 mx-auto rounded-full"></div>
        </motion.div>
        
        {loading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {classes.slice(0, 6).map((course) => (
              <motion.div 
                key={course.id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                variants={itemVariants}
                whileHover={{ y: -8 }}
              >
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 h-3 w-full group-hover:h-4 transition-all"></div>
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center mr-3">
                      <svg className="h-6 w-6 text-indigo-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                      </svg>
                    </div>
                    <p className="text-gray-600 font-medium">{course.tutor}</p>
                  </div>
                  
                  <div className="space-y-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {course.schedule}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <svg className="h-5 w-5 text-indigo-500 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      Starts: {course.startDate}
                    </div>
                  </div>
                  
                  <div className="mt-6 flex flex-col space-y-4">
                    {/* Price and rating */}
                    <div className="flex justify-between items-center">
                      <div className="flex items-center">
                        <span className="text-2xl font-bold text-gray-900">${course.price || '99'}</span>
                        <span className="ml-1 text-sm text-gray-500 line-through">${course.originalPrice || '129'}</span>
                      </div>
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`h-4 w-4 ${i < (course.rating || 4) ? 'text-yellow-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                        <span className="ml-1 text-sm text-gray-600">{course.rating || '4.0'}</span>
                      </div>
                    </div>
                    
                    {/* Features list */}
                    <div className="flex flex-wrap gap-y-2">
                      {['Video Lectures', 'Certificate', '24/7 Support'].map((feature, i) => (
                        <div key={i} className="w-1/2 flex items-center text-xs text-gray-500">
                          <svg className="h-4 w-4 text-green-500 mr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          {feature}
                        </div>
                      ))}
                    </div>
                  
                    <motion.button
                      whileHover={{ 
                        scale: 1.03,
                        boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.2), 0 4px 6px -2px rgba(79, 70, 229, 0.1)"
                      }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => navigate('/auth/register')}
                      className="relative w-full mt-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-700 hover:to-blue-700 text-white font-medium rounded-lg shadow-md transition-all duration-300 overflow-hidden group"
                    >
                      {/* Background animation */}
                      <div className="absolute top-0 right-full w-full h-full bg-gradient-to-r from-blue-600 to-indigo-600 transform group-hover:translate-x-full transition-all duration-500 ease-in-out z-0"></div>
                      
                      {/* Button content */}
                      <div className="relative flex items-center justify-center z-10">
                        <span className="mr-1">Enroll Now</span>
                        <motion.svg 
                          className="h-5 w-5" 
                          xmlns="http://www.w3.org/2000/svg" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                          initial={{ x: 0 }}
                          animate={{ x: [0, 5, 0] }}
                          transition={{ 
                            repeat: Infinity, 
                            repeatType: "loop", 
                            duration: 1.5,
                            repeatDelay: 2
                          }}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </motion.svg>
                      </div>
                      
                      {/* Highlight effect */}
                      <motion.span 
                        className="absolute top-0 left-0 w-full h-full bg-white opacity-0"
                        whileHover={{ opacity: [0, 0.1, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      />
                    </motion.button>
                    
                    {/* Limited spots indicator */}
                    {course.studentCount / course.maxCapacity > 0.7 && (
                      <div className="mt-2 text-center text-xs text-red-500 font-medium animate-pulse">
                        Only {course.maxCapacity - course.studentCount} spots left!
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div 
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <Link 
            to="/explore/subjects" 
            className="inline-flex items-center text-indigo-600 hover:text-indigo-800 transition-colors font-medium"
          >
            View all courses
            <svg className="ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}