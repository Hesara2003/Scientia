import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, User, Users, BookOpen, ArrowRight } from 'lucide-react';

export default function TimetableSection({ loading, classes }) {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('all');
  
  // Get unique subjects for filter tabs
  const subjects = classes && classes.length > 0 
    ? ['all', ...new Set(classes.map(course => course.subject || 'Other'))]
    : ['all'];
  
  // Filter classes based on active tab
  const filteredClasses = classes && classes.length > 0
    ? activeTab === 'all' 
      ? classes 
      : classes.filter(course => course.subject === activeTab)
    : [];
  
  return (
    <section id="timetable" className="py-20 bg-gradient-to-b from-gray-50 to-white relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-indigo-50 opacity-50 rounded-bl-full"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-blue-50 opacity-50 rounded-tr-full"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-block mb-3 px-4 py-1 rounded-full bg-indigo-100 text-indigo-700"
            >
              <Calendar className="w-4 h-4 inline-block mr-2" />
              <span className="text-xs font-medium uppercase tracking-wide">Schedule Your Learning</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl font-extrabold text-gray-900 sm:text-4xl mb-4"
            >
              Upcoming Class Timetable
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="max-w-2xl mx-auto text-lg text-gray-500"
            >
              Browse our upcoming classes and secure your spot. Classes are filling up quickly!
            </motion.p>
          </div>
          
          {/* Filter tabs */}
          {!loading && (
            <motion.div 
              className="flex flex-wrap justify-center gap-2 mb-8"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              {subjects.map((subject, index) => (
                <button
                  key={subject}
                  onClick={() => setActiveTab(subject)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeTab === subject
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                  }`}
                >
                  {subject === 'all' ? 'All Classes' : subject}
                </button>
              ))}
            </motion.div>
          )}
          
          {loading ? (
            <div className="flex flex-col items-center justify-center py-16">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mb-4"></div>
              <p className="text-gray-500">Loading class schedule...</p>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="overflow-hidden rounded-xl shadow-sm border border-gray-200"
            >
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-indigo-50">
                    <tr>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <BookOpen className="w-4 h-4 mr-2" />
                          Course
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <User className="w-4 h-4 mr-2" />
                          Instructor
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-2" />
                          Schedule
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-2" />
                          Start Date
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        <div className="flex items-center">
                          <Users className="w-4 h-4 mr-2" />
                          Capacity
                        </div>
                      </th>
                      <th scope="col" className="px-6 py-4 text-left text-xs font-semibold text-indigo-700 uppercase tracking-wider">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredClasses.map((course, index) => (
                      <motion.tr 
                        key={course.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-indigo-50/50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 flex-shrink-0 rounded-full bg-indigo-100 flex items-center justify-center">
                              <BookOpen className="h-5 w-5 text-indigo-500" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{course.title}</div>
                              <div className="text-xs text-gray-500">{course.subject || 'General'}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{course.tutor}</div>
                          <div className="text-xs text-gray-500">
                            {course.tutorTitle || 'Instructor'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {course.schedule}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {course.startDate}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-full bg-gray-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-indigo-600 h-2 rounded-full" 
                                style={{ 
                                  width: `${Math.min(100, (course.enrolled / course.capacity) * 100)}%`
                                }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-500">
                              {course.enrolled || Math.floor(Math.random() * course.capacity)}/{course.capacity}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate('/auth/register')}
                            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-medium rounded-md inline-flex items-center transition-colors"
                          >
                            Enroll Now
                            <ArrowRight className="ml-1 h-3 w-3" />
                          </motion.button>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
          
          <motion.div 
            className="mt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <p className="text-sm text-gray-500 mb-4">
              Can't find what you're looking for? Check our full course catalog or contact us.
            </p>
            <button 
              className="text-indigo-600 font-medium hover:text-indigo-800 transition-colors"
              onClick={() => navigate('/explore')}
            >
              View Full Course Catalog →
            </button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}