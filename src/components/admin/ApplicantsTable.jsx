import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllApplicants } from '@/redux/applicationSlice';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { User, Mail, Phone, Calendar, Check, X, Pencil } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { motion } from "framer-motion";
import axios from 'axios';
import { APPLICATION_API_END_POINT } from '@/utils/constant';

const ApplicantsTable = () => {
  const dispatch = useDispatch();
  const applicants = useSelector(state => state.application.applicants);

  const updateStatus = async (id, newStatus) => {
    try {
      await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status: newStatus.toLowerCase() },
        { withCredentials: true }
      );
      
      const updatedApplicants = applicants.map(application => 
        application._id === id ? { ...application, status: newStatus.toLowerCase() } : application
      );
      dispatch(setAllApplicants(updatedApplicants));
    } catch (error) {
      console.error('Failed to update status:', error);
      // You might want to add error handling here (e.g., toast notification)
    }
  };

  const getStatusBadge = (status) => {
    switch (status.toLowerCase()) {
      case "accepted":
        return (
          <Badge className="bg-green-100 text-green-800">
            <Check className="h-3 w-3 mr-1" />
            Accepted
          </Badge>
        );
      case "rejected":
        return (
          <Badge className="bg-red-100 text-red-800">
            <X className="h-3 w-3 mr-1" />
            Rejected
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800">
            Pending
          </Badge>
        );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Applicant Management</h3>
        <p className="mt-1 text-sm text-gray-500">
          Review and manage all applicant submissions
        </p>
      </div>

      <div className="overflow-x-auto">
        <Table className="min-w-full divide-y divide-gray-200">
          <TableHeader className="bg-gray-50">
            <TableRow>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applicant
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Contact
              </TableHead>
              <TableHead className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Applied
              </TableHead>
              <TableHead className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white divide-y divide-gray-200">
            {applicants.map((application, index) => {
              const applicant = application.applicant;
              const appliedDate = new Date(application.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'short', 
                day: 'numeric' 
              });
              const status = application.status || "pending";
              
              return (
                <motion.tr
                  key={application._id}
                  className="hover:bg-gray-50"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <User className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {applicant.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {applicant.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900 flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-gray-400" />
                      {applicant.email}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center mt-1">
                      <Phone className="h-4 w-4 mr-2 text-gray-400" />
                      {applicant.phone}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500 flex items-center">
                      <Calendar className="h-4 w-4 mr-2 text-gray-400" />
                      {appliedDate}
                    </div>
                  </TableCell>
                  <TableCell className="px-6 py-4 whitespace-nowrap text-right">
                    <div className="flex items-center justify-end gap-2">
                      {getStatusBadge(status)}
                      <Popover>
                        <PopoverTrigger>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="h-8 w-8 p-0 hover:bg-gray-100"
                            onClick={() => console.log('Pencil button clicked')}
                          >
                            <Pencil className="h-4 w-4" />
                            <span className="sr-only">Change status</span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-40 p-0" align="end" side="bottom">
                          <div className="flex flex-col">
                            <Button 
                              variant="ghost" 
                              className="justify-start px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => updateStatus(application._id, "Accepted")}
                            >
                              <Check className="h-4 w-4 mr-2 text-green-600" />
                              Accepted
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="justify-start px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => updateStatus(application._id, "Rejected")}
                            >
                              <X className="h-4 w-4 mr-2 text-red-600" />
                              Rejected
                            </Button>
                            <Button 
                              variant="ghost" 
                              className="justify-start px-4 py-2 text-sm hover:bg-gray-100"
                              onClick={() => updateStatus(application._id, "Pending")}
                            >
                              Pending
                            </Button>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </div>
                  </TableCell>
                </motion.tr>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ApplicantsTable;
