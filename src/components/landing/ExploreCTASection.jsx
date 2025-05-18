import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ExploreCTASection() {
  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 overflow-hidden">
      {/* Background shapes for visual interest */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg className="absolute top-0 left-0 w-32 h-32 text-white/5" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg className="absolute bottom-0 right-0 w-64 h-64 text-white/5" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="50" />
        </svg>
        <svg className="absolute top-1/2 right-1/4 w-24 h-24 text-white/5" viewBox="0 0 100 100" fill="currentColor">
          <rect width="100" height="100" />
        </svg>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl mb-6 drop-shadow-sm">
            Ready to <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-200 to-indigo-100">Explore</span> Our Educational Offerings?
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-indigo-100 mb-12 leading-relaxed">
            Discover our comprehensive range of subjects, meet our expert tutors, browse class schedules, 
            and explore our premium recording bundles.
          </p>
          
          {/* Horizontal feature list */}
          <div className="flex flex-wrap justify-center gap-6 mb-12">
            {['Wide Range of Subjects', 'Expert Tutors', 'Flexible Schedules', 'Premium Resources'].map((item, i) => (
              <motion.div 
                key={i}
                className="flex items-center"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 * i, duration: 0.4 }}
              >
                <div className="w-2 h-2 rounded-full bg-indigo-300 mr-2"></div>
                <span className="text-indigo-100">{item}</span>
              </motion.div>
            ))}
          </div>
          
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative inline-block"
          >
            <div className="absolute -inset-1 rounded-lg blur-sm bg-gradient-to-r from-indigo-400 to-purple-300 opacity-70"></div>
            <Link
              to="/explore"
              className="relative inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-md text-indigo-700 bg-white hover:bg-gray-50 shadow-lg"
            >
              Start Exploring
              <svg className="ml-2 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>
          </motion.div>
          
          {/* Subtle endorsement line */}
          <p className="mt-6 text-indigo-200 text-sm">
            Trusted by thousands of students worldwide
          </p>
        </motion.div>
      </div>
    </section>
  );
}