import React, { useEffect } from 'react';
import Navbar from './shared/Navbar';
import Job from './Job';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import useGetAllJobs from '@/hooks/useGetAllJobs';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase } from 'react-icons/fi';
import SkeletonLoader from './shared/SkeletonLoader';

import { useState } from 'react';
import { setSearchText } from '@/redux/jobSlice';

const Browse = () => {
    useGetAllJobs();
    const { allJobs, searchedQuery, searchText, isLoading } = useSelector(store => store.job);
    const dispatch = useDispatch();
    const [filteredJobs, setFilteredJobs] = useState([]);

    useEffect(() => {
        // Do not clear filters on mount to preserve searchText from HeroSection
        // dispatch(setSearchedQuery({}));
        // dispatch(setSearchText(""));
        return () => {
            dispatch(setSearchedQuery({}));
        }
    }, [dispatch]);

    useEffect(() => {
        if (!allJobs) return;

        const filterJobsCombined = () => {
            let filtered = allJobs;

            if (searchedQuery && Object.keys(searchedQuery).length > 0) {
                filtered = filterJobs(filtered, searchedQuery);
            }

            if (searchText && typeof searchText === 'string' && searchText.trim() !== '') {
                const query = searchText.toLowerCase();
                filtered = filtered.filter(job => {
                    return (
                        job?.title?.toLowerCase().includes(query) ||
                        job?.description?.toLowerCase().includes(query) ||
                        job?.location?.toLowerCase().includes(query) ||
                        job?.company?.name?.toLowerCase().includes(query) ||
                        (job?.skills && job.skills.some(skill => skill.toLowerCase().includes(query))) ||
                        (job?.jobType && job.jobType.toLowerCase().includes(query))
                    );
                });
            }

            return filtered;
        };

        const timer = setTimeout(() => {
            const results = filterJobsCombined();
            setFilteredJobs(results);
        }, 300);

        return () => clearTimeout(timer);
    }, [allJobs, searchedQuery, searchText]);

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                when: "beforeChildren"
            }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 10
            }
        }
    };

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />
            
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="flex items-center mb-8">
                    <FiBriefcase className="text-blue-600 text-2xl mr-3" />
                    <h1 className="text-3xl font-bold text-gray-900">
                        Job Opportunities
                    </h1>
                </div>
                
                {/* Results Count */}
                <div className="mb-6">
                    <p className="text-gray-600">
                        Showing <span className="font-semibold text-gray-900">{filteredJobs.length}</span> results
                    </p>
                </div>
                
                {/* Jobs Grid */}
                {isLoading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[...Array(6)].map((_, index) => (
                            <SkeletonLoader key={index} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <AnimatePresence>
                            {filteredJobs.map((job) => (
                                <motion.div
                                    key={job._id}
                                    variants={itemVariants}
                                    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                    className="bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-200 transition-all"
                                    layout
                                >
                                    <Job job={job} />
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
                
            </div>
        </div>
    );
};

export default Browse;