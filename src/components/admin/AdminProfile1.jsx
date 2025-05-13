import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../shared/Navbar";
import { Loader2, CheckCircle, Smartphone, User, Mail, Briefcase } from "lucide-react";
import { DialogFooter } from "../ui/dialog";
import axios from "axios";
import { toast } from "sonner";
import { USER_API_END_POINT } from "@/utils/constant";
import { setUser } from "@/redux/authSlice";
import CompanyCreate from "./CompanyCreate";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "../ui/card";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";

const AdminProfile1 = () => {
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const [input, setInput] = useState({
    firstName: user?.firstname || "",
    lastName: user?.lastname || "",
    email: user?.email || "",
    designation: user?.designation || "",
    mobile: user?.phoneNumber || "",
  });

  const dispatch = useDispatch();
  const [isVerified, setIsVerified] = useState(false);

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const handleVerify = () => {
    toast.success("Mobile number verified successfully");
    setIsVerified(true);
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("designation", input.designation);

    try {
      setLoading(true);
      const res = await axios.post(`${USER_API_END_POINT}/profile/update`, formData, {
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.user));
        toast.success("Profile updated successfully");
        setSubmitted(true);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex flex-col">
      <Navbar />
      
      {/* Header and Progress Indicator */}
      <div className="px-4 sm:px-6 lg:px-8 pt-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-6">Company Profile Setup</h1>
          
          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex items-center">
              <div className="flex-1 h-1 bg-gray-200 rounded-full">
                <div className={`h-1 bg-blue-600 rounded-full ${submitted ? "w-full" : "w-1/3"}`}></div>
              </div>
              <span className="ml-4 text-sm font-medium text-gray-700">
                {submitted ? "Step 2 of 2" : "Step 1 of 3"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {!submitted ? (
        <motion.div
          className="flex-grow flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Card className="w-full max-w-md shadow-lg rounded-xl overflow-hidden">
            <CardHeader className="border-b border-gray-200 bg-gradient-to-r from-blue-50 to-blue-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <User className="h-6 w-6 text-blue-600" />
                  <div>
                    <CardTitle className="text-xl font-semibold text-gray-900">
                      Personal Information
                    </CardTitle>
                    <CardDescription className="text-sm text-gray-600">
                      Complete your personal details
                    </CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className="bg-white">
                  Step 1
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={submitHandler} className="space-y-4">
                <div className="space-y-4">
                  {[
                    { label: "First Name", name: "firstName", icon: User, disabled: true },
                    { label: "Last Name", name: "lastName", icon: User, disabled: true },
                    { label: "Email", name: "email", icon: Mail, type: "email", disabled: true }
                  ].map((field) => (
                    <div key={field.name} className="space-y-1">
                      <label className="text-sm font-medium text-gray-700 flex items-center">
                        <field.icon className="h-4 w-4 mr-2 text-gray-500" />
                        {field.label}
                      </label>
                      <Input
                        type={field.type || "text"}
                        name={field.name}
                        value={input[field.name]}
                        disabled={field.disabled}
                        className={`${field.disabled ? "bg-gray-100" : "bg-white"}`}
                      />
                    </div>
                  ))}

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Briefcase className="h-4 w-4 mr-2 text-gray-500" />
                      Designation
                    </label>
                    <Input
                      type="text"
                      name="designation"
                      placeholder="E.g. HR Manager, Director"
                      value={input.designation}
                      onChange={changeEventHandler}
                      className="bg-white"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-gray-700 flex items-center">
                      <Smartphone className="h-4 w-4 mr-2 text-gray-500" />
                      Mobile Number
                    </label>
                    <div className="flex space-x-2">
                      <div className="flex-1 flex">
                        <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-100 text-gray-500 text-sm">
                          +91
                        </span>
                        <Input
                          type="text"
                          name="mobile"
                          value={input.mobile}
                          disabled
                          className="rounded-l-none bg-gray-100"
                        />
                      </div>
                      <Button
                        type="button"
                        onClick={handleVerify}
                        variant={isVerified ? "outline" : "default"}
                        className="whitespace-nowrap"
                      >
                        {isVerified ? (
                          <div className="flex items-center">
                            <CheckCircle className="h-4 w-4 mr-1 text-green-500" />
                            Verified
                          </div>
                        ) : (
                          "Verify"
                        )}
                      </Button>
                    </div>
                    {isVerified && (
                      <p className="text-xs text-green-600 mt-1 flex items-center">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Phone number verified successfully
                      </p>
                    )}
                  </div>
                </div>

                <DialogFooter className="pt-4">
                  <Button
                    type="submit"
                    disabled={loading || !isVerified}
                    className="w-full"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Continue to Organization Details"
                    )}
                  </Button>
                </DialogFooter>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      ) : (
        <CompanyCreate />
      )}
    </div>
  );
};

export default AdminProfile1;