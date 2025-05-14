import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'
import { LogOut, User2, Briefcase, Home, Search, LayoutDashboard, ChevronDown, Menu, X } from 'lucide-react'
import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Button } from '../ui/button'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import { setUser } from '@/redux/authSlice'
import { motion, AnimatePresence } from 'framer-motion'
import logo from './image.png'

const Navbar = () => {
    const { user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true });
            if (res.data.success) {
                localStorage.removeItem("user");  // Clear user from localStorage on logout
                dispatch(setUser(null));
                navigate("/");
                toast.success(res.data.message);
                setMobileMenuOpen(false); // Close mobile menu if open
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Logout failed");
        }
    }

    const isActive = (path) => location.pathname === path;

    const navLinks = user?.role === 'recruiter' ? [
        { to: '/admin/jobs', icon: <LayoutDashboard className='h-4 w-4' />, text: 'Dashboard' }
    ] : [
        { to: '/', icon: <Home className='h-4 w-4' />, text: 'Home' },
        { to: '/jobs', icon: <Briefcase className='h-4 w-4' />, text: 'Jobs' },
        { to: '/browse', icon: <Search className='h-4 w-4' />, text: 'Browse' }
    ];

    return (
        <motion.nav
            className='bg-white border-b border-gray-100 w-full sticky top-0 z-50 backdrop-blur-sm bg-opacity-90'
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
        >
            <div className='flex items-center justify-between w-full h-16 px-4 sm:px-6 max-w-7xl mx-auto'>
                {/* Logo */}
                <motion.div
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className='flex items-center cursor-pointer'
                    onClick={() => navigate('/')}
                >
                    <img src={logo} alt="SkillBridge Logo" className='h-7 sm:h-8 object-contain' />
                    <span className='ml-2 text-lg sm:text-xl font-semibold bg-gradient-to-r from-blue-600 to-teal-400 bg-clip-text text-transparent'>
                        NextIntern
                    </span>
                </motion.div>

                {/* Desktop Navigation Links */}
                <div className='hidden md:flex items-center gap-8'>
                    <ul className='flex font-medium items-center gap-6 text-gray-700'>
                        {navLinks.map((link, index) => (
                            <motion.li key={index} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link 
                                    to={link.to} 
                                    className={`flex items-center gap-2 text-sm font-medium transition-colors duration-200 ${isActive(link.to) ? 'text-blue-600' : 'hover:text-blue-500'}`}
                                >
                                    {link.icon}
                                    {link.text}
                                </Link>
                            </motion.li>
                        ))}
                    </ul>

                    {/* Auth Buttons / Profile for Desktop */}
                    {renderAuthSection()}
                </div>

                {/* Mobile Menu Button */}
                <div className='flex md:hidden items-center gap-2'>
                    {user && (
                        <Popover>
                            <PopoverTrigger asChild>
                                <motion.button 
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className='flex items-center gap-2 rounded-full p-1 border border-gray-200 hover:border-gray-300 transition-colors duration-200 mr-2'
                                >
                                    <Avatar className='w-7 h-7'>
                                        <AvatarImage
                                            src={user?.profile?.profilePhoto}
                                            alt='Profile'
                                            className='w-full h-full rounded-full object-cover'
                                        />
                                        <AvatarFallback className='bg-gray-100 text-gray-600 flex items-center justify-center w-full h-full rounded-full text-xs'>
                                            {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                                        </AvatarFallback>
                                    </Avatar>
                                </motion.button>
                            </PopoverTrigger>
                            <PopoverContent
                                className='w-64 bg-white shadow-xl rounded-lg p-0 border border-gray-100'
                                align="end"
                                sideOffset={8}
                            >
                                {renderProfileDropdown()}
                            </PopoverContent>
                        </Popover>
                    )}
                    
                    <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className='text-gray-700 hover:bg-gray-100 rounded-md'
                    >
                        {mobileMenuOpen ? (
                            <X className='h-5 w-5' />
                        ) : (
                            <Menu className='h-5 w-5' />
                        )}
                    </Button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className='md:hidden bg-white border-t border-gray-100'
                    >
                        <ul className='flex flex-col py-2 px-4'>
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <Link 
                                        to={link.to} 
                                        className={`flex items-center gap-3 py-3 text-sm font-medium transition-colors duration-200 ${isActive(link.to) ? 'text-blue-600' : 'text-gray-700'}`}
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {link.icon}
                                        {link.text}
                                    </Link>
                                </li>
                            ))}
                            
                            {/* Mobile Auth Buttons (only show if not logged in) */}
                            {!user && (
                                <div className='flex flex-col gap-3 pt-2 pb-3 border-t border-gray-100 mt-2'>
                                    <Link 
                                        to='/login'
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='w-full py-2.5 text-center rounded-md text-sm font-medium text-gray-700 bg-gray-50 hover:bg-gray-100 transition-all duration-200'
                                    >
                                        Login
                                    </Link>
                                    <Link 
                                        to='/signup'
                                        onClick={() => setMobileMenuOpen(false)}
                                        className='w-full py-2.5 text-center bg-gradient-to-r from-blue-600 to-teal-500 text-white rounded-md text-sm font-medium hover:opacity-90 transition-all duration-200 shadow-md'
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                            
                            {/* Profile & Logout in Mobile Menu (only when logged in) */}
                            {user && (
                                <div className='border-t border-gray-100 mt-2 pt-2'>
                                    {user.role === 'student' && (
                                        <Link 
                                            to='/profile'
                                            onClick={() => setMobileMenuOpen(false)}
                                            className='flex items-center gap-3 py-3 text-sm font-medium text-gray-700'
                                        >
                                            <User2 className='h-4 w-4 text-gray-500' />
                                            My Profile
                                        </Link>
                                    )}
                                    <button
                                        onClick={logoutHandler}
                                        className='flex items-center gap-3 py-3 text-sm font-medium text-gray-700 w-full'
                                    >
                                        <LogOut className='h-4 w-4 text-gray-500' />
                                        Sign Out
                                    </button>
                                </div>
                            )}
                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    );

    // Helper function to render auth section for desktop
    function renderAuthSection() {
        if (!user) {
            return (
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
            );
        }
        
        return (
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
                    {renderProfileDropdown()}
                </PopoverContent>
            </Popover>
        );
    }

    // Helper function to render profile dropdown content
    function renderProfileDropdown() {
        return (
            <>
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
                        <Link to='/profile' onClick={() => setMobileMenuOpen(false)}>
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
            </>
        );
    }
};

export default Navbar;
