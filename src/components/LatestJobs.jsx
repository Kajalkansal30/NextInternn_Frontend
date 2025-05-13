import React from 'react'
import LatestJobCards from './LatestJobCards';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import { motion } from 'framer-motion';


const LatestJobs = () => {
    const { allJobs } = useSelector(store => store.job);
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="max-w-7xl mx-auto my-20 px-6 lg:px-10"
        >
            {/* Section Heading */}
            <h1 className="text-3xl md:text-4xl font-bold text-center">
                <span className="text-[#337edf]">Latest & Top</span> Internships Opening
            </h1>

            {/* Internship Listings */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-8"
                initial="hidden"
                animate="visible"
                variants={{
                    hidden: { opacity: 0 },
                    visible: {
                        opacity: 1,
                        transition: { staggerChildren: 0.2 },
                    },
                }}
            >
                {allJobs.length <= 0 ? (
                    <motion.span
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="text-lg text-gray-500"
                    >
                        No Job Available
                    </motion.span>
                ) : (
                    allJobs?.slice(0, 6).map((job) => (
                        <motion.div
                            key={job._id}
                            variants={{
                                hidden: { opacity: 0, y: 20 },
                                visible: { opacity: 1, y: 0 },
                            }}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.3 }}
                        >
                            <LatestJobCards
                                job={{
                                    ...job,
                                    title: job.title.length > 18 ? `${job.title.slice(0, 18)}...` : job.title,
                                }}
                            />
                        </motion.div>
                    ))
                )}
            </motion.div>
        </motion.div>


    );
};

export default LatestJobs
