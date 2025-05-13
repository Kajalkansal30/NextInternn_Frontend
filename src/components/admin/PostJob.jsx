// import React, { useState } from "react";
// import Navbar from "../shared/Navbar";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import axios from 'axios';
// import { toast } from "sonner";
// import { JOB_API_END_POINT } from "@/utils/constant";

// const PostJob = () => {
//   const [input, setInput] = useState({
//     title: '',
//     description: '',
//     skills: '',
//     location:'',
//     duration: '',
//     jobMode: '',
//     noOfOpening: '',
//     jobType: '',
//     startDate: '',
//     responsibilities: '',
//     requirements: '',
//     salary: '',
//     ppOffer: false,
//     stipendType: '',
//     perks: [],
//     availability: '',
//     questions: [],
//     alternateMobileNo: '',
//     companyId: '',
//   });

//   const [perks,setPerks] = useState([]);
//   const [questions,setQuestions] = useState([""]);

//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const { companies } = useSelector((store) => store.company);

//   const changeEventHandler = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (type === 'checkbox' && name === 'ppOffer') {
//       setInput({ ...input, [name]: checked });
//     } else {
//       setInput({ ...input, [name]: value });
//     }
//   };
//   // const changeEventHandler = (e) => {
//   //   setInput({ ...input, [e.target.name]: e.target.value });
//   //   if (type === 'checkbox' && name === 'ppOffer') {
//   //     setInput({ ...input, [name]: checked });
//   //   } else {
//   //     setInput({ ...input, [name]: value });
//   //   }
//   // };

//   const selectChangeHandler = (value) => {
//     const selectedCompany = companies.find((company) => company.name.toLowerCase() === value.toLowerCase());
//     if (selectedCompany) {
//       setInput({ ...input, companyId: selectedCompany._id });
//     }
//   };

//   const handleQuestionChange = (index, value) => {
//     const newQuestions = [...questions];
//     newQuestions[index] = value;
//     setQuestions(newQuestions);
//   };

//   const addQuestionField = () => {
//     setQuestions([...questions, ""]);
//   };
//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.post(`${JOB_API_END_POINT}/post`, {...input, perks: perks, questions: questions}, {
//         headers: {
//           'Content-Type': 'application/json'
//         },
//         withCredentials: true
//       });
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate("/admin/jobs");
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="flex flex-col justify-center items-center">
//       <Navbar />

//       <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
//         <h2 className="text-3xl font-semibold mb-6 text-gray-800">Post Internship</h2>
//         <form onSubmit={submitHandler} className="space-y-6">
//           <InputField label="Position Title" name="title" value={input.title} onChange={changeEventHandler} />
//           <TextAreaField
//             label="Position Description"
//             name="description"
//             value={input.description}
//             onChange={changeEventHandler}
//             placeholder="Describe the internship role, expectations, required skills, learning opportunities, etc."
//           />
//           <InputField label="Skills Required" name="skills" value={input.skills} onChange={changeEventHandler} />
//           <InputField label="Location" name="location" value={input.location} onChange={changeEventHandler} />
//           <DropdownField label="Internship Type" name="jobType" value={input.jobType} onChange={changeEventHandler} options={["Full-time", "Part-time"]} />
//           <DropdownField label="Internship Mode" name="jobMode" value={input.jobMode} onChange={changeEventHandler} options={["Remote", "Hybrid", "In-office"]} />
//           <DropdownField label="Stipend Type" name="stipendType" value={input.stipendType} onChange={changeEventHandler} options={["Paid", "Unpaid"]} />
//           <InputField label="Salary" name="salary" value={input.salary} onChange={changeEventHandler} />
//           <InputField label="Number of Openings" name="noOfOpening" value={input.noOfOpening} onChange={changeEventHandler} />
//           <InputField label="Internship Start Date" name="startDate" type="date" value={input.startDate} onChange={changeEventHandler} />
//           <InputField label="Internship Duration" name="duration" value={input.duration} onChange={changeEventHandler} />
//           <TextAreaField label="Responsibilities" name="responsibilities" value={input.responsibilities} onChange={changeEventHandler} placeholder="Describe the role" />
//           <TextAreaField label="Requirements" name="requirements" value={input.requirements} onChange={changeEventHandler} placeholder="Candidate expectations, etc." />
//           <InputField label="Availability" name="availability" value={input.availability} onChange={changeEventHandler} />
//           <InputField label="Alternate Mobile Number" name="alternateMobileNo" value={input.alternateMobileNo} onChange={changeEventHandler} />

//           {/* Perks */}
//           <div className="mb-6">
//             <label className="block text-lg font-medium text-gray-700 mb-2">Perks</label>
//             <div className="flex flex-wrap gap-3">
//               {["Certificate", "Letter of Recommendation", "Flexible Work Hours", "5 Days a Week", "Informal Dress Code", "Free Snacks & Beverages"].map((perk) => (
//                 <label key={perk} className="flex items-center gap-2">
//                   <input
//                     type="checkbox"
//                     checked={perks.includes(perk)}
//                     onChange={() => {
//                       setPerks(perks.includes(perk) ? perks.filter(p => p !== perk) : [...perks, perk]);
//                     }}
//                     className="form-checkbox h-5 w-5 text-blue-600"
//                   />
//                   <span className="text-gray-700">{perk}</span>
//                 </label>
//               ))}
//             </div>
//           </div>

//           {/* PPO */}
//           <div className="mb-6">
//             <label className="flex items-center gap-3">
//               <input
//                 type="checkbox"
//                 name="ppOffer"
//                 checked={input.ppOffer}
//                 onChange={changeEventHandler}
//                 className="form-checkbox h-5 w-5 text-blue-600"
//               />
//               <span className="text-gray-700">This internship comes with a pre-placement offer (PPO)</span>
//             </label>
//           </div>

//           {/* Questions */}
//           <div className="mb-6">
//             <label className="block text-lg font-medium text-gray-700 mb-2">Screening Questions</label>
//             {questions.map((q, i) => (
//               <input
//                 key={i}
//                 type="text"
//                 placeholder={`Question ${i + 1}`}
//                 value={q}
//                 onChange={(e) => handleQuestionChange(i, e.target.value)}
//                 className="w-full mb-2 p-3 border border-gray-300 rounded-md shadow-sm"
//               />
//             ))}
//             <button type="button" onClick={addQuestionField} className="text-blue-600 mt-2 hover:underline">
//               + Add another question
//             </button>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition duration-300"
//           >
//             {loading ? "Posting..." : "Post Internship"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// // Input Component
// const InputField = ({ label, name, value, onChange, type = "text" }) => (
//   <div className="mb-6">
//     <label className="block text-lg font-medium text-gray-700">{label}</label>
//     <input
//       type={type}
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//       required
//     />
//   </div>
// );

// // TextArea Component
// const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
//   <div className="mb-6">
//     <label className="block text-lg font-medium text-gray-700">{label}</label>
//     <textarea
//       name={name}
//       value={value}
//       onChange={onChange}
//       placeholder={placeholder}
//       rows={6}
//       className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//       required
//     />
//   </div>
// );

// // Dropdown Component
// const DropdownField = ({ label, name, value, onChange, options }) => (
//   <div className="mb-6">
//     <label className="block text-lg font-medium text-gray-700">{label}</label>
//     <select
//       name={name}
//       value={value}
//       onChange={onChange}
//       className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
//       required
//     >
//       <option value="">Select {label}</option>
//       {options.map((opt) => (
//         <option key={opt} value={opt}>{opt}</option>
//       ))}
//     </select>
//   </div>
// );


// export default PostJob;
import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from 'axios';
import { toast } from "sonner";
import { JOB_API_END_POINT } from "@/utils/constant";
import { Briefcase, Calendar, Clock, MapPin, DollarSign, Users, FileText, CheckCircle, Plus, Loader2 } from "lucide-react";

const PostJob = () => {
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
  const [activeSection, setActiveSection] = useState('basic');
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { companies } = useSelector((store) => store.company);

  const changeEventHandler = (e) => {
    const { name, value, type, checked } = e.target;
    setInput(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const selectChangeHandler = (value) => {
    const selectedCompany = companies.find((company) => company.name.toLowerCase() === value.toLowerCase());
    if (selectedCompany) {
      setInput({ ...input, companyId: selectedCompany._id });
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

  const togglePerk = (perk) => {
    setPerks(prev => 
      prev.includes(perk) 
        ? prev.filter(p => p !== perk) 
        : [...prev, perk]
    );
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post(
        `${JOB_API_END_POINT}/post`, 
        {...input, perks, questions}, 
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/admin/jobs");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const sections = [
    { id: 'basic', label: 'Basic Info', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'details', label: 'Details', icon: <FileText className="w-4 h-4" /> },
    { id: 'perks', label: 'Perks & Benefits', icon: <CheckCircle className="w-4 h-4" /> },
    { id: 'screening', label: 'Screening', icon: <Users className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 p-6 text-white">
            <h1 className="text-2xl font-bold">Post New Internship Opportunity</h1>
            <p className="text-blue-100">Fill in the details below to create a new internship posting</p>
          </div>

          {/* Progress Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex justify-center space-x-8">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-3 text-sm font-medium flex items-center gap-2 ${activeSection === section.id ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
                >
                  {section.icon}
                  {section.label}
                </button>
              ))}
            </nav>
          </div>

          <form onSubmit={submitHandler} className="p-6">
            {/* Basic Info Section */}
            {activeSection === 'basic' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Briefcase className="w-5 h-5" />
                  Basic Information
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    label="Position Title" 
                    name="title" 
                    value={input.title} 
                    onChange={changeEventHandler} 
                    icon={<Briefcase className="w-5 h-5 text-gray-400" />}
                  />
                  <InputField 
                    label="Location" 
                    name="location" 
                    value={input.location} 
                    onChange={changeEventHandler}
                    icon={<MapPin className="w-5 h-5 text-gray-400" />}
                  />
                  <InputField 
                    label="Internship Start Date" 
                    name="startDate" 
                    type="date" 
                    value={input.startDate} 
                    onChange={changeEventHandler}
                    icon={<Calendar className="w-5 h-5 text-gray-400" />}
                  />
                  <InputField 
                    label="Internship Duration" 
                    name="duration" 
                    value={input.duration} 
                    onChange={changeEventHandler}
                    icon={<Clock className="w-5 h-5 text-gray-400" />}
                  />
                  <DropdownField 
                    label="Internship Type" 
                    name="jobType" 
                    value={input.jobType} 
                    onChange={changeEventHandler} 
                    options={["Full-time", "Part-time"]} 
                  />
                  <DropdownField 
                    label="Internship Mode" 
                    name="jobMode" 
                    value={input.jobMode} 
                    onChange={changeEventHandler} 
                    options={["Remote", "Hybrid", "In-office"]} 
                  />
                  <DropdownField 
                    label="Stipend Type" 
                    name="stipendType" 
                    value={input.stipendType} 
                    onChange={changeEventHandler} 
                    options={["Paid", "Unpaid"]} 
                  />
                  <InputField 
                    label="Salary" 
                    name="salary" 
                    value={input.salary} 
                    onChange={changeEventHandler}
                    icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                  />
                </div>
                
                <TextAreaField 
                  label="Position Description" 
                  name="description" 
                  value={input.description} 
                  onChange={changeEventHandler} 
                  placeholder="Describe the internship role, expectations, required skills, learning opportunities, etc."
                />
              </div>
            )}

            {/* Details Section */}
            {activeSection === 'details' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  Position Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField 
                    label="Number of Openings" 
                    name="noOfOpening" 
                    value={input.noOfOpening} 
                    onChange={changeEventHandler}
                    icon={<Users className="w-5 h-5 text-gray-400" />}
                  />
                  <InputField 
                    label="Skills Required" 
                    name="skills" 
                    value={input.skills} 
                    onChange={changeEventHandler}
                    placeholder="Separate skills with commas"
                  />
                  <InputField 
                    label="Availability" 
                    name="availability" 
                    value={input.availability} 
                    onChange={changeEventHandler}
                  />
                  <InputField 
                    label="Alternate Contact Number" 
                    name="alternateMobileNo" 
                    value={input.alternateMobileNo} 
                    onChange={changeEventHandler}
                  />
                </div>
                
                <TextAreaField 
                  label="Responsibilities" 
                  name="responsibilities" 
                  value={input.responsibilities} 
                  onChange={changeEventHandler} 
                  placeholder="List the key responsibilities of the intern"
                />
                
                <TextAreaField 
                  label="Requirements" 
                  name="requirements" 
                  value={input.requirements} 
                  onChange={changeEventHandler} 
                  placeholder="Describe the qualifications and skills required"
                />
                
                <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
                  <input
                    type="checkbox"
                    name="ppOffer"
                    checked={input.ppOffer}
                    onChange={changeEventHandler}
                    className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
                  />
                  <label className="text-gray-700 font-medium">
                    This internship comes with a pre-placement offer (PPO)
                  </label>
                </div>
              </div>
            )}

            {/* Perks Section */}
            {activeSection === 'perks' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5" />
                  Perks & Benefits
                </h2>
                
                <p className="text-gray-600">Select the perks and benefits you're offering with this internship:</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {[
                    "Certificate", 
                    "Letter of Recommendation", 
                    "Flexible Work Hours",
                    "5 Days a Week",
                    "Informal Dress Code",
                    "Free Snacks & Beverages",
                    "Mentorship",
                    "Structured Training",
                    "Networking Opportunities",
                    "Transportation Allowance",
                    "Work From Home Options",
                    "Health Benefits"
                  ].map((perk) => (
                    <div 
                      key={perk} 
                      onClick={() => togglePerk(perk)}
                      className={`p-4 border rounded-lg cursor-pointer transition-all ${perks.includes(perk) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`flex items-center justify-center h-5 w-5 rounded border ${perks.includes(perk) ? 'bg-blue-500 border-blue-500' : 'bg-white border-gray-300'}`}>
                          {perks.includes(perk) && (
                            <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <span className="text-gray-700">{perk}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Screening Section */}
            {activeSection === 'screening' && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Screening Questions
                </h2>
                
                <p className="text-gray-600">Add custom questions to help screen applicants:</p>
                
                <div className="space-y-4">
                  {questions.map((q, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="bg-blue-100 text-blue-800 rounded-full h-8 w-8 flex items-center justify-center flex-shrink-0">
                        {i + 1}
                      </div>
                      <input
                        type="text"
                        placeholder={`Enter question ${i + 1}`}
                        value={q}
                        onChange={(e) => handleQuestionChange(i, e.target.value)}
                        className="flex-grow p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    onClick={addQuestionField}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 mt-4"
                  >
                    <Plus className="w-5 h-5" />
                    Add another question
                  </button>
                </div>
              </div>
            )}

            {/* Navigation and Submit */}
            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              {activeSection !== 'basic' ? (
                <button
                  type="button"
                  onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === activeSection) - 1].id)}
                  className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Previous
                </button>
              ) : (
                <div></div>
              )}
              
              {activeSection !== 'screening' ? (
                <button
                  type="button"
                  onClick={() => setActiveSection(sections[sections.findIndex(s => s.id === activeSection) + 1].id)}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-400 flex items-center gap-2"
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      Posting...
                    </>
                  ) : (
                    "Post Internship"
                  )}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

// Input Component
const InputField = ({ label, name, value, onChange, type = "text", placeholder, icon }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative rounded-md shadow-sm">
      {icon && (
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
      )}
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`block w-full ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
        required={type !== 'date'}
      />
    </div>
  </div>
);

// TextArea Component
const TextAreaField = ({ label, name, value, onChange, placeholder }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={4}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      required
    />
  </div>
);

// Dropdown Component
const DropdownField = ({ label, name, value, onChange, options }) => (
  <div>
    <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
    <select
      name={name}
      value={value}
      onChange={onChange}
      className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
      required
    >
      <option value="">Select {label}</option>
      {options.map((opt) => (
        <option key={opt} value={opt}>{opt}</option>
      ))}
    </select>
  </div>
);

export default PostJob;