import { createSlice } from "@reduxjs/toolkit";
const jobSlice = createSlice({
    name: "job",
    initialState: {
        allAdminJobs: [],
        allJobs: [],
        singleJob: null,
        searchText: "",          // New state for text search
        searchedQuery: {},       // Filter selections
        allAppliedJobs: [],
    },
    reducers: {
        setAllJobs: (state, action) => {
            state.allJobs = action.payload;
        },
        setSingleJob: (state, action) => {
            state.singleJob = action.payload;
        },
        setAllAdminJobs: (state, action) => {
            state.allAdminJobs = action.payload;
        },
        setSearchText: (state, action) => {
            state.searchText = action.payload;
        },
        setSearchedQuery: (state, action) => {
            state.searchedQuery = action.payload;
        },
        setAllAppliedJobs: (state, action) => {
            state.allAppliedJobs = action.payload;
        },
    }
});
export const { setAllJobs,
    setSingleJob,
    setAllAdminJobs,
    setSearchText,
    setAllAppliedJobs,
    setSearchedQuery } = jobSlice.actions;
export default jobSlice.reducer;
