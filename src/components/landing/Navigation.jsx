import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Custom NavLink component with animation effects
const NavLink = ({ href, isActive, children }) => {
  return (
    <motion.a
      href={href}
      className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
        isActive 
          ? "text-indigo-600" 
          : "text-gray-700 hover:text-indigo-600"
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
      <motion.span 
        className={`absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left ${
          isActive ? "scale-100" : "scale-0"
        }`}
        initial={false}
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      {!isActive && (
        <motion.span 
          className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600 transform origin-left scale-0 group-hover:scale-100 transition-transform duration-300"
          layoutId="underline"
        />
      )}
    </motion.a>
  );
};

export default function Navigation({ mobileMenuOpen, setMobileMenuOpen }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  
  // Track scroll position to change navbar appearance
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
      
      // Determine active section based on scroll position
      const sections = ['featured-courses', 'our-tutors', 'timetable', 'about-us'];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [scrolled]);
  
  const navItems = [
    { id: 'featured-courses', label: 'Courses' },
    { id: 'our-tutors', label: 'Tutors' },
    { label: 'Explore', path: '/explore' },
    { id: 'timetable', label: 'Timetable' },
    { id: 'about-us', label: 'About Us' }
  ];
  
  return (
    <motion.nav 
      className={`backdrop-blur-md ${
        scrolled 
          ? "bg-white/90 shadow-lg" 
          : "bg-transparent"
      } sticky top-0 z-50 transition-all duration-300`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <motion.div
              className="flex-shrink-0 flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/')}
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent cursor-pointer flex items-center">
                <motion.svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2"
                  initial={{ rotate: 0 }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                >
                  <circle cx="12" cy="12" r="10" stroke="url(#gradient)" strokeWidth="2" />
                  <path d="M12 6V18" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" />
                  <path d="M6 12H18" stroke="url(#gradient)" strokeWidth="2" strokeLinecap="round" />
                  <defs>
                    <linearGradient id="gradient" x1="2" y1="12" x2="22" y2="12" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#4F46E5" />
                      <stop offset="1" stopColor="#7E22CE" />
                    </linearGradient>
                  </defs>
                </motion.svg>
                Scientia
              </span>
            </motion.div>
            
            <div className="hidden sm:ml-8 sm:flex sm:space-x-1">
              {navItems.map((item) => (
                item.path ? (
                  <Link 
                    key={item.path}
                    to={item.path}
                    className={`relative px-3 py-2 text-sm font-medium transition-all duration-300 group ${
                      location.pathname === item.path
                        ? "text-indigo-600"
                        : "text-gray-700 hover:text-indigo-600"
                    }`}
                  >
                    {item.label}
                    {location.pathname === item.path && (
                      <motion.span
                        className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"
                        layoutId="navunderline"
                      />
                    )}
                  </Link>
                ) : (
                  <NavLink 
                    key={item.id}
                    href={`#${item.id}`}
                    isActive={activeSection === item.id}
                  >
                    {item.label}
                  </NavLink>
                )
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.button
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 4px 15px rgba(79, 70, 229, 0.25)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => navigate('/auth/login')}
              className="relative overflow-hidden px-5 py-2 text-sm text-white font-medium bg-gradient-to-r from-indigo-600 to-purple-600 rounded-lg shadow-md transition-all duration-300 group"
            >
              <span className="relative z-10">Sign In</span>
              <motion.span
                className="absolute top-0 right-full w-full h-full bg-gradient-to-r from-purple-600 to-indigo-600 z-0"
                initial={false}
                whileHover={{ right: 0 }}
                transition={{ duration: 0.4 }}
              />
            </motion.button>
            
            <motion.button 
              className="sm:hidden inline-flex items-center justify-center p-2 rounded-md text-indigo-600 hover:text-indigo-700 focus:outline-none"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              {mobileMenuOpen ? (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            className="sm:hidden bg-white shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="px-2 pt-2 pb-3 space-y-1 divide-y divide-gray-100">
              <a href="#featured-courses" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Courses</a>
              <a href="#our-tutors" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Tutors</a>
              <a href="#timetable" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">Timetable</a>
              <a href="#about-us" className="block px-3 py-3 text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 rounded-md">About Us</a>
              <Link to="/explore" className="block px-3 py-3 text-base font-medium text-indigo-600 hover:bg-indigo-50 rounded-md">Explore</Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}