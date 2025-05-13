import { setSingleJob } from '../redux/jobSlice';
import { JOB_API_END_POINT } from '../utils/constant';
import axios from 'axios';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const useGetJobById = (jobId) => {
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
                console.log(res.data.job);
                if (res.data.success) {
                    dispatch(setSingleJob(res.data.job));
                }
            } catch (error) {
                console.error(error);
            }
        };

        if (jobId) {
            fetchSingleJob();
        }
    }, [jobId, dispatch]);
};

export default useGetJobById;


// hooks/useGetJobById.js

// import { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import axios from 'axios';
// import { setSingleJob } from '@/redux/jobSlice';
// import { JOB_API_END_POINT } from '@/utils/constant';

// const useGetJobById = (jobId) => {
//     const dispatch = useDispatch();
//     const job = useSelector((state) => state.job.singleJob); // Get job from Redux

//     useEffect(() => {
//         const fetchSingleJob = async () => {
//             try {
//                 const res = await axios.get(`${JOB_API_END_POINT}/get/${jobId}`, { withCredentials: true });
//                 if (res.data.success) {
//                     dispatch(setSingleJob(res.data.job));
//                 }
//             } catch (error) {
//                 console.error(error);
//             }
//         };

//         if (jobId) {
//             fetchSingleJob();
//         }
//     }, [jobId, dispatch]);

//     return { job }; // ✅ Return job data
// };

// export default useGetJobById;
