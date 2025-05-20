import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
// Import icons individually to avoid bundling issues
import { ArrowRight } from 'lucide-react';
import { BookOpen } from 'lucide-react';
import { Users } from 'lucide-react';
import { Award } from 'lucide-react';

// Enhanced typing text with better animation
const TypingText = ({ text, cursorVisible = true }) => (
  <span className="block bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-400 text-transparent bg-clip-text font-extrabold">
    {text}{cursorVisible && <span className="animate-pulse">|</span>}
  </span>
);

// Enhanced action button with advanced animations
const ActionButton = ({ to, primary = false, children }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  return (
    <motion.div 
      className="w-full relative overflow-hidden"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{ 
        scale: 1.05, 
        boxShadow: primary 
          ? "0 10px 25px -5px rgba(79, 70, 229, 0.4)" 
          : "0 10px 25px -5px rgba(0, 0, 0, 0.1)" 
      }} 
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated background particles for primary button */}
      {primary && (
        <div className="absolute inset-0 overflow-hidden">
          {/* Particle effects - increased number and variety */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className={`absolute ${i % 2 === 0 ? 'w-2 h-2' : 'w-1 h-3'} rounded-full ${
                i % 3 === 0 
                  ? 'bg-indigo-300/50' 
                  : i % 3 === 1 
                    ? 'bg-purple-300/50' 
                    : 'bg-white/40'
              }`}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                rotate: `${Math.random() * 180}deg`,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={isHovered ? {
                scale: [0, 1 + (Math.random() * 1), 0],
                opacity: [0, 0.7, 0],
                x: [0, (Math.random() * 60) - 30],
                y: [0, (Math.random() * 60) - 30],
                rotate: [0, Math.random() * 360],
              } : { scale: 0, opacity: 0 }}
              transition={{
                duration: 1 + Math.random() * 1.5,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 0.5,
                ease: i % 2 === 0 ? "easeOut" : "easeInOut",
              }}
            />
          ))}
          
          {/* Central glow effect */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-4 bg-white rounded-full blur-md"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isHovered ? {
              opacity: [0, 0.7, 0.2, 0.7, 0],
              scale: [0.5, 1.2, 0.8, 1.2, 0.5],
            } : { opacity: 0, scale: 0.5 }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "loop",
              ease: "easeInOut",
            }}
          />
          
          {/* Radial rings effect */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={`ring-${i}`}
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20"
              style={{ width: '100%', height: '100%' }}
              initial={{ opacity: 0, scale: 0.2 }}
              animate={isHovered ? {
                opacity: [0, 0.4, 0],
                scale: [0.2, i * 0.3 + 0.8, 1.1],
              } : { opacity: 0, scale: 0.2 }}
              transition={{
                duration: 1.5 + (i * 0.5),
                repeat: Infinity,
                repeatType: "loop",
                delay: i * 0.4,
                ease: "easeOut",
              }}
            />
          ))}
        </div>
      )}
      
      <Link
        to={to}
        className={`w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md relative z-10 ${
          primary
            ? "text-white bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800"
            : "text-indigo-700 bg-white hover:bg-gray-50"
        } md:py-4 md:text-lg md:px-10 transition-all duration-300 shadow-lg`}
      >
        {/* Text with letter animation */}
        <motion.span className="flex items-center">
          {typeof children === 'string' ? (
            children.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 1 }}
                whileHover={{ 
                  y: [0, -5, 0],
                  color: primary ? '#ffffff' : '#4338ca',
                  transition: { duration: 0.3, delay: index * 0.03 }
                }}
                className="inline-block"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))
          ) : (
            children
          )}
        </motion.span>
      </Link>
      
      {/* Button shine effect */}
      <motion.div 
        className="absolute top-0 left-0 w-20 h-full bg-white/20 -skew-x-20 transform -translate-x-32"
        animate={isHovered ? { 
          translateX: ["calc(-100%)", "calc(100% + 100%)"] 
        } : { translateX: "calc(-100%)" }}
        transition={isHovered ? { 
          duration: 0.8, 
          ease: "easeInOut", 
          delay: 0.2 
        } : {}}
      />
      
      {/* Border glow effect for primary button */}
      {primary && (
        <motion.div 
          className="absolute -inset-0.5 rounded-md bg-gradient-to-r from-pink-600/50 via-purple-600/50 to-blue-600/50 opacity-0 blur-sm"
          animate={isHovered ? { opacity: 0.7 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
        />
      )}
    </motion.div>
  );
};

// Feature card component for highlighting key benefits
const FeatureCard = ({ icon: Icon, title, description }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-white/10 backdrop-blur-lg p-6 rounded-lg shadow-xl border border-white/20"
  >
    <div className="rounded-full bg-indigo-100 w-12 h-12 flex items-center justify-center mb-4">
      <Icon className="h-6 w-6 text-indigo-600" />
    </div>
    <h3 className="text-lg font-bold text-white mb-2">{title}</h3>
    <p className="text-indigo-100">{description}</p>
  </motion.div>
);

// Animated background shapes
const BackgroundShapes = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Animated circle */}
    <motion.div
      className="absolute top-1/4 right-1/4 w-64 h-64 rounded-full bg-purple-500/20 blur-3xl"
      animate={{ 
        x: [0, 50, 0], 
        y: [0, -30, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3] 
      }}
      transition={{ repeat: Infinity, duration: 15, ease: "easeInOut" }}
    />
    
    {/* Animated square */}
    <motion.div
      className="absolute bottom-1/3 left-1/3 w-96 h-96 rounded-3xl bg-blue-500/20 blur-3xl"
      animate={{ 
        x: [0, -40, 0], 
        y: [0, 60, 0],
        rotate: [0, 15, 0],
        opacity: [0.2, 0.4, 0.2] 
      }}
      transition={{ repeat: Infinity, duration: 20, ease: "easeInOut" }}
    />
    
    {/* Small floating elements */}
    <motion.div
      className="absolute top-1/2 left-1/4 w-24 h-24 rounded-full bg-yellow-400/30 blur-xl"
      animate={{ 
        y: [0, -30, 0],
        scale: [1, 1.2, 1],
        opacity: [0.3, 0.6, 0.3] 
      }}
      transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
    />
  </div>
);

export default function HeroSection() {
  const [text, setText] = useState("");
  const fullText = "Learning Journey";
  const [index, setIndex] = useState(0);
  
  useEffect(() => {
    if (index < fullText.length) {
      const timeout = setTimeout(() => {
        setText(prev => prev + fullText[index]);
        setIndex(prevIndex => prevIndex + 1);
      }, 100);
      
      return () => clearTimeout(timeout);
    }
  }, [index]);

  return (
    <div className="bg-gradient-to-br from-blue-800 via-indigo-800 to-purple-900 relative overflow-hidden min-h-screen flex items-center">
      {/* Enhanced background elements */}
      <BackgroundShapes />
      
      {/* Background overlay with mesh gradient */}
      <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      
      {/* Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content - Text */}
          <motion.div 
            className="text-center lg:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <motion.div
              className="inline-block mb-3 px-4 py-1 bg-white/10 backdrop-blur-sm rounded-full"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-indigo-200 font-medium text-sm">Your Education, Reimagined</span>
            </motion.div>
            
            <motion.h1 
              className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl drop-shadow-md leading-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <span className="block">Transform Your</span>
              <TypingText text={text} />
            </motion.h1>
            
            <motion.p 
              className="mt-6 max-w-lg mx-auto lg:mx-0 text-lg text-indigo-100 sm:text-xl md:mt-5 drop-shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.4 }}
            >
              Discover expert tutors and engaging courses designed to help you excel academically and reach your full potential with personalized guidance.
            </motion.p>
            
            <motion.div 
              className="mt-10 flex flex-col sm:flex-row sm:justify-start gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6 }}
            >
              <div className="rounded-md shadow mb-4 sm:mb-0 w-full sm:w-auto">
                <ActionButton to="/auth/register">
                  Get Started
                </ActionButton>
              </div>
              
              <div className="rounded-md shadow w-full sm:w-auto">
                <ActionButton to="/explore" primary>
                  <span>Explore Courses</span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </ActionButton>
              </div>
            </motion.div>
            
            {/* Social proof */}
            <motion.div
              className="mt-10 pt-6 border-t border-white/10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.8 }}
            >
              <p className="text-indigo-200 text-sm mb-3">Trusted by students worldwide</p>
              <div className="flex justify-center lg:justify-start space-x-8">
                <img src="https://png.pngtree.com/png-clipart/20211009/original/pngtree-educational-institution-logo-vector-png-image_6845030.png" alt="Partner logo" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://png.pngtree.com/png-clipart/20230313/original/pngtree-education-logo-and-school-badge-design-template-png-image_8986693.png" alt="Partner logo" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
                <img src="https://png.pngtree.com/png-vector/20230117/ourmid/pngtree-education-logo-design-for-school-and-organization-png-image_6566044.png" alt="Partner logo" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          </motion.div>
     
                  <div className="relative">
                    <motion.div 
                      className="rounded-2xl overflow-hidden shadow-2xl"
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.8, delay: 0.5 }}
                    >
                      <div className="relative">
                        <img 
                          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFi1UOhBvSbv_q5XB_EO8aTWyg0Dh8HrT6UQ&s" 
                          alt="Students learning" 
                          className="w-full object-cover h-96 lg:h-auto"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/80 to-transparent"></div>
                      </div>
                      
                      {/* Feature cards overlaying the image */}
              <div className="absolute bottom-0 left-0 w-full p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <FeatureCard 
                    icon={BookOpen} 
                    title="Expert Tutors" 
                    description="Learn from the best in every field" 
                  />
                  <FeatureCard 
                    icon={Users} 
                    title="Community" 
                    description="Join a supportive learning environment" 
                  />
                  <FeatureCard 
                    icon={Award} 
                    title="Certification" 
                    description="Earn recognized credentials" 
                  />
                </div>
              </div>
            </motion.div>
            
            {/* Floating stats card */}
            <motion.div
              className="absolute -top-10 -right-10 bg-white rounded-lg shadow-xl p-4 hidden lg:block"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 }}
              whileHover={{ y: -5, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="flex items-center">
                <div className="bg-indigo-100 rounded-full p-3 mr-4">
                  <Users className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <p className="text-gray-800 text-lg font-bold">10,000+</p>
                  <p className="text-gray-600 text-sm">Active Students</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Wave bottom */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden">
        <svg className="w-full h-24 text-white/5" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.92,143.53,111.31,221.18,94.45Z" fill="currentColor"></path>
        </svg>
      </div>
    </div>
  );
}