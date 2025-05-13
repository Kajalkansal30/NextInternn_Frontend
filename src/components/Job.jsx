import React from 'react'
import { Button } from './ui/button'
import { Bookmark, MapPin, Briefcase, DollarSign } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar'
import { Badge } from './ui/badge'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

const Job = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="p-6 rounded-xl bg-white border border-gray-200 hover:shadow-lg transition-all w-full max-w-md"
    >
      {/* Header with posting time */}
      <div className="flex justify-between items-start mb-4">
        <span className="text-sm text-gray-500">3 weeks ago</span>
        <Button 
          variant="ghost" 
          size="icon" 
          className="rounded-full hover:bg-gray-100"
          aria-label="Save job"
        >
          <Bookmark size={16} />
        </Button>
      </div>

      {/* Company Info */}
      <div className="flex items-center gap-4 mb-5">
        <Avatar className="h-14 w-14 border border-gray-200">
          <AvatarImage 
            src={job?.company?.logoUrl} 
            alt={job?.company?.name}
            className="object-contain"
          />
          <AvatarFallback className="bg-gray-100 text-gray-500 text-xl">
            {job?.company?.name?.charAt(0)?.toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="font-bold text-xl text-gray-900">{job?.company?.name}</h2>
          <div className="flex items-center gap-2 text-gray-600 mt-1">
            <MapPin size={16} />
            <span>{job?.company?.location || 'Bangalore'}</span>
          </div>
        </div>
      </div>

      {/* Job Title */}
      <h3 className="font-bold text-lg text-gray-900 mb-3">{job?.title || 'MemStack'}</h3>

      {/* Job Details */}
      <div className="grid grid-cols-2 gap-4 mb-5">
        <div className="flex items-center gap-2">
          <Briefcase size={16} className="text-gray-500" />
          <span className="text-gray-700">{job?.jobType || 'Not specified'}</span>
        </div>
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-gray-500" />
          <span className="text-gray-700">{job?.salary ? `$ ${job.salary}` : '5000'}</span>
        </div>
      </div>

      {/* Job Tags */}
      <div className="flex flex-wrap gap-3 mb-6">
        <Badge variant="secondary" className="px-3 py-1 text-sm bg-blue-50 text-blue-600">
          {job?.stipendType || 'Paid'}
        </Badge>
        <Badge variant="secondary" className="px-3 py-1 text-sm bg-purple-50 text-purple-600">
          {job?.jobMode || 'Hybrid'}
        </Badge>
      </div>

      {/* Action Buttons - Vertical Layout */}
      <div className="flex flex-col gap-3">
        <Button
          onClick={() => navigate(`/description/${job?._id}`)}
          variant="outline"
          className="w-full py-3 border-gray-300 hover:bg-gray-50 hover:border-gray-400"
        >
          View Details
        </Button>
        <Button className="w-full py-3 bg-blue-600 hover:bg-blue-700">
          Save For Later
        </Button>
      </div>
    </motion.div>
  );
};

export default Job