import React, { useEffect, useState } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from '../utils/constant';
import { setSingleJob } from '../redux/jobSlice';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  FiBriefcase, 
  FiMapPin, 
  FiClock, 
  FiDollarSign, 
  FiUsers, 
  FiMail, 
  FiCalendar,
  FiCheckCircle 
} from 'react-icons/fi';

const JobDescription = () => {
  const params = useParams();
  const jobId = params.id;
  const { singleJob } = useSelector(store => store.job);
  const { user } = useSelector(store => store.auth);
  const isInitiallyApplied = singleJob?.applications?.some(application => application.applicant === user?._id) || false;
  const [isApplied, setIsApplied] = useState(isInitiallyApplied);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await axios.get(`${APPLICATION_API_END_POINT}/apply/${jobId}`, { withCredentials: true });
      if (res.data.success) {
        setIsApplied(true);
        const updatedSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }]
        };
        dispatch(setSingleJob(updatedSingleJob));
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when component mounts
    
    const fetchSingleJob = async () => {
      setLoading(true);
      try {
        const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id));
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to load job details");
      } finally {
        setLoading(false);
      }
    };
    fetchSingleJob();
  }, [jobId, dispatch, user?._id]);

  const renderListFromText = (text) => {
    if (!text || typeof text !== "string") return <span className="text-gray-500">Not specified</span>;

    return (
      <ul className="list-disc space-y-2 mt-2 pl-5">
        {text
          .split(/[\n•,-]+/)
          .map((item) => item.trim())
          .filter(Boolean)
          .map((item, index) => (
            <li key={index} className="text-gray-700">{item}</li>
          ))}
      </ul>
    );
  };

  const InfoCard = ({ icon, title, value }) => (
    <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
      <div className="p-2 bg-blue-100 rounded-full text-blue-600 flex-shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-medium text-gray-500">{title}</h4>
        <p className="text-gray-800 font-medium">{value || "Not specified"}</p>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="max-w-6xl mx-auto px-4 sm:px-6 py-8 mt-0"
    >
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        {/* Header Section with Company Banner */}
        <div className="w-full h-24 bg-gradient-to-r from-blue-50 to-indigo-50 flex items-center justify-center">
          <h1 className="text-xl font-semibold text-blue-800">{singleJob?.company?.name || "Company"}</h1>
        </div>

        {/* Job Title and Apply Button */}
        <div className="p-6 sm:p-8 border-b border-gray-100">
          <div className="flex flex-col md:flex-row justify-between gap-6 items-start">
            <div className="space-y-3 flex-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 leading-tight">{singleJob?.title}</h1>
              <p className="text-base sm:text-lg text-gray-600">{singleJob?.company?.name || "Company name not specified"}</p>
              
              <div className="flex flex-wrap gap-2 pt-1">
                <Badge variant="secondary" className="text-blue-700 bg-blue-50 font-medium">
                  {singleJob?.stipendType}
                </Badge>
                <Badge variant="secondary" className="text-green-700 bg-green-50 font-medium">
                  {singleJob?.jobMode}
                </Badge>
                <Badge variant="secondary" className="text-purple-700 bg-purple-50 font-medium">
                  {singleJob?.jobType}
                </Badge>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.03 }} 
              whileTap={{ scale: 0.97 }}
              className="w-full md:w-auto"
            >
              <Button
                onClick={isApplied ? null : applyJobHandler}
                disabled={isApplied}
                className={`rounded-lg px-5 py-3 text-base sm:text-lg font-semibold shadow-sm transition-all w-full md:w-auto ${isApplied
                  ? "bg-gray-100 text-gray-500 border border-gray-200"
                  : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white shadow-blue-200"
                  }`}
              >
                {isApplied ? (
                  <span className="flex items-center gap-2">
                    <FiCheckCircle /> Application Submitted
                  </span>
                ) : "Apply Now"}
              </Button>
            </motion.div>
          </div>
        </div>

        {/* Quick Info Grid */}
        <div className="p-6 sm:p-8 bg-gray-50 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Job Overview</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InfoCard 
              icon={<FiMapPin size={20} />} 
              title="Location" 
              value={singleJob?.location} 
            />
            <InfoCard 
              icon={<FiDollarSign size={20} />} 
              title="Salary" 
              value={singleJob?.salary} 
            />
            <InfoCard 
              icon={<FiClock size={20} />} 
              title="Duration" 
              value={singleJob?.duration ? `${singleJob.duration} months` : null} 
            />
            <InfoCard 
              icon={<FiUsers size={20} />} 
              title="Openings" 
              value={singleJob?.noOfOpening} 
            />
          </div>
        </div>

        {/* Main Content */}
        <div className="p-6 sm:p-8">
          <div className="space-y-8">
            {/* Job Description */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Job Description</h2>
              <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                {singleJob?.description || "No description provided"}
              </p>
            </section>

            {/* Requirements */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Requirements</h2>
              {renderListFromText(singleJob?.requirements)}
            </section>

            {/* Responsibilities */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Responsibilities</h2>
              {renderListFromText(singleJob?.responsibilities)}
            </section>

            {/* Skills */}
            <section className="space-y-3">
              <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Skills</h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {(Array.isArray(singleJob?.skills) ? singleJob.skills : (typeof singleJob?.skills === 'string' ? singleJob.skills.split(',') : [])).map((skill, index) => (
                  <Badge key={index} variant="outline" className="px-3 py-1.5 text-sm font-medium bg-gray-50">
                    {skill.trim()}
                  </Badge>
                ))}
              </div>
            </section>

            {/* Additional Info in two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Perks & Benefits</h2>
                {renderListFromText(singleJob?.perks)}
              </section>

              <section className="space-y-3">
                <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Additional Information</h2>
                <div className="space-y-3 mt-3">
                  <InfoCard 
                    icon={<FiUsers size={18} />} 
                    title="Total Applicants" 
                    value={singleJob?.applications?.length} 
                  />
                  
                  {singleJob?.questions && typeof singleJob.questions === 'string' && singleJob.questions.trim() !== '' && (
                    <div className="p-4 bg-gray-50 rounded-lg border border-gray-100">
                      <h4 className="text-sm font-medium text-gray-500 mb-2">Application Questions</h4>
                      <p className="text-gray-800 whitespace-pre-line">{singleJob.questions}</p>
                    </div>
                  )}
                  
                  <InfoCard 
                    icon={<FiMail size={18} />} 
                    title="Contact" 
                    value={singleJob?.alternateMobileNo} 
                  />
                  
                  <InfoCard 
                    icon={<FiCalendar size={18} />} 
                    title="Posted Date" 
                    value={singleJob?.createdAt?.split("T")[0]} 
                  />
                </div>
              </section>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default JobDescription;
