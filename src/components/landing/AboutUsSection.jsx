import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AboutUsSection() {
  const navigate = useNavigate();
  
  return (
    <section id="about-us" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="lg:grid lg:grid-cols-2 lg:gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-6">
              About Our School
            </h2>
            <div className="w-20 h-1 bg-indigo-600 rounded-full mb-6"></div>
            
            <div className="mb-8 border-l-4 border-indigo-500 pl-4 italic text-lg text-gray-700">
              "Our mission is to make learning accessible, engaging, and effective through innovative teaching methods and technology."
            </div>
            
            <p className="text-gray-600 mb-6 leading-relaxed">
              EduLearn Hub is a premier educational platform committed to providing high-quality education to students of all ages and backgrounds. We believe education should be accessible to everyone and tailored to individual learning styles.
            </p>
            
            <p className="text-gray-600 mb-8 leading-relaxed">
              We offer a diverse range of courses taught by experienced educators who are passionate about student success. Our personalized approach ensures that each student receives the attention and support they need to excel academically.
            </p>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              {
                label: "Personalized Learning",
                icon: "🎯"
              },
              {
                label: "Expert Tutors",
                icon: "👨‍🏫"
              },
              {
                label: "Flexible Schedules",
                icon: "🕒"
              },
              {
                label: "Interactive Classes",
                icon: "🔄"
              }
            ].map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center space-x-3 bg-white shadow-sm rounded-lg p-3 border border-indigo-100 hover:border-indigo-300 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                  whileHover={{ y: -2, backgroundColor: "rgba(238, 242, 255, 0.5)" }}
                >
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-xl">
                    {feature.icon}
                  </div>
                  <span className="font-medium text-gray-800">{feature.label}</span>
                </motion.div>
              ))}
            </div>
            
            <div className="flex space-x-4 items-center">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4].map((num) => (
                  <img 
                    key={num}
                    src={`https://randomuser.me/api/portraits/${num % 2 === 0 ? 'women' : 'men'}/${num * 10}.jpg`}
                    alt={`Team member ${num}`}
                    className="w-10 h-10 rounded-full border-2 border-white"
                  />
                ))}
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-medium">Join our team</span> of passionate educators
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-10 lg:mt-0"
          >
            <div className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Ready to Get Started?</h3>
                <p className="text-gray-600 mb-6">
                  Join our growing community of learners today and take the next step in your educational journey.
                </p>
                <div className="space-y-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/auth/register')}
                    className="w-full py-2 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 rounded-lg shadow-md text-white font-medium"
                  >
                    Create Account
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => navigate('/auth/login')}
                    className="w-full py-2 px-4 border border-indigo-600 rounded-lg text-indigo-600 font-medium hover:bg-indigo-50"
                  >
                    Sign In
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}