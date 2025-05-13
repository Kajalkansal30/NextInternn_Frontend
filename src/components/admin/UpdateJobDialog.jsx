import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { Label } from '@radix-ui/react-label';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import{setUser} from '@/redux/authSlice';
import Navbar from '../shared/Navbar';
import axios from 'axios';
import { JOB_API_END_POINT } from '@/utils/constant';
import useGetJobById from '@/hooks/useGetJobById';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateJobDialog = () => {
    const params = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { singleJob, loading, error } = useSelector(store => store.job);

    useGetJobById(params.id);

    const [input, setInput] = useState({
        title: '',
        description: '',
        skills: '',
        duration: '',
        jobMode: '',
        noOfOpening: '',
        jobType: '',
        startDate: '',
        location: '',
        responsibilities: '',
        requirements: '',
        salary: '',
        ppOffer: '',
        stipendType: '',
        perks: '',
        availability: '',
        questions: '',
        alternateMobileNo: '',
    });

    useEffect(() => {
        if (singleJob) {
            setInput({
                title: singleJob.title || '',
                description: singleJob.description || '',
                skills: singleJob.skills || '',
                duration: singleJob.duration || '',
                jobMode: singleJob.jobMode || '',
                noOfOpening: singleJob.noOfOpening || '',
                jobType: singleJob.jobType || '',
                startDate: singleJob.startDate?.substring(0, 10) || '',
                location: singleJob.location || '',
                responsibilities: singleJob.responsibilities || '',
                requirements: singleJob.requirements || '',
                salary: singleJob.salary || '',
                ppOffer: singleJob.ppOffer || '',
                stipendType: singleJob.stipendType || '',
                perks: singleJob.perks || '',
                availability: singleJob.availability || '',
                questions: singleJob.questions || '',
                alternateMobileNo: singleJob.alternateMobileNo || '',
            });
        }
    }, [singleJob]);

    const handleChange = (e) => {
        setInput(prev => ({
            ...prev,
            [e.target.name]: e.target.value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Send JSON body instead of FormData
            const res = await axios.put(`${JOB_API_END_POINT}/update/${params.id}`, input, {
                withCredentials: true,
            });

            if (res.data.success) {
                dispatch(setUser(res.data.message));
                toast.success(res.data.message);
                navigate("/admin/jobs");
            }
        } catch (err) {
            toast.error(err?.response?.data?.message || 'Something went wrong!');
            console.error(err);
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <Loader2 className="animate-spin h-8 w-8 text-gray-500" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center mt-10 text-red-500">
                {error}
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full min-h-screen bg-gray-100">
            <Navbar />
            <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
                <h1 className="text-center text-2xl font-semibold mb-5">Update Internship</h1>
                <p className="text-center text-sm text-gray-500 mb-5">Edit the internship information and click update.</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                    {[
                        { id: 'title', label: 'Job Title' },
                        { id: 'description', label: 'Description', type: 'textarea' },
                        { id: 'skills', label: 'Skills Required' },
                        { id: 'duration', label: 'Duration' },
                        { id: 'jobMode', label: 'Job Mode (Remote/Onsite/Hybrid)' },
                        { id: 'noOfOpening', label: 'Number of Openings' },
                        { id: 'jobType', label: 'Job Type' },
                        { id: 'startDate', label: 'Start Date', type: 'date' },
                        { id: 'location', label: 'Location' },
                        { id: 'responsibilities', label: 'Responsibilities', type: 'textarea' },
                        { id: 'requirements', label: 'Requirements', type: 'textarea' },
                        { id: 'salary', label: 'Salary' },
                        { id: 'ppOffer', label: 'Pre-Placement Offer (Yes/No)' },
                        { id: 'stipendType', label: 'Stipend Type' },
                        { id: 'perks', label: 'Perks' },
                        { id: 'availability', label: 'Availability' },
                        { id: 'questions', label: 'Questions' },
                        { id: 'alternateMobileNo', label: 'Alternate Mobile No' },
                    ].map(({ id, label, type = 'text' }) => (
                        <div key={id} className="grid grid-cols-[auto,1fr] items-start gap-3">
                            <Label htmlFor={id} className="text-sm">{label}</Label>
                            {type === 'textarea' ? (
                                <textarea
                                    id={id}
                                    name={id}
                                    value={input[id]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm resize-none h-24"
                                />
                            ) : (
                                <Input
                                    id={id}
                                    name={id}
                                    type={type}
                                    value={input[id]}
                                    onChange={handleChange}
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                                />
                            )}
                        </div>
                    ))}

                    <div className="flex justify-center mt-5">
                        <Button className="w-full bg-blue-600 text-white py-2 rounded-md text-sm">
                            Update Job
                        </Button>
                    </div>
                </form>
            </div>
        </motion.div>
    );
};

export default UpdateJobDialog;
