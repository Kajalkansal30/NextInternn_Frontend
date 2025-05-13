import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { motion } from "framer-motion";
import { ArrowLeft, Loader2 } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const CompanySetup = () => {
    const params = useParams();
    useGetCompanyById(params.id);
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }
        try {
            setLoading(true);
            const res = await axios.put(`${COMPANY_API_END_POINT}/update/${params.id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/companies");
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setInput({
            name: singleCompany.name || "",
            description: singleCompany.description || "",
            website: singleCompany.website || "",
            location: singleCompany.location || "",
            file: singleCompany.file || null
        });
    }, [singleCompany]);

    return (
        <>
            <Navbar/>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-xl mx-auto my-10 p-8 bg-white shadow-xl rounded-2xl border border-gray-200"
            >
                <form onSubmit={submitHandler}>
                    <div className="flex items-center gap-5 mb-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => navigate("/admin/companies")}
                            className="flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-700 transition-all"
                        >
                            <ArrowLeft />
                            <span>Back</span>
                        </motion.button>
                        <h3 className="font-bold text-2xl text-gray-800">Company Setup</h3>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        <div>
                            <Label className="text-gray-700">Company Name</Label>
                            <Input
                                type="text"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700">Description</Label>
                            <Input
                                type="text"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                className="mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700">Website</Label>
                            <Input
                                type="text"
                                name="website"
                                value={input.website}
                                onChange={changeEventHandler}
                                className="mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div>
                            <Label className="text-gray-700">Location</Label>
                            <Input
                                type="text"
                                name="location"
                                value={input.location}
                                onChange={changeEventHandler}
                                className="mt-1 p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
                            />
                        </div>

                        <div className="col-span-2">
                            <Label className="text-gray-700">Logo</Label>
                            <Input
                                type="file"
                                accept="image/*"
                                onChange={changeFileHandler}
                                className="mt-2 w-full p-2 border rounded-lg bg-gray-50 file:cursor-pointer"
                            />
                        </div>
                    </div>

                    <div className="mt-8">
                        {loading ? (
                            <motion.button
                                className="w-full flex items-center justify-center bg-gray-400 text-white py-3 rounded-lg cursor-not-allowed"
                            >
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Please Wait
                            </motion.button>
                        ) : (
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                type="submit"
                                className="w-full bg-[#5ce1e6] text-white py-3 rounded-lg hover:bg-[#49b8bf] transition-all"
                            >
                                Update
                            </motion.button>
                        )}
                    </div>
                </form>
            </motion.div>
        </>
    );
};

export default CompanySetup;

//jobcontroller

// import { Job } from "../models/job.model.js";

// // admin post krega job
// export const postJob = async (req, res) => {
//     try {
//         const { title,description, requirements, salary, location, jobType, experience, position, companyId } = req.body;
//         const userId = req.id;

//         if (!title || !description || !requirements || !salary || !location || !jobType || !experience || !position || !companyId) {
//             return res.status(400).json({
//                 message: "Somethin is missing.",
//                 success: false
//             })
//         };
//         const job = await Job.create({
//             title,
//             description,
//             requirements: requirements.split(","),
//             salary: Number(salary),
//             location,
//             jobType,
//             experienceLevel: experience,
//             position,
//             company: companyId,
//             created_by: userId
//         });
//         return res.status(201).json({
//             message: "New job created successfully.",
//             job,
//             success: true
//         });
//     } catch (error) {
//         console.log(error);
//     }
// }
// // student k liye
// export const getAllJobs = async (req, res) => {
//     try {
//         const keyword = req.query.keyword || "";
//         const query = {
//             $or: [
//                 { title: { $regex: keyword, $options: "i" } },
//                 { description: { $regex: keyword, $options: "i" } },
//             ]
//         };
//         const jobs = await Job.find(query).populate({
//             path: "company"
//         }).sort({ createdAt: -1 });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// // student
// export const getJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         const job = await Job.findById(jobId).populate({
//             path:"applications"
//         }).populate({
//             path: "company",
//             select: "name" // Fetch only the company name
//         });
//         // const job = await Job.findById(jobId);
//         if (!job) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({ job, success: true });
//     } catch (error) {
//         console.log(error);
//     }
// }
// // admin kitne job create kra hai abhi tk
// export const getAdminJobs = async (req, res) => {
//     try {
//         const adminId = req.id; 
//         const jobs = await Job.find({ created_by: adminId }).populate({
//             path: 'company',
//             createdAt:-1
//         });
//         if (!jobs) {
//             return res.status(404).json({
//                 message: "Jobs not found.",
//                 success: false
//             })
//         };
//         return res.status(200).json({
//             jobs,
//             success: true
//         })
//     } catch (error) {
//         console.log(error);
//     }
// }
// export const updateJobById = async (req, res) => {
//     try {
//         const jobId = req.params.id;
//         console.log("Updating job with ID:", jobId);

//         const updatedJob = await Job.findByIdAndUpdate(jobId, req.body, { new: true });

//         if (!updatedJob) {
//             return res.status(404).json({ message: "Job not found.", success: false });
//         }

//         return res.status(200).json({ message: "Job updated successfully.", success: true, updatedJob });
//     } catch (error) {
//         console.error("Error updating job:", error);
//         return res.status(500).json({ message: "Server error", success: false });
//     }
// };
