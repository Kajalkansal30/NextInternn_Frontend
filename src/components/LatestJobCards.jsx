import React from 'react';
import { Badge } from './ui/badge';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiBriefcase, FiMapPin, FiClock, FiDollarSign } from 'react-icons/fi';

const LatestJobCards = ({ job }) => {
  const navigate = useNavigate();

  return (
    <motion.div
      onClick={() => navigate(`/description/${job._id}`)}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1)'
      }}
      transition={{ 
        duration: 0.3,
        type: "spring",
        stiffness: 300,
        damping: 15
      }}
      className="relative p-6 rounded-xl bg-white border border-gray-100 cursor-pointer 
                 transition-all duration-300 hover:border-blue-200 overflow-hidden"
    >
      {/* Company Logo and Details */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-blue-50 flex items-center justify-center">
          {job.company?.logo ? (
            <img 
              src={job.company.logo} 
              alt={job.company.name} 
              className="w-10 h-10 object-contain rounded"
            />
          ) : (
            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
              <FiBriefcase className="text-blue-500 text-lg" />
            </div>
          )}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900">{job?.company?.name}</h3>
          <div className="flex items-center text-sm text-gray-500 mt-1">
            <FiMapPin className="mr-1" size={14} />
            <span>{job?.company?.city}</span>
          </div>
        </div>
      </div>

      {/* Job Title & Description */}
      <div className="mb-4">
        <h2 className="font-bold text-xl text-gray-900 mb-2">{job?.title}</h2>
        <p className="text-gray-600 text-sm line-clamp-3">{job?.description}</p>
      </div>

      {/* Job Details (Metadata) */}
      <div className="grid grid-cols-2 gap-3 mb-5">
        <div className="flex items-center text-sm text-gray-600">
          <FiClock className="mr-2 text-gray-400" size={16} />
          <span>{job?.jobType || 'Full-time'}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <FiDollarSign className="mr-2 text-gray-400" size={16} />
          <span>{job?.stipend || 'Competitive'}</span>
        </div>
      </div>

      {/* Job Tags (Badges) */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="blue">
          {job?.stipendType}
        </Badge>
        <Badge variant="green">
          {job?.jobMode}
        </Badge>
        {job?.skills?.slice(0, 2).map((skill, index) => (
          <Badge key={index} variant="outline">
            {skill}
          </Badge>
        ))}
      </div>

      {/* Posted Date */}
      <div className="absolute top-4 right-4 text-xs text-gray-400">
        Posted {job?.postedDate || 'recently'}
      </div>
    </motion.div>
  );
};

export default LatestJobCards;