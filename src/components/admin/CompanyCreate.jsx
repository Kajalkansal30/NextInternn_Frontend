// // import React, { useState } from 'react';
// // import Navbar from '../shared/Navbar';
// // import { Label } from '@radix-ui/react-label';
// // import { Input } from '../ui/input';
// // import { useNavigate } from 'react-router-dom';
// // import axios from 'axios';
// // import { COMPANY_API_END_POINT } from '@/utils/constant';
// // import { toast } from 'sonner';
// // import { useDispatch } from 'react-redux';
// // import { setSingleCompany } from '@/redux/companySlice';
// // import { motion } from "framer-motion";

// // const pageVariants = {
// //     hidden: { opacity: 0, y: 20 },
// //     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
// // };

// // const CompanyCreate = () => {
// //     const navigate = useNavigate();
// //     const [companyName, setCompanyName] = useState('');
// //     const dispatch = useDispatch();

// //     const registerNewCompany = async () => {
// //         try {
// //             const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
// //                 headers: {
// //                     'Content-Type': 'application/json'
// //                 },
// //                 withCredentials: true
// //             });
// //             if (res?.data?.success) {
// //                 dispatch(setSingleCompany(res.data.company));
// //                 toast.success(res.data.message);
// //                 const companyId = res?.data?.company?._id;
// //                 navigate(`/admin/companies/${companyId}`);
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             toast.error("Failed to register company. Please try again.");
// //         }
// //     };

// //     return (
// //         <div className="min-h-screen bg-gray-100">
// //             <Navbar />
// //             <div className="flex justify-center items-center min-h-[80vh]">
// //                 <motion.div
// //                     variants={pageVariants}
// //                     initial="hidden"
// //                     animate="visible"
// //                     className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
// //                 >
// //                     <div className="text-center">
// //                         <h3 className="font-bold text-3xl text-gray-800">Your Company Name</h3>
// //                         <p className="text-gray-500 text-md mt-2">
// //                             What would you like to name your company? You can change this later.
// //                         </p>
// //                     </div>

// //                     <div className="mt-6">
// //                         <Label className="text-gray-700 text-md font-medium">Company Name</Label>
// //                         <Input
// //                             type="text"
// //                             className="mt-3 w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
// //                             placeholder="JobHunt, Microsoft, etc."
// //                             value={companyName}
// //                             onChange={(e) => setCompanyName(e.target.value)}
// //                         />
// //                     </div>

// //                     <div className="flex items-center justify-center gap-6 mt-10">
// //                         <motion.button
// //                             whileHover={{ scale: 1.05 }}
// //                             whileTap={{ scale: 0.95 }}
// //                             className="px-6 py-3 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-200 transition-all"
// //                             onClick={() => navigate("/admin/companies")}
// //                         >
// //                             Cancel
// //                         </motion.button>

// //                         <motion.button
// //                             whileHover={{ scale: 1.05 }}
// //                             whileTap={{ scale: 0.95 }}
// //                             className="px-6 py-3 bg-[#5ce1e6] text-white font-semibold rounded-lg hover:bg-[#49b8bf] transition-all"
// //                             onClick={registerNewCompany}
// //                         >
// //                             Continue
// //                         </motion.button>
// //                     </div>
// //                 </motion.div>
// //             </div>
// //         </div>
// //     );
// // };

// // export default CompanyCreate;

// import React, { useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Label } from '@radix-ui/react-label';
// import { Input } from '../ui/input';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { COMPANY_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { useDispatch } from 'react-redux';
// import { setSingleCompany } from '@/redux/companySlice';
// import { motion } from "framer-motion";

// const pageVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
// };

// const CompanyCreate = () => {
//     const navigate = useNavigate();
//     const [companyName, setCompanyName] = useState('');
//     const dispatch = useDispatch();

//     const registerNewCompany = async () => {
//         try {
//             const res = await axios.post(`${COMPANY_API_END_POINT}/register`, { companyName }, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 withCredentials: true
//             });
//             if (res?.data?.success) {
//                 dispatch(setSingleCompany(res.data.company));
//                 toast.success(res.data.message);
//                 const companyId = res?.data?.company?._id;
//                 navigate(`/admin/companies/${companyId}`);
//             }
//         } catch (error) {
//             console.error(error);
//             toast.error("Failed to register company. Please try again.");
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-100">
//             {/* <Navbar /> */}
//             {/* Stepper Navigation */}
//             {/* <div className="flex justify-center items-center my-6 space-x-8">
//                 {[
//                     { label: "Personal Details", route: "", active: true },
//                     { label: "Organization Details", route: "", active: false },
//                 ].map((step, index, arr) => (
//                     <React.Fragment key={index}>
//                         <div
//                             className={`flex items-center cursor-pointer group transition-all duration-300`}
//                             onClick={() => navigate(step.route)}
//                         >
//                             <div
//                                 className={`w-10 h-10 flex items-center justify-center rounded-full border-2 text-sm font-semibold transition-all duration-300 
//             ${step.active
//                                         ? "border-blue-600 bg-blue-100 text-blue-600"
//                                         : "border-gray-300 bg-white text-gray-400 group-hover:border-blue-300 group-hover:text-blue-400"
//                                     }`}
//                             >
//                                 {index + 1}
//                             </div>
//                             <span
//                                 className={`ml-3 text-base font-medium transition-colors duration-300 
//             ${step.active ? "text-blue-600" : "text-gray-500 group-hover:text-blue-500"}`}
//                             >
//                                 {step.label}
//                             </span>
//                         </div>

//                         {/* Separator */}
//                         {/* {index < arr.length - 1 && (
//                             <div className="w-10 md:w-16 h-1 bg-gray-300 mx-2 rounded"></div>
//                         )}
//                     </React.Fragment>
//                 ))}
//             </div> */} 

//             <div className="flex justify-center items-center min-h-[80vh]">
//                 <motion.div
//                     variants={pageVariants}
//                     initial="hidden"
//                     animate="visible"
//                     className="max-w-2xl w-full bg-white shadow-xl rounded-2xl p-8 border border-gray-200"
//                 >
//                     <div className="text-center">
//                         <h3 className="font-bold text-3xl text-gray-800">Your Company Name</h3>
//                         <p className="text-gray-500 text-md mt-2">
//                             What would you like to name your company? You can change this later.
//                         </p>
//                     </div>

//                     <div className="mt-6">
//                         <Label className="text-gray-700 text-md font-medium">Company Name</Label>
//                         <Input
//                             type="text"
//                             className="mt-3 w-full p-4 border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 transition-all"
//                             placeholder="JobHunt, Microsoft, etc."
//                             value={companyName}
//                             onChange={(e) => setCompanyName(e.target.value)}
//                         />
//                     </div>

//                     <div className="flex items-center justify-center gap-6 mt-10">
//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-6 py-3 border border-gray-400 rounded-lg text-gray-600 hover:bg-gray-200 transition-all"
//                             onClick={() => navigate("/admin/profile")}
//                         >
//                             Cancel
//                         </motion.button>

//                         <motion.button
//                             whileHover={{ scale: 1.05 }}
//                             whileTap={{ scale: 0.95 }}
//                             className="px-6 py-3 bg-[#5ce1e6] text-white font-semibold rounded-lg hover:bg-[#49b8bf] transition-all"
//                             onClick={registerNewCompany}
//                         >
//                             Continue
//                         </motion.button>
//                     </div>
//                 </motion.div>
//             </div>
//         </div>
//     );
// };

// export default CompanyCreate;

import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { COMPANY_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { setSingleCompany } from '@/redux/companySlice';
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { CheckCircle, Briefcase } from 'lucide-react';
import { Badge } from '../ui/badge';

const pageVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
};

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const dispatch = useDispatch();

    const registerNewCompany = async () => {
        if (!companyName.trim()) {
            toast.error("Company name cannot be empty");
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await axios.post(`${COMPANY_API_END_POINT}/register`, 
                { companyName }, 
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );
            
            if (res?.data?.success) {
                dispatch(setSingleCompany(res.data.company));
                toast.success(res.data.message);
                const companyId = res?.data?.company?._id;
                navigate(`/admin/companies/${companyId}`);
            }
        } catch (error) {
            console.error(error);
            toast.error(error.response?.data?.message || "Failed to register company. Please try again.");
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            registerNewCompany();
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            <Navbar />
            
            {/* Header and Progress Indicator */}
            <div className="px-4 sm:px-6 lg:px-8 pt-8">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-bold text-gray-900 mb-6">Company Profile Setup</h1>
                    
                    {/* Progress Indicator */}
                    <div className="mb-8">
                        <div className="flex items-center">
                            <div className="flex-1 h-1 bg-gray-200 rounded-full">
                                <div className="h-1 bg-blue-600 rounded-full w-2/3"></div>
                            </div>
                            <span className="ml-4 text-sm font-medium text-gray-700">Step 2 of 3</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Form */}
            <div className="flex justify-center items-center min-h-[60vh] px-4">
                <motion.div
                    variants={pageVariants}
                    initial="hidden"
                    animate="visible"
                    className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100"
                >
                    <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-3">
                                <Briefcase className="h-6 w-6 text-blue-600" />
                                <div>
                                    <CardTitle className="text-xl font-semibold text-gray-900">
                                        Organization Details
                                    </CardTitle>
                                    <CardDescription className="text-sm text-gray-600">
                                        Complete your company information
                                    </CardDescription>
                                </div>
                            </div>
                            <Badge variant="outline" className="bg-white">
                                Step 2
                            </Badge>
                        </div>
                    </CardHeader>

                    <div className="p-6">
                        <div className="space-y-6">
                            <div>
                                <Label className="block text-sm font-medium text-gray-700 mb-1">
                                    Company Name
                                    <span className="text-red-500 ml-1">*</span>
                                </Label>
                                <Input
                                    type="text"
                                    className="mt-1 block w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 transition duration-150"
                                    placeholder="e.g. Acme Inc."
                                    value={companyName}
                                    onChange={(e) => setCompanyName(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    autoFocus
                                />
                                <p className="mt-2 text-xs text-gray-500">
                                    This will be your organization's display name
                                </p>
                            </div>

                            <div className="flex items-center justify-between pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
                                    onClick={() => navigate("/admin/profile")}
                                >
                                    Back
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`px-5 py-2.5 text-sm font-medium text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${
                                        isSubmitting 
                                            ? 'bg-blue-400 cursor-not-allowed' 
                                            : 'bg-blue-600 hover:bg-blue-700'
                                    }`}
                                    onClick={registerNewCompany}
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? (
                                        <span className="flex items-center">
                                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Processing...
                                        </span>
                                    ) : (
                                        'Continue to Step 3'
                                    )}
                                </motion.button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default CompanyCreate;