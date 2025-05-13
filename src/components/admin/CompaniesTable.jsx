import React, { useEffect, useState } from 'react'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Avatar, AvatarImage } from '@radix-ui/react-avatar'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Edit2, MoreHorizontal } from 'lucide-react'
import { useSelector } from 'react-redux'
import store from '@/redux/store'
import { useNavigate } from 'react-router-dom'
import { motion } from "framer-motion";

const tableVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut", staggerChildren: 0.1 } }
};

const rowVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } }
};

const CompaniesTable = () => {
    const { companies, searchCompanyByText } = useSelector(store => store.company);
    // const { companies = [] } = useSelector(state => state.company || {});
    const [filterCompany, setFilterCompany] = useState(companies);
    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length >= 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true
            };
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany);
    }, [companies, searchCompanyByText])

    return (
        <motion.div
            variants={tableVariants}
            initial="hidden"
            animate="visible"
            className="max-w-6xl mx-auto my-10 p-6 bg-white shadow-lg rounded-xl border"
        >
            <Table>
                <TableCaption className="text-gray-500 text-md font-medium">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow className="bg-gray-100">
                        <TableHead className="py-3">Logo</TableHead>
                        <TableHead className="py-3">Name</TableHead>
                        <TableHead className="py-3">Date</TableHead>
                        <TableHead className="py-3 text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {filterCompany?.map((company, index) => (
                        <motion.tr
                            key={company._id}
                            variants={rowVariants}
                            className="border-b hover:bg-gray-50 transition-all"
                        >
                            <TableCell className="py-4">
                                <Avatar>
                                    <AvatarImage
                                        src={company.logo}
                                        className="w-12 h-12 rounded-full object-cover shadow-md"
                                    />
                                </Avatar>
                            </TableCell>
                            <TableCell className="text-lg font-medium">{company.name}</TableCell>
                            <TableCell className="text-gray-600">{company.createdAt.split("T")[0]}</TableCell>
                            <TableCell className="text-right">
                                <Popover>
                                    <PopoverTrigger>
                                        <motion.div
                                            whileHover={{ scale: 1.1 }}
                                            className="cursor-pointer p-2 hover:bg-gray-200 rounded-lg"
                                        >
                                            <MoreHorizontal />
                                        </motion.div>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 shadow-lg rounded-md">
                                        <div
                                            onClick={() => navigate(`/admin/companies/${company._id}`)}
                                            className='flex items-center gap-2 cursor-pointer px-3 py-2 hover:bg-gray-100 rounded-md transition-all'
                                        >
                                            <Edit2 className='w-4' />
                                            <span>Edit</span>
                                        </div>
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </motion.tr>
                    ))}
                </TableBody>
            </Table>
        </motion.div>
    );
};

export default CompaniesTable