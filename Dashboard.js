// pages/Dashboard.jsx or Dashboard.js

import React from 'react';
import { useNavigate } from 'react-router-dom';

// Helper functions
const isPersonalDetailsFilled = (user) => {
    return (
        user.firstName?.trim() &&
        user.lastName?.trim() &&
        user.email?.trim() &&
        user.phoneNumber?.trim() &&
        user.designation?.trim()
    );
};

const isCompanyCreated = (user) => {
    return user?.companyId?.trim();
};

const isCompanySetupCompleted = (company) => {
    return (
        company?.name?.trim() &&
        company?.description?.trim() &&
        company?.city?.trim() &&
        company?.industry?.trim() &&
        company?.employeeNumber?.trim()
    );
};

const isJobPostedCompleted = (job) => {
    return (
        job?.title?.trim() &&
        job?.description?.trim() &&
        job?.skills?.trim() &&
        job?.duration?.trim() &&
        job?.jobMode?.trim() &&
        job?.noOfOpening?.trim() &&
        job?.jobType?.trim() &&
        job?.startDate?.trim() &&
        job?.responsibilities?.trim() &&
        job?.requirements?.trim() &&
        job?.salary?.trim() &&
        job?.stipendType?.trim() &&
        job?.availability?.trim() &&
        job?.companyId?.trim() &&
        Array.isArray(job?.perks) && job.perks.length > 0 &&
        Array.isArray(job?.questions) && job.questions.length > 0
    );
};

function getNextPage(user, company, job) {
    if (!isPersonalDetailsFilled(user)) return "./AdminProfile1";
    if (!isCompanyCreated(user)) return "./CompanyCreate";
    if (!isCompanySetupCompleted(company)) return "./CompanySetup";
    if (!isJobPostedCompleted(job)) return "./PostJob";
    return "./AdminJobs";
}

// Component
const Dashboard = ({ user, company, job }) => {
    const navigate = useNavigate();

    const handleNext = () => {
        const nextPage = getNextPage(user, company, job);
        navigate(nextPage);
    };

    return (
        <div>
            <h1>Welcome, {user.firstName}</h1>
            <button onClick={handleNext}>Continue Setup</button>
        </div>
    );
};

export default Dashboard;
