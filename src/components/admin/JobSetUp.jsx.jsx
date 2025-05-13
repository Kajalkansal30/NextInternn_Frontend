import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Input } from '../ui/input';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';
import store from '@/redux/store';
import useGetJobById from '@/hooks/useGetJobById';
import { motion } from "framer-motion";
import { Loader2, Plus, Minus } from "lucide-react";

// Reusable input field component with improved styling
const InputField = ({ label, name, value, onChange, type = "text", required = false, className = "" }) => (
  <div className={`mb-4 ${className}`}>
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    />
  </div>
);

// Reusable textarea component with improved styling
const TextAreaField = ({ label, name, value, onChange, placeholder, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={4}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    />
  </div>
);

// Reusable dropdown component with improved styling
const DropdownField = ({ label, name, value, onChange, options, required = false }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-700 mb-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
    >
      <option value="">Select an option</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

const JobSetup = () => {
  const params = useParams();
  useGetJobById(params.id);

  const { singleJob } = useSelector(store => store.job);

  const [input, setInput] = useState({
    title: '',
    description: '',
    skills: '',
    location: '',
    duration: '',
    jobMode: '',
    noOfOpening: '',
    jobType: '',
    startDate: '',
    responsibilities: '',
    requirements: '',
    salary: '',
    ppOffer: false,
    stipendType: '',
    perks: [],
    availability: '',
    questions: [],
    alternateMobileNo: '',
    companyId: '',
  });

  const [perks, setPerks] = useState([]);
  const [questions, setQuestions] = useState([""]);
  const [loading, setLoading] = useState(false);
  const [activeSection, setActiveSection] = useState('basic');
  const navigate = useNavigate();

  const changeEventHandler = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === 'checkbox' && name === 'ppOffer') {
      setInput({ ...input, [name]: checked });
    } else {
      setInput({ ...input, [name]: value });
    }
  };

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index] = value;
    setQuestions(newQuestions);
  };

  const addQuestionField = () => {
    setQuestions([...questions, ""]);
  };

  const removeQuestionField = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      if (key === 'perks') {
        perks.forEach((perk, index) => {
          formData.append(`perks[${index}]`, perk);
        });
      } else if (key === 'questions') {
        questions.forEach((q, index) => {
          formData.append(`questions[${index}]`, q);
        });
      } else {
        formData.append(key, value);
      }
    });

    try {
      const res = await axios.put(
        `${JOB_API_END_POINT}/update/${params.id}`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          withCredentials: true
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setInput({
      title: singleJob.title || '',
      description: singleJob.description || '',
      skills: singleJob.skills || '',
      duration: singleJob.duration || '',
      jobMode: singleJob.jobMode || '',
      noOfOpening: singleJob.noOfOpening || '',
      jobType: singleJob.jobType || '',
      startDate: singleJob.startDate || '',
      location: singleJob.location || '',
      responsibilities: singleJob.responsibilities || '',
      requirements: singleJob.requirements || '',
      salary: singleJob.salary || '',
      ppOffer: singleJob.ppOffer || false,
      stipendType: singleJob.stipendType || '',
      perks: singleJob.perks || [],
      availability: singleJob.availability || '',
      questions: singleJob.questions || [],
      alternateMobileNo: singleJob.alternateMobileNo || '',
      companyId: singleJob.companyId || '',
    });

    setPerks(singleJob.perks || []);
    setQuestions(singleJob.questions?.length ? singleJob.questions : [""]);
  }, [singleJob]);

  // Form sections
  const formSections = [
    { id: 'basic', label: 'Basic Information' },
    { id: 'details', label: 'Position Details' },
    { id: 'benefits', label: 'Benefits & Perks' },
    { id: 'screening', label: 'Screening Questions' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar navigation */}
          <div className="md:w-1/4">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 sticky top-8">
              <h2 className="text-xl font-semibold mb-6 text-gray-800 border-b pb-2">Edit Internship</h2>
              <nav className="space-y-2">
                {formSections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full text-left px-4 py-2 rounded-lg transition-all ${activeSection === section.id ? 'bg-blue-50 text-blue-600 font-medium' : 'text-gray-600 hover:bg-gray-100'}`}
                  >
                    {section.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main form content */}
          <div className="md:w-3/4">
            <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b pb-2">
                {formSections.find(s => s.id === activeSection)?.label}
              </h2>
              
              <form onSubmit={submitHandler} className="space-y-6">
                {/* Basic Information Section */}
                {activeSection === 'basic' && (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField 
                        label="Position Title" 
                        name="title" 
                        value={input.title} 
                        onChange={changeEventHandler} 
                        required 
                      />
                      <DropdownField 
                        label="Internship Type" 
                        name="jobType" 
                        value={input.jobType} 
                        onChange={changeEventHandler} 
                        options={["Full-time", "Part-time"]} 
                        required 
                      />
                    </div>

                    <TextAreaField 
                      label="Position Description" 
                      name="description" 
                      value={input.description} 
                      onChange={changeEventHandler} 
                      placeholder="Describe the internship role, expectations, and learning opportunities" 
                      required 
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField 
                        label="Skills Required" 
                        name="skills" 
                        value={input.skills} 
                        onChange={changeEventHandler} 
                        placeholder="e.g. React, Python, Graphic Design"
                        required 
                      />
                      <InputField 
                        label="Location" 
                        name="location" 
                        value={input.location} 
                        onChange={changeEventHandler} 
                        placeholder="City or Remote"
                        required 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <DropdownField 
                        label="Internship Mode" 
                        name="jobMode" 
                        value={input.jobMode} 
                        onChange={changeEventHandler} 
                        options={["Remote", "Hybrid", "In-office"]} 
                        required 
                      />
                      <DropdownField 
                        label="Stipend Type" 
                        name="stipendType" 
                        value={input.stipendType} 
                        onChange={changeEventHandler} 
                        options={["Paid", "Unpaid"]} 
                        required 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField 
                        label="Number of Openings" 
                        name="noOfOpening" 
                        type="number" 
                        value={input.noOfOpening} 
                        onChange={changeEventHandler} 
                        required 
                      />
                      <InputField 
                        label="Internship Duration" 
                        name="duration" 
                        value={input.duration} 
                        onChange={changeEventHandler} 
                        placeholder="e.g. 3 months, 6 months"
                        required 
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField 
                        label="Internship Start Date" 
                        name="startDate" 
                        type="date" 
                        value={input.startDate} 
                        onChange={changeEventHandler} 
                        required 
                      />
                      <InputField 
                        label="Salary/Stipend" 
                        name="salary" 
                        value={input.salary} 
                        onChange={changeEventHandler} 
                        placeholder="e.g. $15/hr or ₹10,000/month"
                      />
                    </div>
                  </div>
                )}

                {/* Position Details Section */}
                {activeSection === 'details' && (
                  <div className="space-y-6">
                    <TextAreaField 
                      label="Key Responsibilities" 
                      name="responsibilities" 
                      value={input.responsibilities} 
                      onChange={changeEventHandler} 
                      placeholder="List the main tasks and responsibilities the intern will handle"
                      required 
                    />

                    <TextAreaField 
                      label="Requirements" 
                      name="requirements" 
                      value={input.requirements} 
                      onChange={changeEventHandler} 
                      placeholder="List the qualifications, skills, and experience required"
                      required 
                    />

                    <InputField 
                      label="Availability" 
                      name="availability" 
                      value={input.availability} 
                      onChange={changeEventHandler} 
                      placeholder="e.g. Immediate, 2 weeks notice"
                    />

                    <InputField 
                      label="Alternate Contact Number" 
                      name="alternateMobileNo" 
                      value={input.alternateMobileNo} 
                      onChange={changeEventHandler} 
                      type="tel"
                    />
                  </div>
                )}

                {/* Benefits & Perks Section */}
                {activeSection === 'benefits' && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Perks & Benefits</label>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {["Certificate", "Letter of Recommendation", "Flexible Work Hours", "5 Days a Week", "Informal Dress Code", "Free Snacks & Beverages", "Mentorship", "Networking Opportunities"].map((perk) => (
                          <label key={perk} className="flex items-center gap-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all">
                            <input
                              type="checkbox"
                              checked={perks.includes(perk)}
                              onChange={() => {
                                const newPerks = perks.includes(perk)
                                  ? perks.filter(p => p !== perk)
                                  : [...perks, perk];
                                setPerks(newPerks);
                              }}
                              className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                            />
                            <span className="text-gray-700">{perk}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg bg-gray-50">
                      <label className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          name="ppOffer"
                          checked={input.ppOffer}
                          onChange={changeEventHandler}
                          className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500 mt-1"
                        />
                        <div>
                          <span className="block text-sm font-medium text-gray-700">Pre-placement Offer (PPO)</span>
                          <p className="text-sm text-gray-500 mt-1">Check this box if this internship comes with a potential pre-placement offer for outstanding performers.</p>
                        </div>
                      </label>
                    </div>
                  </div>
                )}

                {/* Screening Questions Section */}
                {activeSection === 'screening' && (
                  <div className="space-y-6">
                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-700 mb-3">Screening Questions</label>
                      <p className="text-sm text-gray-500 mb-4">Add questions to help screen applicants (e.g., "Why are you interested in this position?")</p>
                      
                      <div className="space-y-3">
                        {questions.map((q, i) => (
                          <div key={i} className="flex items-center gap-3">
                            <input
                              type="text"
                              placeholder={`Question ${i + 1}`}
                              value={q}
                              onChange={(e) => handleQuestionChange(i, e.target.value)}
                              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                            />
                            {questions.length > 1 && (
                              <button
                                type="button"
                                onClick={() => removeQuestionField(i)}
                                className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-all"
                              >
                                <Minus size={18} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>

                      <button
                        type="button"
                        onClick={addQuestionField}
                        className="mt-3 flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-all"
                      >
                        <Plus size={16} />
                        Add another question
                      </button>
                    </div>
                  </div>
                )}

                {/* Navigation and submit buttons */}
                <div className="flex flex-col sm:flex-row justify-between gap-4 pt-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    {formSections.map((section, index) => (
                      <button
                        key={section.id}
                        type="button"
                        onClick={() => setActiveSection(section.id)}
                        className={`px-4 py-2 text-sm rounded-lg ${activeSection === section.id ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}
                      >
                        {index + 1}
                      </button>
                    ))}
                  </div>

                  <div className="flex gap-3">
                    {activeSection !== 'basic' && (
                      <button
                        type="button"
                        onClick={() => {
                          const currentIndex = formSections.findIndex(s => s.id === activeSection);
                          setActiveSection(formSections[currentIndex - 1].id);
                        }}
                        className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all"
                      >
                        Back
                      </button>
                    )}

                    {activeSection !== 'screening' ? (
                      <button
                        type="button"
                        onClick={() => {
                          const currentIndex = formSections.findIndex(s => s.id === activeSection);
                          setActiveSection(formSections[currentIndex + 1].id);
                        }}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
                      >
                        Next
                      </button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-all flex items-center justify-center min-w-[120px]"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                          </>
                        ) : (
                          "Update Internship"
                        )}
                      </motion.button>
                    )}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSetup;