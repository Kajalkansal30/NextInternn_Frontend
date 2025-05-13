import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { useNavigate } from "react-router-dom";

const PostInternshipJob = () => {
    const [position, setPosition] = useState("");
    const[description,setDescription]=useState("");
    const [skills, setSkills] = useState("");
    const [internshipType, setInternshipType] = useState("");
    const [internshipMode, setInternshipMode] = useState(""); // Added internship mode
    const [openings, setOpenings] = useState("");
    const [startDate, setStartDate] = useState("");
    const [duration, setDuration] = useState("");
    const [responsibilities, setResponsibilities] = useState("");
    const [candidatePreferences, setCandidatePreferences] = useState("");
    const [stipendType, setStipendType] = useState("");
    const [stipendMin, setStipendMin] = useState("");
    const [stipendMax, setStipendMax] = useState("");
    const [perks, setPerks] = useState([]);
    const [ppOffer, setPpOffer] = useState(false);
    const [availability, setAvailability] = useState(""); // Screening Question: Availability
    const [contactNumber, setContactNumber] = useState(""); // Alternate Contact Number
    const [questions, setQuestions] = useState([""]);

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!position || !skills||!description || !internshipType || !internshipMode || !openings || !startDate || !duration) {
            alert("Please fill in all required fields.");
            return;
        }
        alert("Internship/Job posted successfully!");
    };
    const handleQuestionChange = (index, value) => {
        const newQuestions = [...questions];
        newQuestions[index] = value;
        setQuestions(newQuestions);
    };

    const addQuestionField = () => {
        setQuestions([...questions, ""]);
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <Navbar />
            {/* Stepper Navigation */}
            <div className="flex justify-center items-center my-6">
                {[
                    { label: "Personal Details", route: "/personal-details", active: false },
                    { label: "Organization Details", route: "/organization-details", active: false },
                    { label: "Post Internship/Job", route: "/post-internship", active: true },
                ].map((step, index) => (
                    <div
                        key={index}
                        className={`flex items-center cursor-pointer ${step.active ? "text-blue-600" : "text-gray-500"}`}
                        onClick={() => navigate("/admin/profile")}
                    >
                        <div className={`w-8 h-8 flex items-center justify-center rounded-full border-2 ${step.active ? "border-blue-600 bg-blue-100" : "border-gray-400"}`}>
                            {index + 1}
                        </div>
                        <span className="ml-2 font-medium text-lg">{step.label}</span>
                        {index < 2 && <div className="w-12 border-t-2 mx-2 border-gray-300"></div>}
                    </div>
                ))}
            </div>

            <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Post Internship</h2>

                {/* Position Title */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Position Title</label>
                    <input
                        type="text"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
                {/* Position Description */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Position Description</label>
                    <input
                        type="text"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Required Skills */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Skills Required</label>
                    <input
                        type="text"
                        value={skills}
                        onChange={(e) => setSkills(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Internship Type */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Internship Type</label>
                    <select
                        value={internshipType}
                        onChange={(e) => setInternshipType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Internship Type</option>
                        <option value="Full-time">Full-time</option>
                        <option value="Part-time">Part-time</option>
                    </select>
                </div>

                {/* Internship Mode */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Internship Mode</label>
                    <select
                        value={internshipMode}
                        onChange={(e) => setInternshipMode(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Internship Mode</option>
                        <option value="Remote">Remote</option>
                        <option value="Hybrid">Hybrid</option>
                        <option value="In-office">In-office</option>
                    </select>
                </div>

                {/* Number of Openings */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Number of Openings</label>
                    <input
                        type="number"
                        value={openings}
                        onChange={(e) => setOpenings(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Internship Start Date */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Internship Start Date</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Internship Duration */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Internship Duration</label>
                    <input
                        type="text"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Responsibilities */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Intern's Responsibilities</label>
                    <textarea
                        value={responsibilities}
                        onChange={(e) => setResponsibilities(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Candidate Preferences */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Candidate Preferences</label>
                    <textarea
                        value={candidatePreferences}
                        onChange={(e) => setCandidatePreferences(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Stipend Details */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Stipend</label>
                    <select
                        value={stipendType}
                        onChange={(e) => setStipendType(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Stipend Type</option>
                        <option value="Paid">Paid</option>
                        <option value="Unpaid">Unpaid</option>
                    </select>
                </div>

                {/* Stipend Range */}
                {stipendType === "Paid" && (
                    <div className="flex mb-6">
                        <div className="w-1/2 pr-2">
                            <label className="block text-lg font-medium text-gray-700">Min Stipend</label>
                            <input
                                type="number"
                                value={stipendMin}
                                onChange={(e) => setStipendMin(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                        <div className="w-1/2 pl-2">
                            <label className="block text-lg font-medium text-gray-700">Max Stipend</label>
                            <input
                                type="number"
                                value={stipendMax}
                                onChange={(e) => setStipendMax(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                required
                            />
                        </div>
                    </div>
                )}

                {/* Perks */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Perks</label>
                    <div className="flex flex-wrap gap-3">
                        {["Certificate", "Letter of Recommendation", "Flexible Work Hours", "5 Days a Week", "Informal Dress Code", "Free Snacks & Beverages"].map((perk) => (
                            <label key={perk} className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    checked={perks.includes(perk)}
                                    onChange={() => {
                                        if (perks.includes(perk)) {
                                            setPerks(perks.filter((item) => item !== perk));
                                        } else {
                                            setPerks([...perks, perk]);
                                        }
                                    }}
                                    className="form-checkbox h-5 w-5 text-blue-600"
                                />
                                <span className="text-gray-700">{perk}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Pre-placement Offer */}
                <div className="mb-6">
                    <label className="flex items-center gap-3">
                        <input
                            type="checkbox"
                            checked={ppOffer}
                            onChange={() => setPpOffer(!ppOffer)}
                            className="form-checkbox h-5 w-5 text-blue-600"
                        />
                        <span className="text-gray-700">This internship comes with a pre-placement offer (PPO)</span>
                    </label>
                </div>

                {/* Screening Questions: Availability */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Availability</label>
                    <input
                        type="text"
                        value={availability}
                        onChange={(e) => setAvailability(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>
           

            <div className="max-w-3xl mx-auto p-8 bg-white shadow-lg rounded-xl border border-gray-200">
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Post Internship</h2>

                {/* ... (rest of the form fields) ... */}

                {/* Screening Questions */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Screening Questions</label>
                    {questions.map((question, index) => (
                        <div key={index} className="mb-4">
                            <input
                                type="text"
                                value={question}
                                onChange={(e) => handleQuestionChange(index, e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                                placeholder={`Question ${index + 1}`}
                            />
                        </div>
                    ))}
                    <button
                        type="button"
                        onClick={addQuestionField}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                    >
                        Add Question
                    </button>
                </div>

                {/* Alternate Contact Number */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Alternate Mobile Number</label>
                    <input
                        type="text"
                        value={contactNumber}
                        onChange={(e) => setContactNumber(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>


                {/* Submit Buttons */}
                <div className="flex justify-between">
                    <button
                        onClick={handleSubmit}
                        className="w-1/2 bg-gray-400 text-white py-3 rounded-md hover:bg-gray-500 transition-all duration-200 focus:ring-2 focus:ring-gray-300 mr-2"
                    >
                        Save Draft
                    </button>
                    <button
                        onClick={handleSubmit}
                        className="w-1/2 bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500 ml-2"
                    >
                        Post Internship
                    </button>
                </div>
            </div>
        </div>
        </div>
    );
};

export default PostInternshipJob;

//postJob
// import React, { useState } from 'react';
// import Navbar from '../shared/Navbar';
// import { Label } from '../ui/label';
// import { Input } from '../ui/input';
// import { useSelector } from 'react-redux';
// import store from '@/redux/store';
// import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { JOB_API_END_POINT } from '@/utils/constant';
// import { toast } from 'sonner';
// import { Loader2, ArrowLeft } from 'lucide-react';
// import { motion } from 'framer-motion';

// const formVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
// };

// const PostJob = () => {
//   const [input, setInput] = useState({
//     title: '',
//     description: '',
//     requirements: '',
//     salary: '',
//     location: '',
//     jobType: '',
//     experience: '',
//     position: 0,
//     companyId: '',
//   });

//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();
//   const { companies } = useSelector((store) => store.company);

//   const changeEventHandler = (e) => {
//     setInput({ ...input, [e.target.name]: e.target.value });
//   };

//   const selectChangeHandler = (value) => {
//     const selectedCompany = companies.find((company) => company.name.toLowerCase() === value);
//     setInput({ ...input, companyId: selectedCompany._id });
//   };

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     try {
//       setLoading(true);
//       const res = await axios.post(`${JOB_API_END_POINT}/post`, input, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true,
//       });
//       if (res.data.success) {
//         toast.success(res.data.message);
//         navigate('/admin/jobs');
//       }
//     } catch (error) {
//       toast.error(error.response.data.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="w-screen min-h-screen flex flex-col items-center bg-gray-100">
//       <Navbar className="w-full shadow-md bg-white py-4" />

//       <motion.div
//         variants={formVariants}
//         initial="hidden"
//         animate="visible"
//         className="w-full max-w-3xl bg-white shadow-lg rounded-xl p-8 mt-10"
//       >
//         <div className="flex items-center gap-4 mb-6">
//           <motion.button
//             whileHover={{ scale: 1.05 }}
//             whileTap={{ scale: 0.95 }}
//             onClick={() => navigate('/admin/jobs')}
//             className="flex items-center gap-2 text-gray-500 font-semibold hover:text-gray-700 transition-all"
//           >
//             <ArrowLeft />
//             <span>Back</span>
//           </motion.button>
//           <h3 className="font-bold text-2xl text-gray-900 text-center">Post a New Internship</h3>
//         </div>

//         <form onSubmit={submitHandler} className="space-y-6">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <Label className="text-gray-700">Title</Label>
//               <Input type="text" name="title" value={input.title} onChange={changeEventHandler} className="mt-1" />
//             </div>

//             <div>
//               <Label className="text-gray-700">Description</Label>
//               <Input type="text" name="description" value={input.description} onChange={changeEventHandler} className="mt-1" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <Label className="text-gray-700">Requirements</Label>
//               <Input type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} className="mt-1" />
//             </div>

//             <div>
//               <Label className="text-gray-700">Salary</Label>
//               <Input type="text" name="salary" value={input.salary} onChange={changeEventHandler} className="mt-1" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <Label className="text-gray-700">Location</Label>
//               <Input type="text" name="location" value={input.location} onChange={changeEventHandler} className="mt-1" />
//             </div>

//             <div>
//               <Label className="text-gray-700">Job Type</Label>
//               <Input type="text" name="jobType" value={input.jobType} onChange={changeEventHandler} className="mt-1" />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className='flex flex-col'>
//               <Label className="text-gray-700">Experience Level</Label>
//               <Input type="text" name="experience" value={input.experience} onChange={changeEventHandler} className="mt-1" />
//             </div>

//             <div className='flex flex-col'>
//               <Label className="text-gray-700">No. of Positions</Label>
//               <Input type="number" name="position" value={input.position} onChange={changeEventHandler} className="mt-1" />
//             </div>
//           </div>

//           {companies.length > 0 && (
//             <div>
//               <Label className="text-gray-700">Select Company</Label>
//               <Select onValueChange={selectChangeHandler}>
//                 <SelectTrigger className="w-full mt-2 bg-white border border-gray-300 rounded-md">
//                   <SelectValue placeholder="Select a Company"  />
//                   {/* <SelectValue placeholder="Select a Company" /> */}
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectGroup>
//                     {companies.map((company) => (
//                       <SelectItem key={company.name} value={company?.name?.toLowerCase()}>
//                         {company.name}
//                       </SelectItem>
//                     ))}
//                   </SelectGroup>
//                 </SelectContent>
//               </Select>
//             </div>
//           )}

//           <motion.button type="submit" className="w-full py-3 rounded-lg bg-[#5ce1e6] hover:bg-[#49b8bf] transition-all text-white">
//             {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Post New Internship'}
//           </motion.button>

//           {companies.length === 0 && <p className="text-red-600 font-bold text-center">*Please register a company first before posting an internship.</p>}
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default PostJob;