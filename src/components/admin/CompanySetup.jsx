import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { Button } from '../ui/button';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetCompanyById from '@/hooks/useGetCompanyById';
import { motion } from "framer-motion";
import { ArrowLeft, Loader2, UploadCloud, FileText, Check } from "lucide-react";

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
        practioner: false,
        city: "",
        industry: "",
        employeeNumber: "",
        reqDoc: false,
        logo: null,
        verifiedDoc: null
    });
    const { singleCompany } = useSelector(store => store.company);
    const [loading, setLoading] = useState(false);
    const [logoPreview, setLogoPreview] = useState("");
    const [docPreview, setDocPreview] = useState("");
    const navigate = useNavigate();

    const industries = [
        "IT & Software",
        "Finance & Banking",
        "Healthcare",
        "Education",
        "Manufacturing",
        "Retail",
        "Construction",
        "Marketing & Advertising",
        "Hospitality",
        "Legal",
        "Other"
    ];

    const employeeRanges = [
        "1-10",
        "11-50",
        "51-200",
        "201-500",
        "501-1000",
        "1000+"
    ];

    const changeEventHandler = (e) => {
        const { name, value, type, checked } = e.target;
        setInput(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    const changeFileHandler = (e) => {
        const { name, files } = e.target;
        const file = files?.[0];

        if (!file) return;

        if (name === "verifiedDoc") {
            setInput(prev => ({ ...prev, verifiedDoc: file }));
            setDocPreview(file.name);
        } else if (name === "logo") {
            setInput(prev => ({ ...prev, logo: file }));
            const reader = new FileReader();
            reader.onload = () => setLogoPreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!input.name || !input.description || !input.city || !input.industry) {
            return toast.error("Please fill all required fields");
        }

        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("practitioner", input.practioner);
        formData.append("city", input.city);
        formData.append("industry", input.industry);
        formData.append("employeeNumber", input.employeeNumber);
        formData.append("reqDoc", input.reqDoc);
        if (input.verifiedDoc) formData.append("pdf", input.verifiedDoc);
        if (input.logo) formData.append("image", input.logo);

        try {
            setLoading(true);
            const res = await axios.put(
                `${COMPANY_API_END_POINT}/update/${params.id}`, 
                formData,
                { headers: { 'Content-Type': 'multipart/form-data' }, withCredentials: true }
            );
            
            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (singleCompany) {
            setInput({
                name: singleCompany.name || "",
                description: singleCompany.description || "",
                practioner: singleCompany.practioner || false,
                city: singleCompany.city || "",
                industry: singleCompany.industry || "",
                employeeNumber: singleCompany.employeeNumber || "",
                reqDoc: singleCompany.reqDoc || false,
                logo: null,
                verifiedDoc: null
            });
            if (singleCompany.logo) {
                setLogoPreview(singleCompany.logo);
            }
        }
    }, [singleCompany]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            
            <motion.div 
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-4xl mx-auto px-4 py-8"
            >
                {/* Header with Back Button */}
                <div className="flex items-center mb-8">
                    <Button 
                        variant="ghost" 
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
                    >
                        <ArrowLeft className="h-5 w-5" />
                        Back
                    </Button>
                    <h1 className="text-2xl font-bold text-gray-900 ml-4">Company Profile Setup</h1>
                </div>

                {/* Progress Indicator */}
                <div className="mb-8">
                    <div className="flex items-center">
                        <div className="flex-1 h-1 bg-gray-200 rounded-full">
                            <div className="h-1 bg-blue-600 rounded-full w-3/3"></div>
                        </div>
                        <span className="ml-4 text-sm font-medium text-gray-700">Step 3 of 3</span>
                    </div>
                </div>

                {/* Form Container */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    {/* Form Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-cyan-50 px-6 py-4 border-b border-gray-200">
                        <h2 className="text-xl font-semibold text-gray-800">Organization Details</h2>
                        <p className="text-sm text-gray-600 mt-1">
                            Complete your company profile to get started
                        </p>
                    </div>

                    <form onSubmit={submitHandler} className="p-6 space-y-6">
                        {/* Practitioner Checkbox */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <input
                                type="checkbox"
                                id="practioner"
                                checked={input.practioner}
                                name="practioner"
                                onChange={changeEventHandler}
                                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="practioner" className="ml-3 text-sm font-medium text-gray-700">
                                I am an independent practitioner (freelancer, architect, lawyer, etc.)
                            </label>
                        </div>

                        {/* Company Name */}
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                                Company Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={input.name}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Enter your company name"
                                required
                            />
                        </div>

                        {/* Company Description */}
                        <div>
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                                Company Description <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={input.description}
                                onChange={changeEventHandler}
                                rows={4}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                placeholder="Briefly describe your company"
                                required
                            />
                        </div>

                        {/* Location and Industry - Two Column Layout */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Company City */}
                            <div>
                                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                    City <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    id="city"
                                    name="city"
                                    value={input.city}
                                    onChange={changeEventHandler}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    placeholder="e.g. New York"
                                    required
                                />
                            </div>

                            {/* Industry */}
                            <div>
                                <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                                    Industry <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="industry"
                                    name="industry"
                                    value={input.industry}
                                    onChange={changeEventHandler}
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                    required
                                >
                                    <option value="">Select industry</option>
                                    {industries.map(industry => (
                                        <option key={industry} value={industry}>{industry}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Employee Count */}
                        <div>
                            <label htmlFor="employeeNumber" className="block text-sm font-medium text-gray-700 mb-1">
                                Number of Employees <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="employeeNumber"
                                name="employeeNumber"
                                value={input.employeeNumber}
                                onChange={changeEventHandler}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                                required
                            >
                                <option value="">Select employee range</option>
                                {employeeRanges.map(range => (
                                    <option key={range} value={range}>{range} employees</option>
                                ))}
                            </select>
                        </div>

                        {/* Logo Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Company Logo
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {logoPreview ? (
                                            <div className="relative">
                                                <img 
                                                    src={logoPreview} 
                                                    alt="Logo preview" 
                                                    className="h-16 w-16 object-contain rounded-md"
                                                />
                                                <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-1">
                                                    <Check className="h-3 w-3 text-white" />
                                                </div>
                                            </div>
                                        ) : (
                                            <>
                                                <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> or drag and drop
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    PNG, JPG, GIF (Max. 1MB)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        name="logo" 
                                        accept="image/*"
                                        onChange={changeFileHandler}
                                        className="hidden" 
                                    />
                                </label>
                            </div>
                        </div>

                        {/* Document Upload */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Official Verification Document <span className="text-red-500">*</span>
                            </label>
                            <div className="flex items-center justify-center w-full">
                                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
                                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                        {docPreview ? (
                                            <div className="flex items-center gap-2">
                                                <FileText className="h-8 w-8 text-blue-500" />
                                                <span className="text-sm font-medium text-gray-700">{docPreview}</span>
                                            </div>
                                        ) : (
                                            <>
                                                <UploadCloud className="h-8 w-8 text-gray-400 mb-2" />
                                                <p className="mb-2 text-sm text-gray-500">
                                                    <span className="font-semibold">Click to upload</span> PDF, DOC, JPG, PNG
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    (Max. 5MB)
                                                </p>
                                            </>
                                        )}
                                    </div>
                                    <input 
                                        type="file" 
                                        name="verifiedDoc" 
                                        accept="application/pdf,image/*"
                                        onChange={changeFileHandler}
                                        className="hidden" 
                                        required={!input.reqDoc}
                                    />
                                </label>
                            </div>
                            <p className="mt-2 text-xs text-blue-600 hover:underline cursor-pointer">
                                View accepted document types
                            </p>
                        </div>

                        {/* No Documents Checkbox */}
                        <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                            <input
                                type="checkbox"
                                id="reqDoc"
                                checked={input.reqDoc}
                                name="reqDoc"
                                onChange={changeEventHandler}
                                className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <label htmlFor="reqDoc" className="ml-3 text-sm font-medium text-gray-700">
                                I do not have the required documents
                            </label>
                        </div>

                        {/* Form Actions */}
                        <div className="flex justify-end pt-6">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="min-w-[120px] bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : "Save & Continue"}
                            </Button>
                        </div>
                    </form>
                </div>
            </motion.div>
        </div>
    );
};

export default CompanySetup;