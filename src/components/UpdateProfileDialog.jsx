import React, { useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

const UpdateProfileDialog = ({ open, setOpen }) => {
    const [loading, setLoading] = useState(false);
    const { user } = useSelector(store => store.auth);
        //

    const [input, setInput] = useState({
        firstname: user.firstname || '',
        lastname: user.lastname || '',
        email: user.email || '',
        phoneNumber: user.phoneNumber || '',
        bio: user.profile?.bio || '',
        skills: user.profile?.skills || '',
        pdf: null,
        video: null,
        pdfUrl: user.profile?.pdf || '',
        pdfOriginalName: user.profile?.pdfOriginalName || '',
        videoUrl: user.profile?.video || '',
        videoOriginalName: user.profile?.videoOriginalName || '',
    });
    const dispatch = useDispatch();

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    // const changeFileHandler = (e) => {
    //     const file = e.target.files?.[0];
    //     setInput({ ...input, file });
    // };
    const changeFileHandler = (e) => {
        const { name, files } = e.target;
        const file = files?.[0];
        if (!file) return;

        setInput(prev => ({
            ...prev,
            [name]: file
        }));
    };


    const submitHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("firstname", input.firstname);
        formData.append("lastname", input.lastname);
        formData.append("email", input.email);
        formData.append("phoneNumber", input.phoneNumber);
        formData.append("bio", input.bio);
        formData.append("skills", input.skills);
        if (input.pdf) formData.append("pdf", input.pdf); // Resume
        if (input.video) formData.append("video", input.video); // Intro video

        try {
            setLoading(true);
            const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                dispatch(setUser(res.data.user));
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Something went wrong.");
        } finally {
            setLoading(false);
        }

        setOpen(false);
        console.log(input);
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[450px] bg-white shadow-lg rounded-lg p-5 max-h-[500px] overflow-y-auto">
                    <DialogHeader className="text-center">
                        <DialogTitle className="text-lg font-semibold">Update Profile</DialogTitle>
                        <DialogDescription className="text-gray-500 text-xs">
                            Enter your details to update your profile.
                        </DialogDescription>
                    </DialogHeader>

                    <form onSubmit={submitHandler} className="space-y-3" method="POST" encType="multipart/form-data">
                        {[
                            { id: "firstname", label: "Firstname", type: "text" },
                            { id: "lastname", label: "Lastname", type: "text" },
                            { id: "email", label: "Email", type: "email" },
                            { id: "phoneNumber", label: "Phone", type: "text" },
                            { id: "skills", label: "Skills", type: "text" },
                        ].map(({ id, label, type }) => (
                            <div key={id} className="grid grid-cols-[auto,1fr] items-center gap-3">
                                <Label htmlFor={id} className="text-right text-sm">{label}</Label>
                                <Input id={id} name={id} type={type} value={input[id]} onChange={changeEventHandler} className="border border-gray-300 rounded px-2 py-1 w-full text-sm" />
                            </div>
                        ))}

                        {/* Bio Field */}
                        <div className="grid grid-cols-[auto,1fr] items-center gap-3">
                            <Label htmlFor="bio" className="text-right text-sm">Bio</Label>
                            <textarea id="bio" name="bio" value={input.bio} onChange={changeEventHandler} className="border border-gray-300 rounded px-2 py-1 w-full text-sm resize-none h-16" />
                        </div>

                        {/* Resume Upload */}
                        {/* <div className="grid grid-cols-[auto,1fr] items-center gap-3">
                            <Label htmlFor="resume" className="text-right text-sm">Resume</Label>
                            <Input id="file" name="file" type="file" onChange={changeFileHandler} accept="application/pdf" className="border border-gray-300 rounded px-2 py-1 w-full text-sm" />
                        </div> */}
                        {/* Resume Upload */}
                        <div className="grid grid-cols-[auto,1fr] items-start gap-3">
                            <Label htmlFor="pdf" className="text-right text-sm mt-2">Resume (PDF)</Label>
                            <div className="flex flex-col gap-1">
                                {input.pdfUrl && (
                                    <a
                                        href={input.pdfUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline text-sm"
                                    >
                                        {input.pdfOriginalName || "View Uploaded Resume"}
                                    </a>
                                )}
                                <Input
                                    id="pdf"
                                    name="pdf"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={changeFileHandler}
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                                />
                            </div>
                        </div>

                        {/* Video Upload */}
                        <div className="grid grid-cols-[auto,1fr] items-start gap-3 mt-3">
                            <Label htmlFor="video" className="text-right text-sm mt-2">Intro Video</Label>
                            <div className="flex flex-col gap-1">
                                {input.videoUrl && (
                                    <a
                                        href={input.videoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 underline text-sm"
                                    >
                                        {input.videoOriginalName || "View Uploaded Video"}
                                    </a>
                                )}
                                <Input
                                    id="video"
                                    name="video"
                                    type="file"
                                    accept="video/*"
                                    onChange={changeFileHandler}
                                    className="border border-gray-300 rounded px-2 py-1 w-full text-sm"
                                />
                            </div>
                        </div>

                        {/* Dialog Footer */}
                        <DialogFooter className="mt-3">
                            {loading ? (
                                <Button className="w-full bg-gray-500 text-white py-2 rounded-md flex items-center justify-center text-sm">
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please wait
                                </Button>
                            ) : (
                                <motion.button type="submit" className="w-full bg-blue-500 text-white py-2 rounded-md text-sm">
                                    Update
                                </motion.button>
                            )}
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>
        </motion.div>
    );
};

export default UpdateProfileDialog;
