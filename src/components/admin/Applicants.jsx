import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import ApplicantsTable from './ApplicantsTable';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { motion } from "framer-motion";

const headerVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const tableVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: { delay: i * 0.1, duration: 0.3 }
    })
};

const Applicants = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const { applicants } = useSelector(store => store.application);
    const [loading, setLoading] = useState(true); // Added loading state
    const [error, setError] = useState(null); // Added error state

    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                const applications = Array.isArray(res.data.job.applications) ? res.data.job.applications : [];
                dispatch(setAllApplicants(applications));
            } catch (error) {
                setError('Failed to fetch applicants. Please try again later.');
                console.log(error);
            } finally {
                setLoading(false); // Set loading to false after the fetch
            }
        };
        fetchAllApplicants();
    }, [params.id, dispatch]);

    if (loading) {
        return <div>Loading...</div>; // Show loading text while fetching data
    }

    if (error) {
        return <div className="text-red-500">{error}</div>; // Show error if fetching fails
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="max-w-7xl mx-auto p-6">
                {/* Header with Motion */}
                <motion.h2 
                    className="font-bold text-2xl my-5 text-gray-800"
                    variants={headerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    Applicants ({applicants?.length || 0})
                </motion.h2>

                {/* Applicants Table with Motion */}
                <motion.div
                    initial="hidden"
                    animate="visible"
                    variants={tableVariants}
                    custom={0}
                >
                    <ApplicantsTable />
                </motion.div>
            </div>
        </div>
    );
};

export default Applicants;
