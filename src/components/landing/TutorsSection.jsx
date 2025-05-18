import React from 'react';
import { motion } from 'framer-motion';

export default function TutorsSection({ loading, tutors, containerVariants, itemVariants }) {
  return (
    <section id="our-tutors" className="py-20 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-50">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 0 10 L 40 10 M 10 0 L 10 40" stroke="rgba(79, 70, 229, 0.05)" strokeWidth="1" fill="none" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-indigo-100 mix-blend-multiply filter blur-3xl opacity-30"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-blue-100 mix-blend-multiply filter blur-3xl opacity-30"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col items-center mb-16 text-center">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-3 inline-flex items-center px-3 py-1 rounded-full bg-indigo-100 text-indigo-800"
            >
              <svg className="w-4 h-4 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8Z" stroke="currentColor" strokeWidth="2"/>
                <path d="M3 21C3 18.2386 5.23858 16 8 16H16C18.7614 16 21 18.2386 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              <span className="text-xs font-medium">Learn From The Best</span>
            </motion.div>
            
            <motion.h2 
              className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4 relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Meet Our Expert Tutors
              <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-indigo-500 rounded-full"></span>
            </motion.h2>
            
            <motion.p
              className="max-w-xl text-gray-600 text-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Our team of dedicated educators bring years of real-world experience to help you master your subjects.
            </motion.p>
          </div>
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
              <p className="text-gray-500">Loading our amazing tutors...</p>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {tutors.slice(0, 8).map((tutor) => (
                <motion.div 
                  key={tutor.id}
                  className="group bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  <div className="h-56 overflow-hidden relative">
                    <img 
                      src={tutor.image || `https://randomuser.me/api/portraits/${tutor.id % 2 === 0 ? 'men' : 'women'}/${tutor.id * 10 + 10}.jpg`} 
                      alt={tutor.name} 
                      className="w-full h-full object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <motion.div 
                      className="absolute bottom-0 left-0 w-full p-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={false}
                      animate={{ y: 0 }}
                      exit={{ y: 20 }}
                    >
                      <span className="text-white font-medium bg-indigo-600/80 py-1 px-3 rounded-full text-xs">
                        {tutor.yearsExperience || "5+"} Years Exp.
                      </span>
                      <button className="bg-white/90 p-2 rounded-full hover:bg-white transition-colors">
                        <svg className="w-4 h-4 text-indigo-600" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </motion.div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{tutor.name}</h3>
                        <p className="text-indigo-600 font-medium text-sm">{tutor.subject}</p>
                      </div>
                      <div className="bg-indigo-50 rounded-full h-8 w-8 flex items-center justify-center">
                        <span className="text-xs font-bold text-indigo-600">{tutor.rating || "4.5"}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{tutor.bio || "Experienced educator passionate about student success."}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className={`h-4 w-4 ${i < Math.floor(tutor.rating || 4.5) ? 'text-yellow-400' : 'text-gray-300'}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                      <button className="text-indigo-600 font-medium text-sm hover:text-indigo-800 transition-colors">
                        View Profile
                      </button>
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
            transition={{ duration: 0.5 }}
          >
            <button className="inline-flex items-center px-5 py-2 border border-indigo-600 text-indigo-600 rounded-lg font-medium hover:bg-indigo-50 transition-colors">
              View All Tutors
              <svg className="ml-2 w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}