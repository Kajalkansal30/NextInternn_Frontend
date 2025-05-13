import React, { useEffect } from 'react'
import Navbar from '../shared/Navbar'
import ApplicantsTable from './ApplicantsTable'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { APPLICATION_API_END_POINT } from '@/utils/constant'
import { useDispatch, useSelector } from 'react-redux'
import { setAllApplicants } from '@/redux/applicationSlice'
import store from '@/redux/store'
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
    useEffect(() => {
        const fetchAllApplicants = async () => {
            try {
                const res = await axios.get(`${APPLICATION_API_END_POINT}/${params.id}/applicants`, { withCredentials: true });
                dispatch(setAllApplicants(res.data.job));
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllApplicants();
    }, []);
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
                    Applicants ({applicants?.applications?.length || 0})
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

export default Applicants