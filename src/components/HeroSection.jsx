import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setSearchText, setSearchedQuery } from '../redux/jobSlice';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiSearch, FiBriefcase, FiTrendingUp, FiCpu, FiBarChart } from 'react-icons/fi';

const searchVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5, 
      staggerChildren: 0.15,
      ease: "easeOut" 
    } 
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { duration: 0.4 } 
  },
};

const buttonVariants = {
  hover: { 
    scale: 1.03, 
    backgroundColor: "#3b82f6",
    boxShadow: "0 4px 14px rgba(59, 130, 246, 0.3)",
    transition: { 
      duration: 0.2,
      ease: "easeOut"
    } 
  },
  tap: { scale: 0.98 }
};

const PopularSearch = ({ icon, text }) => (
  <motion.div 
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.98 }}
    className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full text-gray-600 border border-gray-200 
    shadow-sm text-sm font-medium cursor-pointer hover:text-blue-600 hover:border-blue-200 transition-all mr-2 mb-2"
    onClick={() => {}}
  >
    {icon}
    <span>{text}</span>
  </motion.div>
);

const HeroSection = () => {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const searchJobHandler = (e) => {
    e.preventDefault();
    if(query.trim()) {
      dispatch(setSearchText(query.trim()));
      dispatch(setSearchedQuery({})); // Clear filter selections on new search
      navigate("/browse");
    }
  };

  return (
    <motion.div
      className="pt-16 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-blue-50 via-white to-gray-50"
      initial="hidden"
      animate="visible"
      variants={searchVariants}
    >
      <div className="max-w-6xl mx-auto">
        {/* Top badge */}
        <motion.div 
          className="flex justify-center mb-6"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600 bg-opacity-10 text-white font-medium text-sm">
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            <span>Premier Internship & Job Platform</span>
          </div>
        </motion.div>

        {/* Headline */}
        <motion.h1
          className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 leading-tight"
          variants={itemVariants}
        >
          Discover Your <span className="text-blue-600 relative">
            Ideal Career
            <span className="absolute bottom-1 left-0 h-3 w-full bg-blue-200 opacity-30 rounded z-0"></span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto text-center mb-8 leading-relaxed"
          variants={itemVariants}
        >
          Connect with top employers and find opportunities that align with your skills and career goals.
          Thousands of internships and entry-level positions available.
        </motion.p>

        {/* Search Bar */}
        <motion.form
          onSubmit={searchJobHandler}
          className="max-w-3xl mx-auto mb-8"
          variants={itemVariants}
        >
          <div className="flex flex-col sm:flex-row gap-3 shadow-lg rounded-lg p-1.5 bg-white border border-gray-100">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FiSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Job title, skills, or company"
                className="w-full pl-11 pr-4 py-3.5 rounded-lg border-0 bg-transparent focus:ring-2 focus:ring-blue-200 outline-none transition duration-200"
                aria-label="Search jobs"
              />
            </div>
            
            <motion.button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-blue-600 to-blue-500 text-white font-medium rounded-lg shadow-md flex items-center justify-center gap-2 whitespace-nowrap"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              aria-label="Search"
            >
              <FiSearch size={18} />
              <span>Find Jobs</span>
            </motion.button>
          </div>
        </motion.form>

        {/* Popular searches */}
        <motion.div 
          className="text-center"
          variants={itemVariants}
        >
          <p className="text-gray-500 mb-3 font-medium">Popular Searches:</p>
          <div className="flex flex-wrap justify-center gap-2">
            <PopularSearch icon={<FiBriefcase size={14} />} text="Software Engineering" />
            <PopularSearch icon={<FiBarChart size={14} />} text="Marketing" />
            <PopularSearch icon={<FiCpu size={14} />} text="Data Science" />
            <PopularSearch icon={<FiTrendingUp size={14} />} text="Business Development" />
          </div>
        </motion.div>
      </div>

      {/* Bottom wave design */}
      <div className="absolute left-0 right-0 bottom-0 h-8 bg-white">
        <svg
          className="h-full w-full text-white"
          preserveAspectRatio="none"
          viewBox="0 0 1440 74"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 24L60 28C120 33 240 41 360 45.3C480 49.7 600 49.3 720 40.7C840 32 960 15 1080 13.3C1200 11.7 1320 25.3 1380 32.2L1440 39V74H1380C1320 74 1200 74 1080 74C960 74 840 74 720 74C600 74 480 74 360 74C240 74 120 74 60 74H0V24Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </motion.div>
  );
};

export default HeroSection;
