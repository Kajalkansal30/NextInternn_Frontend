import React, { useState } from "react";
import Navbar from "../shared/Navbar";

const AdminProfile2 = () => {
    const [organizationName, setOrganizationName] = useState("");
    const [description, setDescription] = useState("");
    const [city, setCity] = useState("");
    const [industry, setIndustry] = useState("");
    const [employees, setEmployees] = useState("");
    const [logo, setLogo] = useState(null);
    const [documents, setDocuments] = useState(null);
    const [isFreelancer, setIsFreelancer] = useState(false);
    const [noDocuments, setNoDocuments] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!organizationName || !description || !city || !industry || !employees) {
            alert("Please fill in all required fields.");
            return;
        }
        if (!noDocuments && !documents) {
            alert("Please upload a verification document or check the 'No Documents' option.");
            return;
        }
        alert("Form submitted successfully!");
    };

    return (
        <div className="flex flex-col justify-center items-center">
            <Navbar />
            <div className="flex justify-center items-center my-6">
                {[
                    { label: "Personal Details", route: "/personal-details", active: false },
                    { label: "Organization Details", route: "/organization-details", active: true },
                    { label: "Post Internship/Job", route: "/post-internship", active: false },
                ].map((step, index) => (
                    <div
                        key={index}
                        className={`flex items-center cursor-pointer ${step.active ? "text-blue-600" : "text-gray-500"}`}
                        onClick={() => navigate(step.route)}
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
                <h2 className="text-3xl font-semibold mb-6 text-gray-800">Organization Details</h2>

                {/* Independent Practitioner Checkbox */}
                <label className="flex items-center gap-3 mb-6">
                    <input
                        type="checkbox"
                        checked={isFreelancer}
                        onChange={() => setIsFreelancer(!isFreelancer)}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">I am an independent practitioner (freelancer, architect, lawyer, etc.)</span>
                </label>

                {/* Organization Name */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Organization Name</label>
                    <input
                        type="text"
                        value={organizationName}
                        onChange={(e) => setOrganizationName(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Organization Description */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Organization Description</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Organization City */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Organization City</label>
                    <input
                        type="text"
                        placeholder="e.g. Mumbai"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Industry Selection */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Industry</label>
                    <select
                        value={industry}
                        onChange={(e) => setIndustry(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select industry</option>
                        <option value="IT">IT</option>
                        <option value="Healthcare">Healthcare</option>
                        <option value="Finance">Finance</option>
                        <option value="Education">Education</option>
                    </select>
                </div>

                {/* Number of Employees */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">No. of Employees</label>
                    <select
                        value={employees}
                        onChange={(e) => setEmployees(e.target.value)}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select an option</option>
                        <option value="1-10">1-10</option>
                        <option value="11-50">11-50</option>
                        <option value="51-200">51-200</option>
                        <option value="200+">200+</option>
                    </select>
                </div>

                {/* Organization Logo Upload */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Organization Logo (Recommended)</label>
                    <input
                        type="file"
                        accept="image/jpeg, image/jpg, image/png, image/gif, image/bmp"
                        onChange={(e) => setLogo(e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                    />
                    <small className="text-gray-500">Max file size: 1MB, Max resolution: 500x500</small>
                </div>

                {/* Organization Verification */}
                <h3 className="text-2xl font-semibold mt-8 mb-4 text-gray-800">Organization Verification</h3>
                <p className="text-gray-600 mb-4">
                    Get your organization verified by submitting a government-issued business registration document.
                </p>

                {/* Official Documents Upload */}
                <div className="mb-6">
                    <label className="block text-lg font-medium text-gray-700">Upload Official Document</label>
                    <input
                        type="file"
                        accept="application/pdf, image/jpeg, image/png"
                        onChange={(e) => setDocuments(e.target.files[0])}
                        className="w-full p-3 border border-gray-300 rounded-md shadow-sm"
                        disabled={noDocuments}
                    />
                </div>

                {/* View Accepted Documents Link */}
                <p className="text-blue-600 hover:underline cursor-pointer mb-6">
                    View the list of documents accepted by Internshala here
                </p>

                {/* No Documents Checkbox */}
                <label className="flex items-center gap-3 mb-6">
                    <input
                        type="checkbox"
                        checked={noDocuments}
                        onChange={() => {
                            setNoDocuments(!noDocuments);
                            if (!noDocuments) setDocuments(null);
                        }}
                        className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-700">I do not have the required documents</span>
                </label>

                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AdminProfile2;
