// import React, { useEffect, useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from '../ui/button';
// import axios from 'axios';
// import { USER_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { useDispatch, useSelector } from 'react-redux';
// import { setLoading } from '@/redux/authSlice';
// import { Eye, EyeOff, Info } from 'lucide-react';
// import { motion } from 'framer-motion';
// import { Dialog } from '@headlessui/react';


// const validatePassword = (password) => {
//     const minLength = 8;
//     const hasUpperCase = /[A-Z]/.test(password);
//     const hasLowerCase = /[a-z]/.test(password);
//     const hasNumbers = /[0-9]/.test(password);
//     const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

//     // let errors = [];
//     // if (password.length < minLength) errors.push('At least 8 characters');
//     // if (!hasUpperCase) errors.push('One uppercase letter (A-Z)');
//     // if (!hasLowerCase) errors.push('One lowercase letter (a-z)');
//     // if (!hasNumbers) errors.push('One number (0-9)');
//     // if (!hasSpecialChar) errors.push('One special character (!@#$%^&* etc.)');

//     // return errors.length ? errors : null;
//     return {
//         minLength: password.length >= minLength,
//         hasUpperCase,
//         hasLowerCase,
//         hasNumbers,
//         hasSpecialChar
//     };
// };


// const Signup = () => {
//     const [input, setInput] = useState({ firstname: '', lastname: '', email: '', phoneNumber: '', password: '', reconfirmPassword: '', role: '', image: null });
//     const [passwordVisible, setPasswordVisible] = useState(false);
//     const [isDialogOpen, setIsDialogOpen] = useState(false);
//     const [isTyping, setIsTyping] = useState(false);
//     const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
//     const [passwordMismatch, setPasswordMismatch] = useState(false);


//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const { loading } = useSelector(store => store.auth);
//     const passwordValidation = validatePassword(input.password);

//     // const changeEventHandler = (e) => {
//     //     setInput(prev => ({ ...prev, [e.target.name]: e.target.value }));
//     //     if (e.target.name === "password") {
//     //         setIsTyping(e.target.value.length > 0); // Only show validation after user types
//     //     }
//     // };
//     const changeEventHandler = (e) => {
//         const { name, value } = e.target;
//         setInput((prev) => ({ ...prev, [name]: value }));

//         if (name === "password") {
//             setIsTyping(value.length > 0);
//             setPasswordMismatch(input.reconfirmPassword !== value && input.reconfirmPassword.length > 0);
//         }

//         if (name === "reconfirmPassword") {
//             setPasswordMismatch(input.password !== value);
//         }
//     };

//     const formData = new FormData();
//     Object.entries(input).forEach(([key, value]) => {
//         // Skip the file here
//         if (key !== "image" && value) formData.append(key, value);
//     });

//     // Append the image with correct multer field name
//     if (input.image) {
//         formData.append("image", input.image); // ✔️ This matches multer field
//     }
//     const changeFileHandler = (e) => {
//         const file = e.target.files?.[0];
//         if (file) {
//             if (!file.type.startsWith("image/")) {
//                 toast.error("Only image files are allowed.");
//                 return;
//             }
//             if (file.size > 2 * 1024 * 1024) {
//                 toast.error("Image size should be less than 2MB.");
//                 return;
//             }

//             // ✅ Update field name to 'image' to match multer
//             setInput(prev => ({ ...prev, image: file }));
//         }
//     };



//     const togglePasswordVisibility = () => {
//         setPasswordVisible(prev => !prev);
//     };
//     const toggleConfirmPasswordVisibility = () => {
//         setConfirmPasswordVisible(prev => !prev);
//     };

//     const submitHandler = async (e) => {
//         e.preventDefault();
//         if (!Object.values(passwordValidation).every(Boolean)) {
//             toast.error("Password does not meet requirements!");
//             return;
//         }
//         if (passwordMismatch) {
//             toast.error("Passwords do not match!");
//             return;
//         }
//         try {
//             dispatch(setLoading(true));
//             const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' },
//                 withCredentials: true,
//             });

//             if (res.data.success) {
//                 toast.success(res.data.message);
//                 navigate('/login');
//             }
//         } catch (error) {
//             toast.error(error.response?.data?.message || 'Registration failed');
//         } finally {
//             dispatch(setLoading(false));
//         }
//     };
//     const unmetRequirements = Object.entries(passwordValidation)
//         .filter(([_, isValid]) => !isValid)
//         .map(([key]) => {
//             switch (key) {
//                 case "minLength":
//                     return "At least 8 characters";
//                 case "hasUpperCase":
//                     return "One uppercase letter (A-Z)";
//                 case "hasLowerCase":
//                     return "One lowercase letter (a-z)";
//                 case "hasNumbers":
//                     return "One number (0-9)";
//                 case "hasSpecialChar":
//                     return "One special character (!@#$%^&*)";
//                 default:
//                     return "";
//             }
//         });

//     return (
//         <motion.div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4"
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ duration: 0.5 }}>
//             <Navbar />
//             <motion.div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6 my-10"
//                 initial={{ y: 50 }}
//                 animate={{ y: 0 }}
//                 transition={{ duration: 0.5 }}>
//                 <h1 className="text-3xl font-semibold text-center mb-5">Sign Up</h1>
//                 <form onSubmit={submitHandler} className="space-y-4">
//                     {['firstname', 'lastname', 'email', 'phoneNumber'].map(field => (
//                         <div key={field}>
//                             <label className="text-sm font-medium capitalize">{field.replace(/([A-Z])/g, ' $1')}</label>
//                             <input type={field === 'email' ? 'email' : 'text'} name={field} value={input[field]} onChange={changeEventHandler}
//                                 className="border border-gray-300 rounded-md px-3 py-2 w-full focus:ring focus:border-blue-500" />
//                         </div>
//                     ))}
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
//                     <div>
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
//                     </div>
//                     <div className="flex items-center gap-4">
//                         {['student', 'recruiter'].map(role => (
//                             <label key={role} className="flex items-center space-x-2">
//                                 <input type="radio" name="role" value={role} checked={input.role === role} onChange={changeEventHandler} className="cursor-pointer" />
//                                 <span className="capitalize">{role}</span>
//                             </label>
//                         ))}
//                     </div>
//                     {/* <div>
//                         <label className="text-sm font-medium">Profile Picture</label>
//                         <input type="file" accept="image/*" onChange={changeFileHandler} className="cursor-pointer border rounded-md p-2 w-full" />
//                     </div> */}
//                     <div>
//                         <label className="text-sm font-medium">Profile Picture</label>
//                         <input
//                             type="file"
//                             accept="image/*"
//                             onChange={changeFileHandler}
//                             className="cursor-pointer border rounded-md p-2 w-full"
//                         />
//                     </div>

//                     <motion.button type="submit" className="w-full bg-[#5ce1e6] hover:bg-[#49b8bf] text-white py-2 rounded-md font-semibold"
//                         whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} disabled={loading}>
//                         {loading ? 'Please wait...' : 'Signup'}
//                     </motion.button>
//                     <p className="text-sm text-center">Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Login</Link></p>
//                 </form>
//             </motion.div>
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

//         </motion.div>
//     );
// };

// export default Signup;

import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../ui/button';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { setLoading } from '@/redux/authSlice';
import { Eye, EyeOff, Info, Check, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { Dialog, Transition } from '@headlessui/react';

const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
        minLength: password.length >= minLength,
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChar
    };
};

const PasswordRequirement = ({ isValid, children }) => (
    <li className={`flex items-center ${isValid ? 'text-green-600' : 'text-gray-500'}`}>
        {isValid ? <Check className="w-4 h-4 mr-2" /> : <X className="w-4 h-4 mr-2" />}
        {children}
    </li>
);

const Signup = () => {
    const [input, setInput] = useState({ 
        firstname: '', 
        lastname: '', 
        email: '', 
        phoneNumber: '', 
        password: '', 
        reconfirmPassword: '', 
        role: '', 
        image: null 
    });
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
    const [passwordMismatch, setPasswordMismatch] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading } = useSelector(store => store.auth);
    const passwordValidation = validatePassword(input.password);

    const changeEventHandler = (e) => {
        const { name, value } = e.target;
        setInput((prev) => ({ ...prev, [name]: value }));

        if (name === "password") {
            setIsTyping(value.length > 0);
            setPasswordMismatch(input.reconfirmPassword !== value && input.reconfirmPassword.length > 0);
        }

        if (name === "reconfirmPassword") {
            setPasswordMismatch(input.password !== value);
        }
    };

    const changeFileHandler = (e) => {
        const file = e.target.files?.[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Only image files are allowed.");
                return;
            }
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image size should be less than 2MB.");
                return;
            }

            // Create preview URL
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
            
            setInput(prev => ({ ...prev, image: file }));
        }
    };

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
        if (key !== "image" && value) formData.append(key, value);
    });

    if (input.image) {
        formData.append("image", input.image);
    }

    const togglePasswordVisibility = () => {
        setPasswordVisible(prev => !prev);
    };

    const toggleConfirmPasswordVisibility = () => {
        setConfirmPasswordVisible(prev => !prev);
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        
        // Validate required fields
        if (!input.firstname || !input.lastname || !input.email || !input.phoneNumber || !input.password || !input.reconfirmPassword || !input.role) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (!Object.values(passwordValidation).every(Boolean)) {
            toast.error("Password does not meet requirements!");
            return;
        }
        
        if (passwordMismatch) {
            toast.error("Passwords do not match!");
            return;
        }
        
        try {
            dispatch(setLoading(true));
            const res = await axios.post(`${USER_API_END_POINT}/register`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true,
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate('/login');
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Registration failed');
        } finally {
            dispatch(setLoading(false));
        }
    };

    // Clean up image preview URL when component unmounts
    useEffect(() => {
        return () => {
            if (imagePreview) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <Navbar />
            <div className="container mx-auto px-4 py-12">
                <motion.div 
                    className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="p-8">
                        <div className="text-center mb-8">
                            <h1 className="text-2xl font-bold text-gray-800">Create an Account</h1>
                            <p className="text-gray-600 mt-2">Join our community today</p>
                        </div>

                        <form onSubmit={submitHandler} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">First Name*</label>
                                    <input 
                                        type="text" 
                                        name="firstname" 
                                        value={input.firstname} 
                                        onChange={changeEventHandler}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Name*</label>
                                    <input 
                                        type="text" 
                                        name="lastname" 
                                        value={input.lastname} 
                                        onChange={changeEventHandler}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    value={input.email} 
                                    onChange={changeEventHandler}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                                <input 
                                    type="tel" 
                                    name="phoneNumber" 
                                    value={input.phoneNumber} 
                                    onChange={changeEventHandler}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1 flex items-center">
                                    Password*
                                    <button 
                                        type="button" 
                                        onClick={() => setIsDialogOpen(true)}
                                        className="ml-2 text-blue-500 hover:text-blue-700"
                                    >
                                        <Info className="h-4 w-4" />
                                    </button>
                                </label>
                                <div className="relative">
                                    <input
                                        type={passwordVisible ? "text" : "password"}
                                        name="password"
                                        value={input.password}
                                        onChange={changeEventHandler}
                                        placeholder="Create a password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={togglePasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {passwordVisible ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>

                                {isTyping && (
                                    <div className="mt-2">
                                        <p className="text-xs font-medium text-gray-600 mb-1">Password Strength:</p>
                                        <div className="w-full bg-gray-200 rounded-full h-1.5">
                                            <div 
                                                className="bg-blue-600 h-1.5 rounded-full" 
                                                style={{ 
                                                    width: `${Math.max(20, Object.values(passwordValidation).filter(Boolean).length * 20)}%` 
                                                }}
                                            ></div>
                                        </div>
                                        <ul className="mt-2 text-xs space-y-1">
                                            <PasswordRequirement isValid={passwordValidation.minLength}>
                                                At least 8 characters
                                            </PasswordRequirement>
                                            <PasswordRequirement isValid={passwordValidation.hasUpperCase}>
                                                1 uppercase letter
                                            </PasswordRequirement>
                                            <PasswordRequirement isValid={passwordValidation.hasLowerCase}>
                                                1 lowercase letter
                                            </PasswordRequirement>
                                            <PasswordRequirement isValid={passwordValidation.hasNumbers}>
                                                1 number
                                            </PasswordRequirement>
                                            <PasswordRequirement isValid={passwordValidation.hasSpecialChar}>
                                                1 special character
                                            </PasswordRequirement>
                                        </ul>
                                    </div>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password*</label>
                                <div className="relative">
                                    <input
                                        type={confirmPasswordVisible ? "text" : "password"}
                                        name="reconfirmPassword"
                                        value={input.reconfirmPassword}
                                        onChange={changeEventHandler}
                                        placeholder="Confirm your password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                                        required
                                    />
                                    <button 
                                        type="button" 
                                        onClick={toggleConfirmPasswordVisibility}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                                    >
                                        {confirmPasswordVisible ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {passwordMismatch && input.reconfirmPassword.length > 0 && (
                                    <p className="mt-1 text-xs text-red-600">Passwords do not match</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Account Type*</label>
                                <div className="flex space-x-6">
                                    {['student', 'recruiter'].map(role => (
                                        <label key={role} className="flex items-center space-x-2 cursor-pointer">
                                            <input 
                                                type="radio" 
                                                name="role" 
                                                value={role} 
                                                checked={input.role === role} 
                                                onChange={changeEventHandler}
                                                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                                                required
                                            />
                                            <span className="capitalize text-gray-700">{role}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Profile Picture</label>
                                <div className="flex items-center space-x-4">
                                    <div className="relative">
                                        {imagePreview ? (
                                            <img 
                                                src={imagePreview} 
                                                alt="Preview" 
                                                className="w-16 h-16 rounded-full object-cover border-2 border-gray-200"
                                            />
                                        ) : (
                                            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                                </svg>
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex-1">
                                        <label className="flex flex-col items-center px-4 py-2 bg-white text-blue-600 rounded-lg border border-blue-600 cursor-pointer hover:bg-blue-50 transition">
                                            <span className="text-sm font-medium">Choose File</span>
                                            <input 
                                                type="file" 
                                                accept="image/*" 
                                                onChange={changeFileHandler}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-xs text-gray-500 mt-1">JPEG or PNG, max 2MB</p>
                                    </div>
                                </div>
                            </div>

                            <motion.button 
                                type="submit" 
                                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-medium shadow-md hover:shadow-lg transition-all duration-300"
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                disabled={loading}
                            >
                                {loading ? (
                                    <span className="flex items-center justify-center">
                                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        Creating Account...
                                    </span>
                                ) : (
                                    'Create Account'
                                )}
                            </motion.button>

                            <div className="text-center text-sm text-gray-600">
                                Already have an account?{' '}
                                <Link to="/login" className="text-blue-600 hover:text-blue-800 font-medium">
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                </motion.div>
            </div>

            <Transition appear show={isDialogOpen} as={React.Fragment}>
                <Dialog as="div" className="relative z-10" onClose={() => setIsDialogOpen(false)}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                        <div className="flex min-h-full items-center justify-center p-4 text-center">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                                    <Dialog.Title
                                        as="h3"
                                        className="text-lg font-medium leading-6 text-gray-900"
                                    >
                                        Password Requirements
                                    </Dialog.Title>
                                    <div className="mt-4">
                                        <ul className="text-sm text-gray-700 space-y-2">
                                            <PasswordRequirement isValid={passwordValidation.minLength}>
                                                At least 8 characters
                                            </PasswordRequirement>
                                            <PasswordRequirement isValid={passwordValidation.hasUpperCase}>
                                                One uppercase letter (A-Z)
                                            </PasswordRequirement>
                                            <PasswordRequirement isValid={passwordValidation.hasLowerCase}>
                                                One lowercase letter (a-z)
                                            </PasswordRequirement>
                                            <PasswordRequirement isValid={passwordValidation.hasNumbers}>
                                                One number (0-9)
                                            </PasswordRequirement>
                                            <PasswordRequirement isValid={passwordValidation.hasSpecialChar}>
                                                One special character (!@#$%^&*)
                                            </PasswordRequirement>
                                        </ul>
                                    </div>

                                    <div className="mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition"
                                            onClick={() => setIsDialogOpen(false)}
                                        >
                                            Got it, thanks!
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition>
        </div>
    );
};

export default Signup;