import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, CheckCircle, XCircle, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { Skeleton } from './ui/skeleton';

const statusConfig = {
  pending: {
    icon: <Clock className="w-4 h-4" />,
    color: 'bg-amber-100 text-amber-800',
    text: 'Pending Review',
  },
  accepted: {
    icon: <CheckCircle className="w-4 h-4" />,
    color: 'bg-emerald-100 text-emerald-800',
    text: 'Accepted',
  },
  rejected: {
    icon: <XCircle className="w-4 h-4" />,
    color: 'bg-red-100 text-red-800',
    text: 'Not Selected',
  },
};

const AppliedJobTable = () => {
  const { allAppliedJobs, isLoading } = useSelector(store => store.job);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden"
      >
        <Table className="w-full">
          <TableCaption className="py-4 text-sm text-gray-500 bg-gray-50 border-b">
            Your internship applications history
          </TableCaption>
          <TableHeader className="bg-gray-50">
            <TableRow className="hover:bg-gray-50">
              <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Date Applied</TableHead>
              <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Position</TableHead>
              <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Company</TableHead>
              <TableHead className="py-3 px-4 text-left font-medium text-gray-600">Type</TableHead>
              <TableHead className="py-3 px-4 text-right font-medium text-gray-600">Status</TableHead>
            </TableRow>
          </TableHeader>
          
          <TableBody>
            {isLoading ? (
              <TableRow>
                {[...Array(5)].map((_, i) => (
                  <TableCell key={i} className="py-4 px-4">
                    <Skeleton className="h-4 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ) : (
              <AnimatePresence>
                {(!allAppliedJobs || allAppliedJobs.length === 0) ? (
                  <TableRow>
                    <TableCell colSpan={5} className="py-8 text-center text-gray-500">
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center justify-center space-y-2"
                      >
                        <div className="text-gray-400">
                          <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        </div>
                        <p className="text-sm font-medium">No applications found</p>
                        <p className="text-xs text-gray-400 max-w-xs">
                          You haven't applied to any internships yet. Start exploring opportunities!
                        </p>
                      </motion.div>
                    </TableCell>
                  </TableRow>
                ) : (
                  allAppliedJobs.map((appliedJob) => (
                    <motion.tr
                      key={appliedJob._id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="border-t border-gray-100 hover:bg-gray-50"
                    >
                      <TableCell className="py-4 px-4 text-sm text-gray-600">
                        {appliedJob?.createdAt ? format(new Date(appliedJob.createdAt), 'MMM dd, yyyy') : '-'}
                      </TableCell>
                      <TableCell className="py-4 px-4">
                        <div className="font-medium text-gray-900">{appliedJob?.job?.title || '-'}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          {appliedJob?.job?.location || 'Remote'}
                        </div>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-gray-600">
                        {appliedJob?.job?.company?.name || '-'}
                      </TableCell>
                      <TableCell className="py-4 px-4 text-sm text-gray-600">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {appliedJob?.job?.type || 'Internship'}
                        </span>
                      </TableCell>
                      <TableCell className="py-4 px-4 text-right">
                        <motion.div
                          whileHover={{ scale: 1.03 }}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            statusConfig[appliedJob?.status]?.color || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {statusConfig[appliedJob?.status]?.icon}
                          <span className="ml-1.5">
                            {statusConfig[appliedJob?.status]?.text || appliedJob?.status}
                          </span>
                        </motion.div>
                      </TableCell>
                    </motion.tr>
                  ))
                )}
              </AnimatePresence>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </div>
  );
};

export default AppliedJobTable;