import React, { useEffect, useState } from 'react';
import Navbar from './shared/Navbar';
import FilterCard from './FilterCard';
import { generateSalaryRanges } from '../utils/salaryRanges';
import { filterJobs } from '../utils/filterJobs';
import useGetAllJobs from '../hooks/useGetAllJobs';

import Job from './Job';
import { useSelector } from 'react-redux';
import { FiAlertCircle, FiBriefcase, FiFilter, FiSearch } from 'react-icons/fi';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const Jobs = () => {
  useGetAllJobs(); // Fetch all jobs on component mount

  const { allJobs, searchedQuery, searchText, isLoading, error } = useSelector(store => store.job);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter jobs based on search text and filter selections
  useEffect(() => {
    if (!allJobs) return;

    const filterJobsCombined = () => {
      // First filter by filter selections using filterJobs util
      let filtered = allJobs;
      if (searchedQuery && Object.keys(searchedQuery).length > 0) {
        filtered = filterJobs(filtered, searchedQuery);
      }

      // Then filter by search text
        if (searchText && typeof searchText === 'string' && searchText.trim() !== '') {
          const query = searchText.toLowerCase();
          filtered = filtered.filter(job => {
            return (
              job?.title?.toLowerCase().includes(query) ||
              job?.description?.toLowerCase().includes(query) ||
              job?.location?.toLowerCase().includes(query) ||
              job?.company?.name?.toLowerCase().includes(query) ||
              (job?.skills && job.skills.some(skill => skill.toLowerCase().includes(query))) ||
              (job?.jobType && job.jobType.toLowerCase().includes(query))
            );
          });
        }

      return filtered;
    };

    // Debounce the filtering to improve performance
    const timer = setTimeout(() => {
      const results = filterJobsCombined();
      setFilteredJobs(results);
    }, 300);
    return () => clearTimeout(timer);
  }, [allJobs, searchedQuery, searchText]);

  // Responsive layout handling
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMobileFiltersOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="max-w-7xl mx-auto p-5 mt-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <FiAlertCircle className="mx-auto text-red-500 text-4xl mb-4" />
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Jobs</h2>
            <p className="text-gray-600 mb-4">{error.message || 'Failed to fetch job listings'}</p>
            <button
              onClick={() => window.location.reload()}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Normalize locations to avoid duplicates with different casing and exclude 'onsite'
  const normalizedLocations = [...new Set(allJobs.map(job => job.location?.toLowerCase()).filter(loc => loc && loc !== 'onsite'))];

  // Capitalize first letter of each location for display
  const displayLocations = normalizedLocations.map(loc => loc.charAt(0).toUpperCase() + loc.slice(1));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      {/* Mobile Filter Button */}
      <button
        onClick={() => setIsMobileFiltersOpen(true)}
        className="lg:hidden fixed bottom-6 right-6 z-20 flex items-center justify-center p-4 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition-colors"
      >
        <FiFilter size={20} />
      </button>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8 relative">
          {/* Filter Section - Mobile Overlay */}
          {isMobileFiltersOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
              onClick={() => setIsMobileFiltersOpen(false)}
            />
          )}

          {/* Filter Section */}
          <div
            className={`w-full lg:w-72 bg-white p-6 shadow-sm rounded-xl border border-gray-200 sticky top-6 h-fit transition-all duration-300 z-40 ${isMobileFiltersOpen
                ? 'fixed inset-0 m-4 overflow-y-auto'
                : 'hidden lg:block'
              }`}
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
              {isMobileFiltersOpen && (
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              )}
            </div>
            <FilterCard filterOptions={{
              "Job Type": [...new Set(allJobs.map(job => job.jobType).filter(Boolean))],
              "Job Mode": [...new Set(allJobs.map(job => job.jobMode).filter(Boolean))],
              Salary: generateSalaryRanges(allJobs.map(job => job.salary).filter(Boolean)),
              Location: displayLocations,
              "Salary Type": [...new Set(allJobs.map(job => job.stipendType).filter(Boolean))]
            }} />
          </div>

          {/* Job Listings */}
          <div className="flex-1">
            {/* Search Summary */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-200 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">Job Opportunities</h1>
                  <p className="text-gray-600 mt-1">
                    {filteredJobs.length} {filteredJobs.length === 1 ? 'job' : 'jobs'} found
                  </p>
                </div>
                <div className="flex items-center text-sm text-gray-500 bg-gray-50 px-3 py-2 rounded-lg">
                  <FiBriefcase className="text-blue-500 mr-2" />
                  <span>Search: {typeof searchedQuery === 'string' ? searchedQuery : JSON.stringify(searchedQuery) || 'All jobs'}</span>
                </div>
              </div>
            </div>

            {/* Loading State */}
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white p-5 rounded-xl shadow-sm border border-gray-200">
                    <Skeleton height={24} width="70%" className="mb-4" />
                    <Skeleton height={20} width="50%" className="mb-3" />
                    <Skeleton height={16} count={3} className="mb-2" />
                    <Skeleton height={40} width="100%" className="mt-4" />
                  </div>
                ))}
              </div>
            ) : filteredJobs.length === 0 ? (
              <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200 text-center">
                <div className="mx-auto w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <FiSearch className="text-gray-400 text-2xl" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">No Jobs Found</h3>
                <p className="text-gray-600 max-w-md mx-auto mb-6">
                  We couldn't find any jobs matching your criteria. Try adjusting your search or filters.
                </p>
                <button
                  onClick={() => {
                    // Reset search/filters logic here
                  }}
                  className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredJobs.map((job) => (
                  <div
                    key={job._id}
                    className="p-5 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                  >
                    <Job job={job} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
