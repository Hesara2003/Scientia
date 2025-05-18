import React, { useState, useEffect } from 'react';
import { getAllTutors } from '../services/tutorService';
import { getAllClasses } from '../services/classService';
import { getAllSubjects } from '../services/subjectService';
import { getAllRecordingBundles } from '../services/recordingService';

// Import components
import BackgroundElements from '../components/landing/BackgroundElements';
import Navigation from '../components/landing/Navigation';
import HeroSection from '../components/landing/HeroSection';
import FeaturedCoursesSection from '../components/landing/FeaturedCoursesSection';
import ExploreCTASection from '../components/landing/ExploreCTASection';
import TutorsSection from '../components/landing/TutorsSection';
import TimetableSection from '../components/landing/TimetableSection';
import AboutUsSection from '../components/landing/AboutUsSection';
import Footer from '../components/landing/Footer';

export default function LandingPage() {
  const [tutors, setTutors] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [recordingBundles, setRecordingBundles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSubject, setActiveSubject] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch data in parallel
        const [tutorsData, classesData, subjectsData, bundlesData] = await Promise.all([
          getAllTutors(),
          getAllClasses(),
          getAllSubjects(),
          getAllRecordingBundles()
        ]);
        
        setTutors(tutorsData || []);
        setClasses(classesData || []);
        setSubjects(subjectsData || []);
        setRecordingBundles(bundlesData || []);
        
        // Set the first subject as active by default if subjects exist
        if (subjectsData && subjectsData.length > 0) {
          setActiveSubject(subjectsData[0]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        
        // Use mock data if API fails
        setTutors(mockTutors);
        setClasses(mockClasses);
        setSubjects(mockSubjects);
        setRecordingBundles(mockRecordingBundles);
        
        // Set the first mock subject as active
        setActiveSubject(mockSubjects[0]);
      } finally {
        setLoading(false);
      }
    };

    // Clear any existing user role when landing page is loaded
    localStorage.removeItem('userRole');
    
    fetchData();
  }, []);

  // Helper functions
  const getClassesBySubject = (subjectName) => {
    if (!subjectName) return classes;
    return classes.filter(course => course.subject === subjectName);
  };

  const getTutorsBySubject = (subjectName) => {
    if (!subjectName) return tutors;
    return tutors.filter(tutor => tutor.subject === subjectName);
  };

  const getBundlesBySubject = (subjectId) => {
    if (!subjectId) return recordingBundles;
    return recordingBundles.filter(bundle => bundle.subjectId === subjectId);
  };

  const handleSubjectChange = (subject) => {
    setActiveSubject(subject);
    setActiveTab('overview');
  };

  // Enhanced animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1, 
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 12
      }
    }
  };

  // Mock data in case API fails
  const mockTutors = [
    { id: 1, name: "Dr. Sarah Johnson", subject: "Mathematics", rating: 4.9, image: "https://randomuser.me/api/portraits/women/44.jpg", bio: "PhD in Applied Mathematics with 10+ years of teaching experience" },
    { id: 2, name: "Prof. James Wilson", subject: "Physics", rating: 4.7, image: "https://randomuser.me/api/portraits/men/32.jpg", bio: "Former NASA researcher specializing in quantum mechanics" },
    { id: 3, name: "Ms. Emily Chen", subject: "Chemistry", rating: 4.8, image: "https://randomuser.me/api/portraits/women/66.jpg", bio: "Certified teacher with innovative lab-based teaching methods" },
    { id: 4, name: "Mr. David Taylor", subject: "English Literature", rating: 4.6, image: "https://randomuser.me/api/portraits/men/68.jpg", bio: "Published author with a passion for classic and modern literature" }
  ];

  const mockClasses = [
    { id: 1, title: "Advanced Calculus", tutor: "Dr. Sarah Johnson", schedule: "Mon, Wed 4:00-5:30 PM", startDate: "2023-06-01", capacity: "15/20", subject: "Mathematics", studentCount: 15, maxCapacity: 20 },
    { id: 2, title: "Quantum Physics Fundamentals", tutor: "Prof. James Wilson", schedule: "Tue, Thu 3:30-5:00 PM", startDate: "2023-06-05", capacity: "12/15", subject: "Physics", studentCount: 12, maxCapacity: 15 },
    { id: 3, title: "Organic Chemistry Lab", tutor: "Ms. Emily Chen", schedule: "Fri 2:00-5:00 PM", startDate: "2023-06-02", capacity: "18/25", subject: "Chemistry", studentCount: 18, maxCapacity: 25 },
    { id: 4, title: "Creative Writing Workshop", tutor: "Mr. David Taylor", schedule: "Wed 6:00-8:00 PM", startDate: "2023-06-07", capacity: "8/12", subject: "English Literature", studentCount: 8, maxCapacity: 12 }
  ];
  
  const mockSubjects = [
    { 
      id: 1, 
      name: "Mathematics", 
      description: "Explore the world of numbers and mathematical concepts from algebra to calculus.", 
      icon: "https://img.icons8.com/color/96/000000/mathematics.png",
      popularTopics: ["Calculus", "Algebra", "Trigonometry", "Statistics"],
      totalClasses: 15
    },
    { 
      id: 2, 
      name: "Physics", 
      description: "Understand the fundamental principles that govern the physical world around us.", 
      icon: "https://img.icons8.com/color/96/000000/physics.png",
      popularTopics: ["Mechanics", "Quantum Physics", "Thermodynamics", "Electromagnetism"],
      totalClasses: 12
    },
    { 
      id: 3, 
      name: "Chemistry", 
      description: "Discover the composition, structure, properties, and reactions of matter.", 
      icon: "https://img.icons8.com/color/96/000000/test-tube.png",
      popularTopics: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Biochemistry"],
      totalClasses: 9
    },
    { 
      id: 4, 
      name: "English Literature", 
      description: "Analyze literary works and develop strong writing and critical thinking skills.", 
      icon: "https://img.icons8.com/color/96/000000/literature.png",
      popularTopics: ["Modern Fiction", "Shakespeare", "Poetry Analysis", "Creative Writing"],
      totalClasses: 8
    },
    { 
      id: 5, 
      name: "Computer Science", 
      description: "Learn programming, algorithms, and computational thinking.", 
      icon: "https://img.icons8.com/color/96/000000/source-code.png",
      popularTopics: ["Python Programming", "Data Structures", "Web Development", "Artificial Intelligence"],
      totalClasses: 20
    }
  ];
  
  const mockRecordingBundles = [
    { 
      id: 1, 
      title: "Mathematics Mastery Bundle", 
      subject: "Mathematics",
      subjectId: 1,
      description: "Complete set of recorded calculus and algebra lessons for self-paced learning",
      price: 79.99,
      duration: "20 hours",
      level: "Intermediate to Advanced",
      topics: ["Differential Calculus", "Integral Calculus", "Linear Algebra"],
      bestSeller: true,
      thumbnail: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      totalLessons: 25
    },
    { 
      id: 2, 
      title: "Physics Fundamentals", 
      subject: "Physics",
      subjectId: 2,
      description: "Comprehensive physics recordings covering mechanics and thermodynamics",
      price: 89.99,
      duration: "24 hours",
      level: "Beginner to Intermediate",
      topics: ["Classical Mechanics", "Waves and Oscillations", "Thermodynamics"],
      bestSeller: false,
      thumbnail: "https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      totalLessons: 22
    },
    { 
      id: 3, 
      title: "Chemistry Essentials", 
      subject: "Chemistry",
      subjectId: 3,
      description: "Key chemistry topics with virtual lab demonstrations",
      price: 69.99,
      duration: "18 hours",
      level: "All Levels",
      topics: ["Organic Chemistry Basics", "Chemical Reactions", "Atomic Structure"],
      bestSeller: false,
      thumbnail: "https://images.unsplash.com/photo-1603126857599-f6e157fa2fe6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      totalLessons: 20
    },
    { 
      id: 4, 
      title: "Literature Analysis Complete Course", 
      subject: "English Literature",
      subjectId: 4,
      description: "In-depth literary analysis techniques and writing skills",
      price: 59.99,
      duration: "15 hours",
      level: "Intermediate",
      topics: ["Literary Criticism", "Narrative Analysis", "Poetry Interpretation"],
      bestSeller: true,
      thumbnail: "https://images.unsplash.com/photo-1476275466078-4007374efbbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      totalLessons: 18
    },
    { 
      id: 5, 
      title: "Programming Essentials", 
      subject: "Computer Science",
      subjectId: 5,
      description: "Foundational programming concepts with hands-on projects",
      price: 99.99,
      duration: "30 hours",
      level: "Beginner",
      topics: ["Python Programming", "Data Structures", "Algorithms"],
      bestSeller: true,
      thumbnail: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=60",
      totalLessons: 35
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <BackgroundElements />
      <Navigation mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      <FeaturedCoursesSection 
        loading={loading} 
        classes={classes} 
        containerVariants={containerVariants} 
        itemVariants={itemVariants} 
      />
      <ExploreCTASection />
      <TutorsSection 
        loading={loading} 
        tutors={tutors} 
        containerVariants={containerVariants} 
        itemVariants={itemVariants} 
      />
      <TimetableSection loading={loading} classes={classes} />
      <AboutUsSection />
      <Footer />
    </div>
  );
}
