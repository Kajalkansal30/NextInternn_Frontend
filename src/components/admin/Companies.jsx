import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import CompaniesTable from './CompaniesTable'
import { useNavigate } from 'react-router-dom'
import useGetAllCompanies from '@/hooks/useGetAllCompanies'
import { useDispatch } from 'react-redux'
import { setSearchCompanyByText } from '@/redux/companySlice'
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" } }
};

const Companies = () => {
    const [input, setInput] = useState("");
    useGetAllCompanies();
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchCompanyByText(input));
    }, [input]);
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="min-h-screen bg-gray-50"
        >
            <Navbar />
            <div className='max-w-6xl mx-auto my-10 p-6 bg-white shadow-md rounded-lg border'>
                <motion.div
                    className='flex items-center justify-between my-5'
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Input
                        className="w-80 border-gray-300 focus:border-blue-500 focus:ring-blue-500 rounded-lg p-2 shadow-sm"
                        placeholder="Filter by name"
                        onChange={(e) => setInput(e.target.value)}
                    />
                    <motion.button
                        onClick={() => navigate("/admin/companies/create")}
                        className="px-4 py-2 bg-[#5ce1e6] text-blue rounded-lg shadow-md hover:bg-[#49b8bf] transition-all"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        New Company
                    </motion.button>
                </motion.div>
                <CompaniesTable />
            </div>
        </motion.div>
    );
};

export default Companies