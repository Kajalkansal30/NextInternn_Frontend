import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setSearchText, setSearchedQuery } from '../redux/jobSlice'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiZap } from 'react-icons/fi'

const searchVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { 
            duration: 0.6, 
            staggerChildren: 0.2,
            ease: [0.17, 0.67, 0.83, 0.67] 
        } 
    },
};

const inputVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1, 
        transition: { 
            duration: 0.5, 
            ease: "easeOut" 
        } 
    },
};

const buttonVariants = {
    hover: { 
        scale: 1.05, 
        backgroundColor: "#3da8ad",
        transition: { 
            duration: 0.2,
            ease: "easeInOut"
        } 
    },
    tap: { scale: 0.98 }
};

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
    }

    return (
        <motion.div
            className="text-center py-20 px-4 bg-gradient-to-b from-white to-blue-50"
            initial="hidden"
            animate="visible"
            variants={searchVariants}
        >
            <div className="max-w-6xl mx-auto">
                {/* Tagline */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-50 text-blue-600 font-medium text-sm shadow-sm border border-blue-100 mb-6"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                >
                    <FiZap className="text-blue-500" />
                    <span>No. 1 Internship Platform for Talent</span>
                </motion.div>

                {/* Headline */}
                <motion.h1
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                    whileInView={{ y: 0, opacity: 1 }}
                    initial={{ y: 20, opacity: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Find Your Perfect <span className="text-blue-600">Internship</span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    className="text-lg text-gray-600 max-w-2xl mx-auto mb-10"
                    whileInView={{ opacity: 1 }}
                    initial={{ opacity: 0 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                >
                    Discover opportunities from top companies and kickstart your career journey with hands-on experience.
                </motion.p>

                {/* Search Bar */}
                <motion.form
                    onSubmit={searchJobHandler}
                    className="flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto"
                    variants={inputVariants}
                >
                    <div className="relative flex-1">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                            <FiSearch className="text-gray-400" />
                        </div>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Job title, keywords, or company"
                            className="w-full pl-11 pr-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition duration-200 shadow-sm"
                        />
                    </div>
                    
                    <motion.button
                        type="submit"
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        <FiSearch />
                        Search
                    </motion.button>
                </motion.form>

                {/* Popular searches */}
                <motion.div 
                    className="mt-6 text-sm text-gray-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                >
                    Popular: <span className="text-blue-600 cursor-pointer mx-2 hover:underline">Software Engineering</span>
                    <span className="text-blue-600 cursor-pointer mx-2 hover:underline">Marketing</span>
                    <span className="text-blue-600 cursor-pointer mx-2 hover:underline">Data Science</span>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default HeroSection;
