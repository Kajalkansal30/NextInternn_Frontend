import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, Eye, MoreHorizontal, Briefcase, Calendar, Building2 } from 'lucide-react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion"
import { Badge } from '../ui/badge'
import { Skeleton } from '../ui/skeleton'

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.05,
            duration: 0.3
        }
    })
};

const popoverVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1, 
        transition: { 
            type: "spring", 
            stiffness: 300,
            damping: 20
        } 
    }
};

const AdminJobsTable = () => {
    const { allAdminJobs, searchText, isLoading } = useSelector(store => store.job);
    const [filterJobs, setFilterJobs] = useState(allAdminJobs);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredJobs = allAdminJobs?.filter((job) => {
            if (!searchText) return true;
            return (
                job?.title?.toLowerCase().includes(searchText.toLowerCase()) || 
                job?.company?.name.toLowerCase().includes(searchText.toLowerCase())
            );
        });
        setFilterJobs(filteredJobs);
    }, [allAdminJobs, searchText])

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    if (isLoading) {
        return (
            <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
                {[...Array(5)].map((_, i) => (
                    <div key={i} className="p-4 border-b flex justify-between items-center">
                        <div className="space-y-2 flex-1">
                            <Skeleton className="h-4 w-[200px]" />
                            <Skeleton className="h-4 w-[150px]" />
                        </div>
                        <Skeleton className="h-8 w-8 rounded-full" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="bg-white rounded-lg border overflow-hidden shadow-sm">
            <Table className="w-full">
                {/* Caption */}
                <TableCaption className="text-gray-500 text-sm py-4 bg-gray-50 border-b">
                    <div className="flex items-center justify-between">
                        <span>Showing {filterJobs?.length || 0} job postings</span>
                        <Badge variant="outline" className="text-xs">
                            Last updated: {new Date().toLocaleTimeString()}
                        </Badge>
                    </div>
                </TableCaption>

                {/* Table Header */}
                <TableHeader className="bg-gray-50">
                    <TableRow className="hover:bg-gray-50">
                        <TableHead className="px-6 py-3 font-medium text-gray-600">
                            <div className="flex items-center gap-2">
                                <Building2 className="w-4 h-4" />
                                <span>Company</span>
                            </div>
                        </TableHead>
                        <TableHead className="px-6 py-3 font-medium text-gray-600">
                            <div className="flex items-center gap-2">
                                <Briefcase className="w-4 h-4" />
                                <span>Role</span>
                            </div>
                        </TableHead>
                        <TableHead className="px-6 py-3 font-medium text-gray-600">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4" />
                                <span>Posted</span>
                            </div>
                        </TableHead>
                        <TableHead className="px-6 py-3 font-medium text-gray-600 text-right">Actions</TableHead>
                    </TableRow>
                </TableHeader>

                {/* Table Body */}
                <TableBody>
                    {filterJobs?.length > 0 ? (
                        filterJobs.map((job, index) => (
                            <motion.tr 
                                key={job._id} 
                                className="border-b hover:bg-gray-50/50 transition-colors"
                                variants={rowVariants}
                                initial="hidden"
                                animate="visible"
                                custom={index}
                            >
                                <TableCell className="px-6 py-4">
                                    <div className="flex items-center gap-3">
                                        {job.company?.logo && (
                                            <Avatar className="w-8 h-8 rounded-md border">
                                                <AvatarImage 
                                                    src={job.company.logo} 
                                                    alt={job.company.name}
                                                    className="object-cover"
                                                />
                                            </Avatar>
                                        )}
                                        <span className="font-medium text-gray-800">{job.company?.name}</span>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div>
                                        <p className="font-medium text-gray-800">{job.title}</p>
                                        <p className="text-sm text-gray-500">{job.jobType}</p>
                                    </div>
                                </TableCell>
                                <TableCell className="px-6 py-4">
                                    <div className="flex flex-col">
                                        <span className="text-gray-800">{formatDate(job.createdAt)}</span>
                                        <span className="text-xs text-gray-400">
                                            {job?.applications?.length !== undefined ? job?.applications?.length: (job?.applications?.length || 0)} applicants
                                        </span>
                                    </div>
                                </TableCell>
                                
                                {/* Action Dropdown */}
                                <TableCell className="px-6 py-4 text-right">
                                    <Popover>
                                        <PopoverTrigger className="cursor-pointer p-2 hover:bg-gray-100 rounded-full transition-colors">
                                            <MoreHorizontal className="w-5 h-5 text-gray-500" />
                                        </PopoverTrigger>
                                        
                                        <motion.div
                                            initial="hidden"
                                            animate="visible"
                                            variants={popoverVariants}
                                        >
                                            <PopoverContent 
                                                align="end" 
                                                className="w-48 p-1.5 bg-white shadow-md rounded-lg border border-gray-100"
                                            >
                                                <div 
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/update`)}
                                                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded-md text-gray-700"
                                                >
                                                    <Edit2 className="w-4 h-4" />
                                                    <span className="text-sm">Edit Posting</span>
                                                </div>

                                                <div 
                                                    onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} 
                                                    className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 cursor-pointer rounded-md text-gray-700"
                                                >
                                                    <Eye className="w-4 h-4" />
                                                    <span className="text-sm">View Applicants</span>
                                                </div>
                                            </PopoverContent>
                                        </motion.div>
                                    </Popover>
                                </TableCell>
                            </motion.tr>
                        ))
                    ) : (
                        <motion.tr 
                            className="border-b"
                            variants={rowVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            <TableCell colSpan={4} className="px-6 py-12 text-center">
                                <div className="flex flex-col items-center justify-center text-gray-400">
                                    <Briefcase className="w-10 h-10 mb-2" />
                                    <p className="text-lg font-medium">No jobs found</p>
                                    <p className="text-sm">
                                        {searchText ? 
                                            "Try adjusting your search query" : 
                                            "Create your first job posting"}
                                    </p>
                                </div>
                            </TableCell>
                        </motion.tr>
                    )}
                </TableBody>
            </Table>
        </div>
    );
};

export default AdminJobsTable;
