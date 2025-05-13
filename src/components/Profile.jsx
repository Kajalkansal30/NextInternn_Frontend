import React, { useState } from 'react'
import Navbar from './shared/Navbar'
import { Avatar } from '@radix-ui/react-avatar'
import { AvatarImage } from './ui/avatar'
import { Button } from './ui/button'
import { Contact, Mail, Pen, FileText, Video, Download } from 'lucide-react'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'
import { useSelector } from 'react-redux'
import useGetAppliedJobs from '../hooks/useGetAppliedJobs'
import { motion } from 'framer-motion'

const Profile = () => {
    useGetAppliedJobs();
    const [open, setOpen] = useState(false);
    const { user } = useSelector(store => store.auth);
    const allAppliedJobs = useSelector(store => store.job.allAppliedJobs);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-50 min-h-screen"
        >
            <Navbar />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Profile Card */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4 }}
                    className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    {/* Profile Header */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b border-gray-100">
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-5">
                                <Avatar className="h-20 w-20 border-2 border-white shadow-md">
                                    <AvatarImage
                                        src={user?.profile?.profilePhoto}
                                        alt={`${user?.firstname}'s profile`}
                                        className="object-cover"
                                    />
                                    {!user?.profile?.profilePhoto && (
                                        <div className="flex items-center justify-center h-full w-full bg-blue-100 text-blue-600 text-2xl font-medium">
                                            {user?.firstname?.charAt(0)}{user?.lastname?.charAt(0)}
                                        </div>
                                    )}
                                </Avatar>
                                <div>
                                    <h1 className="text-2xl font-semibold text-gray-800">
                                        {user?.firstname} {user?.lastname}
                                    </h1>
                                    <p className="text-gray-600 mt-1">
                                        {user?.profile?.bio || "Professional looking for opportunities"}
                                    </p>
                                </div>
                            </div>
                            <Button
                                onClick={() => setOpen(true)}
                                variant="outline"
                                className="rounded-full px-4 py-2 text-sm flex items-center gap-2 border-gray-300 hover:bg-white"
                            >
                                <Pen size={14} />
                                Edit Profile
                            </Button>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6 p-6">
                        {/* Left Column - Contact Info */}
                        <div className="space-y-6">
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                                    Contact Information
                                </h3>
                                <div className="space-y-3">
                                    <div className="flex items-center gap-3">
                                        <Mail className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-500">Email</p>
                                            <p className="text-sm font-medium text-gray-800">
                                                {user?.email || "Not provided"}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Contact className="h-5 w-5 text-gray-400 flex-shrink-0" />
                                        <div>
                                            <p className="text-xs text-gray-500">Phone</p>
                                            <p className="text-sm font-medium text-gray-800">
                                                {user?.phoneNumber || "Not provided"}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Skills Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                                    Skills
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {Array.isArray(user?.profile?.skills) && user.profile.skills.length > 0 ? (
                                        user.profile.skills.map((skill, index) => (
                                            <Badge
                                                key={index}
                                                variant="outline"
                                                className="px-3 py-1 text-sm bg-blue-50 text-blue-600 border-blue-100"
                                            >
                                                {skill}
                                            </Badge>
                                        ))
                                    ) : (
                                        <p className="text-sm text-gray-400">No skills added</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Middle Column - Documents */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                                Documents
                            </h3>
                            <div className="space-y-4">
                                {/* Resume */}
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="bg-blue-100 p-2 rounded-lg">
                                        <FileText className="h-5 w-5 text-blue-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-800">Resume</h4>
                                        {user?.profile?.pdfOriginalName ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <a
                                                    href={user.profile.pdfUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                                >
                                                    <Download size={14} />
                                                    {user.profile.pdfOriginalName}
                                                </a>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-400 mt-1">Not uploaded</p>
                                        )}
                                    </div>
                                </div>

                                {/* Video */}
                                <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="bg-purple-100 p-2 rounded-lg">
                                        <Video className="h-5 w-5 text-purple-600" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium text-gray-800">Intro Video</h4>
                                        {user?.profile?.videoOriginalName ? (
                                            <div className="flex items-center gap-2 mt-1">
                                                <a
                                                    href={user.profile.videoUrl}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="text-sm text-blue-600 hover:underline flex items-center gap-1"
                                                >
                                                    <Download size={14} />
                                                    {user.profile.videoOriginalName}
                                                </a>
                                            </div>
                                        ) : (
                                            <p className="text-sm text-gray-400 mt-1">Not uploaded</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Column - Stats (optional) */}
                        <div className="space-y-6">
                            <h3 className="text-sm font-medium uppercase tracking-wider text-gray-500">
                                Activity
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <p className="text-2xl font-bold text-gray-800">
                                        {allAppliedJobs.length}
                                    </p>
                                    <p className="text-xs text-gray-500">Jobs Applied</p>
                                </div>
                                <div className="bg-gray-50 p-4 rounded-lg text-center">
                                    <p className="text-0.3xl font-light text-gray-800">coming soon</p>
                                    <p className="text-xs text-gray-500">Interviews</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Applied Jobs Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 }}
                    className="mt-8 bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                >
                    <div className="px-6 py-4 border-b border-gray-100">
                        <h3 className="text-lg font-semibold text-gray-800">Job Applications</h3>
                        <p className="text-sm text-gray-500 mt-1">Your recent job applications</p>
                    </div>
                    <div className="p-6">
                        <AppliedJobTable />
                    </div>
                </motion.div>
            </div>

            <UpdateProfileDialog open={open} setOpen={setOpen} />
        </motion.div>
    );
};

export default Profile;
