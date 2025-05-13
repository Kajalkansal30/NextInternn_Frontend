// import React, { useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import { toast } from 'sonner';
// //import axios from 'axios'; // ✅ correct
// import axios from "axios"; // ✅ correct
// import { USER_API_END_POINT } from '@/utils/constant';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading, setUser } from '@/redux/authSlice';
// import { Loader2, Eye, EyeOff, Info } from 'lucide-react';
// import { motion } from "framer-motion";
// import { Dialog } from '@headlessui/react';

// // Password validation function
// const validatePassword = (password) => {
//     return {
//         minLength: password.length >= 8,
//         hasUpperCase: /[A-Z]/.test(password),
//         hasLowerCase: /[a-z]/.test(password),
//         hasNumbers: /[0-9]/.test(password),
//         hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
//     };
// };

// const Login = () => {
//     const [input, setInput] = useState({ email: "", password: "", reconfirmPassword: "", role: "" });
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [isTyping, setIsTyping] = useState(false);
//     // const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//     const [passwordMismatch, setPasswordMismatch] = useState(false);

//     const { loading } = useSelector(store => store.auth);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();

//     const passwordValidation = validatePassword(input.password);

//     // Handle input change
//     // const changeEventHandler = (e) => {
//     //     setInput({ ...input, [e.target.name]: e.target.value });
//     //     if (e.target.name === "password") {
//     //         setIsTyping(e.target.value.length > 0); // Show validation hints only when typing
//     //     }
//     // };
//     const changeEventHandler = (e) => {
//         const { name, value } = e.target;
//         setInput((prev) => ({ ...prev, [name]: value }));

//         if (name === "password") {
//             setIsTyping(value.length > 0);
//             setPasswordMismatch(input.reconfirmPassword !== value && input.reconfirmPassword.length > 0);
//         }

//         // if (name === "reconfirmPassword") {
//         //     setPasswordMismatch(input.password !== value);
//         // }
//     };

//     // Toggle password visibility
//     // const togglePasswordVisibility = () => {
//     //     setPasswordVisible(!passwordVisible);
//     // };
//     const togglePasswordVisibility = () => {
//         setPasswordVisible(prev => !prev);
//     };

//     // const toggleConfirmPasswordVisibility = () => {
//     //     // setConfirmPasswordVisible(prev => !prev);
//     // };

//     // Form submit handler
//     const submitHandler = async (e) => {
//         e.preventDefault();

//         if (!Object.values(passwordValidation).every(Boolean)) {
//             toast.error("Password does not meet requirements!");
//             return;
//         }
//         // if (passwordMismatch) {
//         //     toast.error("Passwords do not match!");
//         //     return;
//         // }

//         try {
//             dispatch(setLoading(true));
//             const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
//                 headers: { "Content-Type": "application/json" },
//                 withCredentials: true,
//             });

//             // if (res.data.success) {
//             //     dispatch(setUser(res.data.user));
//             //     navigate("/");
//             //     toast.success(res.data.message);
//             // }
//             if (res.data.success) {
//                 const { user, step, company } = res.data;

//                 dispatch(setUser(user));
//                 localStorage.setItem('user', JSON.stringify(user));
//                 if (company) {
//                     localStorage.setItem('company', JSON.stringify(company));
//                 }

//                 console.log("Login Response:", res.data);

//                 // Navigate based on step
//                 switch (step) {
//                     case "AdminProfile1":
//                         navigate('/admin/profile');
//                         break;
//                     case "CompanyCreate":
//                         navigate('/admin/companies/create');
//                         break;
//                     case "CompanySetup":
//                         navigate(`/admin/companies/${company?._id}`);
//                         break;
//                     case "PostJob":
//                         navigate('/admin/jobs/create');
//                         break;
//                     case "AdminJobs":
//                         navigate('/admin/jobs');
//                         break;
//                     default:
//                         navigate('/');
//                         break;
//                 }

//                 toast.success(res.data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error(error.response?.data?.message || "Something went wrong!");
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };

//     // Unmet password requirements
//     const unmetRequirements = Object.entries(passwordValidation)
//         .filter(([_, isValid]) => !isValid)
//         .map(([key]) => ({
//             minLength: "At least 8 characters",
//             hasUpperCase: "One uppercase letter (A-Z)",
//             hasLowerCase: "One lowercase letter (a-z)",
//             hasNumbers: "One number (0-9)",
//             hasSpecialChar: "One special character (!@#$%^&*)"
//         }[key]));

//     return (
//         <div className="min-h-screen flex flex-col items-center bg-gray-100">
//             <Navbar />
//             <motion.div
//                 className="flex flex-col max-w-md w-full items-center bg-white shadow-lg rounded-lg p-6 my-10"
//                 initial={{ opacity: 0, y: -20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ duration: 0.3 }}
//             >
//                 <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">Login</h1>

//                 <form onSubmit={submitHandler} className="space-y-5 w-full">
//                     {/* Email Field */}
//                     <div>
//                         <label className="text-sm font-medium text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={input.email}
//                             onChange={changeEventHandler}
//                             placeholder="Kajal@gmail.com"
//                             className="border border-gray-300 rounded px-3 py-2 w-full"
//                         />
//                     </div>

//                     {/* Password Field */}
//                     <div>
//                         <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
//                             Password
//                             <button type="button" onClick={() => setIsDialogOpen(true)}>
//                                 <Info className="h-4 w-4 text-blue-500" />
//                             </button>
//                         </label>

//                         <div className="relative">
//                             <input
//                                 type={passwordVisible ? "text" : "password"}
//                                 name="password"
//                                 value={input.password}
//                                 onChange={changeEventHandler}
//                                 placeholder="Enter your password"
//                                 className="border border-gray-300 rounded px-3 py-2 w-full"
//                             />
//                             <button
//                                 type="button"
//                                 onClick={togglePasswordVisibility}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2"
//                             >
//                                 {passwordVisible ? (
//                                     <Eye className="w-5 h-5 text-gray-500" />
//                                 ) : (
//                                     <EyeOff className="w-5 h-5 text-gray-500" />
//                                 )}
//                             </button>
//                         </div>

//                         {/* Password Validation Messages */}
//                         {isTyping && unmetRequirements.length > 0 && (
//                             <ul className="mt-2 text-sm text-red-600">
//                                 {unmetRequirements.map((requirement, index) => (
//                                     <li key={index}>❌ {requirement}</li>
//                                 ))}
//                             </ul>
//                         )}
//                     </div>
//                     {/* Confirm Password Field */}
//                     {/* <div>
//                         <label className="text-sm font-medium">Confirm Password</label>
//                         <div className="relative">
//                             <input
//                                 type={confirmPasswordVisible ? "text" : "password"}
//                                 name="reconfirmPassword"
//                                 value={input.reconfirmPassword}
//                                 onChange={changeEventHandler}
//                                 placeholder="Re-enter your password"
//                                 className="border border-gray-300 rounded px-3 py-2 w-full"
//                             />
//                             <button type="button" onClick={toggleConfirmPasswordVisibility} className="absolute right-3 top-1/2 transform -translate-y-1/2">
//                                 {confirmPasswordVisible ? <Eye className="w-5 h-5 text-gray-500" /> : <EyeOff className="w-5 h-5 text-gray-500" />}
//                             </button>
//                         </div>
//                         {passwordMismatch && input.reconfirmPassword.length > 0 && (
//                             <p className="text-sm text-red-600 mt-2">❌ Passwords do not match!</p>
//                         )}
//                     </div> */}

//                     {/* Role Selection */}
//                     <div className="flex items-center gap-4">
//                         <label className="flex items-center cursor-pointer">
//                             <input type="radio" name="role" value="student" checked={input.role === 'student'} onChange={changeEventHandler} className="cursor-pointer" />
//                             <span>Student</span>
//                         </label>
//                         <label className="flex items-center cursor-pointer">
//                             <input type="radio" name="role" value="recruiter" checked={input.role === 'recruiter'} onChange={changeEventHandler} className="cursor-pointer" />
//                             <span>Recruiter</span>
//                         </label>
//                     </div>

//                     {/* Submit Button */}
//                     <button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-md">
//                         {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Login"}
//                     </button>

//                     {/* Signup Link */}
//                     <p className="text-sm text-center text-gray-600">
//                         Don't have an account? <Link to="/signup" className="text-blue-600 hover:underline">Signup</Link>
//                     </p>
//                 </form>
//             </motion.div>

//             {/* Password Requirement Dialog */}
//             <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//                 <div className="bg-white rounded-lg p-6 w-80 text-center">
//                     <h2 className="text-lg font-bold">Password Requirements</h2>
//                     <ul className="mt-4 text-sm text-gray-700 text-left">
//                         <li>✅ At least 8 characters</li>
//                         <li>✅ One uppercase letter (A-Z)</li>
//                         <li>✅ One lowercase letter (a-z)</li>
//                         <li>✅ One number (0-9)</li>
//                         <li>✅ One special character (!@#$%^&*)</li>
//                     </ul>
//                     <button onClick={() => setIsDialogOpen(false)} className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md">OK</button>
//                 </div>
//             </Dialog>
//         </div>
//     );
// };

// export default Login;

import React, { useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import axios from "axios";
import { USER_API_END_POINT } from '@/utils/constant';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading, setUser } from '@/redux/authSlice';
import { Loader2, Eye, EyeOff, Info, Lock, Mail, User } from 'lucide-react';
import { motion } from "framer-motion";
import { Dialog } from '@headlessui/react';

const validatePassword = (password) => {
    return {
        minLength: password.length >= 8,
        hasUpperCase: /[A-Z]/.test(password),
        hasLowerCase: /[a-z]/.test(password),
        hasNumbers: /[0-9]/.test(password),
        hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
};

const Login = () => {
    const [input, setInput] = useState({ email: "", password: "", role: "" });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    
    const { loading } = useSelector(store => store.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const passwordValidation = validatePassword(input.password);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
        if (name === "password") setIsTyping(value.length > 0);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        if (!Object.values(passwordValidation).every(Boolean)) {
            toast.error("Password does not meet requirements!");
            return;
        }

        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            if (res.data.success) {
                const { user, step, company } = res.data;
                dispatch(setUser(user));
                localStorage.setItem('user', JSON.stringify(user));
                if (company) localStorage.setItem('company', JSON.stringify(company));

                switch (step) {
                    case "AdminProfile1": navigate('/admin/profile'); break;
                    case "CompanyCreate": navigate('/admin/companies/create'); break;
                    case "CompanySetup": navigate(`/admin/companies/${company?._id}`); break;
                    case "PostJob": navigate('/admin/jobs/create'); break;
                    case "AdminJobs": navigate('/admin/jobs'); break;
                    default: navigate('/'); break;
                }
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Login failed. Please try again.");
        } finally {
            dispatch(setLoading(false));
        }
    };

    const unmetRequirements = Object.entries(passwordValidation)
        .filter(([_, isValid]) => !isValid)
        .map(([key]) => ({
            minLength: "At least 8 characters",
            hasUpperCase: "One uppercase letter",
            hasLowerCase: "One lowercase letter",
            hasNumbers: "One number",
            hasSpecialChar: "One special character"
        }[key]));

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
            <Navbar />
            <div className="container mx-auto px-4 py-12 flex justify-center">
                <motion.div
                    className="w-full max-w-md"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100">
                        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-center">
                            <Lock className="h-10 w-10 text-white mx-auto mb-2" />
                            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
                            <p className="text-blue-100">Sign in to your account</p>
                        </div>

                        <form onSubmit={submitHandler} className="p-6 space-y-6">
                            {/* Email Field */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">Email Address</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Mail className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type="email"
                                        name="email"
                                        value={input.email}
                                        onChange={changeEventHandler}
                                        placeholder="your@email.com"
                                        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                    <label className="block text-sm font-medium text-gray-700">Password</label>
                                    <button
                                        type="button"
                                        onClick={() => setIsDialogOpen(true)}
                                        className="text-xs text-blue-600 hover:text-blue-800 flex items-center"
                                    >
                                        <Info className="h-3 w-3 mr-1" />
                                        Requirements
                                    </button>
                                </div>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                        <Lock className="h-5 w-5 text-gray-400" />
                                    </div>
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="••••••••"
                                        className="block w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setPasswordVisible(!passwordVisible)}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                    >
                                        {passwordVisible ? (
                                            <EyeOff className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                                        ) : (
                                            <Eye className="h-5 w-5 text-gray-500 hover:text-gray-700" />
                                        )}
                                    </button>
                                </div>
                                {isTyping && unmetRequirements.length > 0 && (
                                    <ul className="mt-1 text-xs text-red-600 space-y-1">
                                        {unmetRequirements.map((req, i) => (
                                            <li key={i} className="flex items-start">
                                                <span className="mr-1">•</span> {req}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>

                            {/* Role Selection */}
                            <div className="space-y-2">
                                <label className="block text-sm font-medium text-gray-700">I am a</label>
                                <div className="grid grid-cols-2 gap-3">
                                    <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${input.role === 'student' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="student"
                                            checked={input.role === 'student'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <User className="h-5 w-5 mr-2" />
                                        <span>Student</span>
                                    </label>
                                    <label className={`flex items-center justify-center p-3 border rounded-lg cursor-pointer transition-colors ${input.role === 'recruiter' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}>
                                        <input
                                            type="radio"
                                            name="role"
                                            value="recruiter"
                                            checked={input.role === 'recruiter'}
                                            onChange={changeEventHandler}
                                            className="sr-only"
                                        />
                                        <User className="h-5 w-5 mr-2" />
                                        <span>Recruiter</span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'}`}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                                        Signing in...
                                    </span>
                                ) : (
                                    "Sign In"
                                )}
                            </button>

                            <div className="text-center text-sm text-gray-600">
                                Don't have an account?{' '}
                                <Link to="/signup" className="font-medium text-blue-600 hover:text-blue-800">
                                    Create account
                                </Link>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>

            {/* Password Requirements Dialog */}
            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="w-full max-w-sm rounded-xl bg-white p-6 shadow-xl">
                        <Dialog.Title className="text-lg font-bold text-gray-900 flex items-center">
                            <Info className="h-5 w-5 text-blue-500 mr-2" />
                            Password Requirements
                        </Dialog.Title>
                        <div className="mt-4">
                            <ul className="space-y-2 text-sm text-gray-700">
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    Minimum 8 characters
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    At least one uppercase letter
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    At least one lowercase letter
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    At least one number
                                </li>
                                <li className="flex items-start">
                                    <span className="text-green-500 mr-2">✓</span>
                                    At least one special character
                                </li>
                            </ul>
                        </div>
                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={() => setIsDialogOpen(false)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Got it
                            </button>
                        </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default Login;