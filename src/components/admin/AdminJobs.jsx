import React, { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import AdminJobsTable from './AdminJobsTable'
import useGetAllAdminJobs from '../../hooks/useGetAllAdminJobs'
import { setSearchText } from '@/redux/jobSlice'

const AdminJobs = () => {
    useGetAllAdminJobs();
    const [input, setInput] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchText(input));
    }, [input, dispatch]);

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />

            {/* Container */}
            <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-md p-6 my-10 border border-gray-200">
                {/* Header Section */}
                <div className="flex items-center justify-between mb-6">
                    {/* Search Input */}
                    <Input
                        className="w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                        placeholder="Search by name or role..."
                        onChange={(e) => setInput(e.target.value)}
                    />

                    {/* New Internship Button */}
                    <button
                        onClick={() => navigate("/admin/jobs/create")}
                        className=" text-blue font-medium px-4 py-2 rounded-lg bg-[#5ce1e6] hover:bg-[#49b8bf] transition duration-200"
                    >
                        + New Internship
                    </button>
                </div>

                {/* Jobs Table */}
                <AdminJobsTable />
            </div>
        </div>
    );
};

export default AdminJobs;
