import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { LogOut, User2, Briefcase, Home, Search, LayoutDashboard, ChevronDown } from 'lucide-react'
import React from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { motion } from 'framer-motion'
import logo from './image.png'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                localStorage.removeItem("user");  // Clear user from localStorage on logout
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    const isActive = (path) => location.pathname === path;

    return (
        <motion.nav
            className='bg-white border-b border-gray-100 w-full sticky top-0 z-50 backdrop-blur-sm bg-opacity-90'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className='flex items-center justify-between w-full h-16 px-6 max-w-7xl mx-auto'>
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className='flex items-center cursor-pointer'
                    onClick={() => navigate('/')}
                >
                    <img src={logo} alt="SkillBridge Logo" className='h-8 object-contain' />
                    <span className='ml-2 text-xl font-semibold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent'>
                        SkillBridge
                    </span>
                </motion.div>

                {/* Navigation Links */}
                <div className='flex items-center gap-8'>
                    <ul className='hidden md:flex font-medium items-center gap-6 text-gray-700'>
                        {user?.role === 'recruiter' ? (
                            <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link 
                                    to='/admin/jobs' 
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive('/admin/jobs') ? 'text-blue-600' : 'hover:text-blue-500'}`}
                                >
                                    <LayoutDashboard className='h-4 w-4' />
                                    Dashboard
                                </Link>
                            </motion.li>
                        ) : (
                            <>
                                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link 
                                        to='/' 
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive('/') ? 'text-blue-600' : 'hover:text-blue-500'}`}
                                    >
                                        <Home className='h-4 w-4' />
                                        Home
                                    </Link>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link 
                                        to='/jobs' 
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive('/jobs') ? 'text-blue-600' : 'hover:text-blue-500'}`}
                                    >
                                        <Briefcase className='h-4 w-4' />
                                        Jobs
                                    </Link>
                                </motion.li>
                                <motion.li whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                    <Link 
                                        to='/browse' 
                                        className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive('/browse') ? 'text-blue-600' : 'hover:text-blue-500'}`}
                                    >
                                        <Search className='h-4 w-4' />
                                        Browse
                                    </Link>
                                </motion.li>
                            </>
                        )}
                    </ul>

                    {/* Auth Buttons / Profile */}
                    {!user ? (
                        <div className='flex items-center gap-3'>
                            <Link to='/login'>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.95 }}
                                    className='px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-blue-600 transition-all duration-200'
                                >
                                    Login
                                </motion.button>
                            </Link>
                            <Link to='/signup'>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }} 
                                    whileTap={{ scale: 0.95 }}
                                    className='bg-gradient-to-r from-blue-600 to-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:opacity-90 transition-all duration-200 shadow-md'
                                >
                                    Sign Up
                                </motion.button>
                            </Link>
                        </div>
                    ) : (
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='flex items-center gap-2 rounded-full p-1 pr-3 border border-gray-200 hover:border-gray-300 transition-colors duration-200'
                                >
                                    <Avatar className='w-8 h-8'>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt='Profile'
                                            className='w-full h-full rounded-full object-cover'
                                        />
                                        <AvatarFallback className='bg-gray-100 text-gray-600 flex items-center justify-center w-full h-full rounded-full'>
                                            {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <ChevronDown className='w-4 h-4 text-gray-500' />
                                </motion.button>
                            </PopoverTrigger>
                            <PopoverContent
                                className='w-64 bg-white shadow-xl rounded-lg p-0 border border-gray-100'
                                align="end"
                                sideOffset={8}
                            >
                                {/* Profile Details */}
                                <div className='flex items-center gap-3 p-4 border-b border-gray-100'>
                                    <Avatar className='w-10 h-10'>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt='Profile'
                                            className='w-full h-full rounded-full object-cover'
                                        />
                                        <AvatarFallback className='bg-gray-100 text-gray-600 flex items-center justify-center w-full h-full rounded-full'>
                                            {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className='overflow-hidden'>
                                        <h4 className='font-medium text-gray-800 truncate'>{user?.firstname} {user?.lastname}</h4>
                                        <p className='text-xs text-gray-500 truncate'>{user?.email}</p>
                                    </div>
                                </div>

                                {/* User Actions */}
                                <div className='flex flex-col py-1'>
                                    {user?.role === 'student' && (
                                        <Link to='/profile'>
                                            <Button 
                                                variant="ghost" 
                                                className='w-full justify-start gap-3 rounded-none px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50'
                                            >
                                                <User2 className='h-4 w-4 text-gray-500' />
                                                My Profile
                                            </Button>
                                        </Link>
                                    )}
                                    <Button 
                                        onClick={logoutHandler}
                                        variant="ghost" 
                                        className='w-full justify-start gap-3 rounded-none px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50'
                                    >
                                        <LogOut className='h-4 w-4 text-gray-500' />
                                        Sign Out
                                    </Button>
                                </div>
                            </PopoverContent>
                        </Popover>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;