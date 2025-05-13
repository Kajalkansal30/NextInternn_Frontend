import { useState } from 'react'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { setUser } from './redux/authSlice'
import { clearFilters } from './redux/filterSlice'
import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
import Login from './components/auth/Login'
import Signup from './components/auth/Signup'
import Home from './components/Home'
import Jobs from './components/Jobs'
import Browse from './components/Browse'
import Profile from './components/Profile'
import JobDescription from './components/JobDescription'
import Companies from './components/admin/Companies'
import CompanyCreate from './components/admin/CompanyCreate'
import CompanySetup from './components/admin/CompanySetup'
import AdminJobs from './components/admin/AdminJobs'
import PostJob from './components/admin/PostJob'
import Applicants from './components/admin/Applicants'
import JobSetup from './components/admin/JobSetUp.jsx'
import AdminProfile1 from './components/admin/AdminProfile1'
import AdminProfile3 from './components/admin/AdminProfile3'
import UpdateJobDialog from './components/admin/UpdateJobDialog'
import ProtectedRoute from './components/admin/ProtectedRoute';

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
    path: '/jobs',
    element: <Jobs />
  },
  {
    path: '/description/:id',
    element: <JobDescription />
  },
  {
    path: '/browse',
    element: <Browse />
  },
  {
    path: '/profile',
    element: <ProtectedRoute><Profile /></ProtectedRoute>
  },
  {
    path: "/admin/profile",
    element: <ProtectedRoute><AdminProfile1 /></ProtectedRoute>
  },
  {
    path: "/admin/profile/post",
    element: <ProtectedRoute><AdminProfile3 /></ProtectedRoute>
  },
  {
    path: "/admin/companies",
    element: <ProtectedRoute><Companies /></ProtectedRoute>
  },
  {
    path: "/admin/companies/create",
    element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
  },
  {
    path: "/admin/companies/:id",
    element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs",
    element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/create",
    element: <ProtectedRoute><PostJob /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/applicants",
    element: <ProtectedRoute><Applicants /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id",
    element: <ProtectedRoute><JobSetup /></ProtectedRoute>
  },
  {
    path: "/admin/jobs/:id/update",
    element: <ProtectedRoute><UpdateJobDialog /></ProtectedRoute>
  },
])

function App() {
  const dispatch = useDispatch()
  const [count, setCount] = useState(0)
  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("user"))
    if (currentUser) {
      dispatch(setUser(currentUser))
    }
    // Clear filters on page load (refresh)
    dispatch(clearFilters())
  }, [dispatch])

  return (
    <div className='w-screen'>
      <RouterProvider router={appRouter} />
    </div>
  )
};

export default App


// import { useState } from 'react'
// import { useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { setUser } from './redux/authSlice'
// import { createBrowserRouter, Route, RouterProvider } from 'react-router-dom'
// import Login from './components/auth/Login'
// import Signup from './components/auth/Signup'
// import Home from './components/Home'
// import Jobs from './components/Jobs'
// import Browse from './components/Browse'
// import Profile from './components/Profile'
// import JobDescription from './components/JobDescription'
// import Companies from './components/admin/Companies'
// import CompanyCreate from './components/admin/CompanyCreate'
// import CompanySetup from './components/admin/CompanySetup'
// import AdminJobs from './components/admin/AdminJobs'
// import PostJob from './components/admin/PostJob'
// import Applicants from './components/admin/Applicants'
// import JobSetup from './components/admin/JobSetUp.jsx'
// import AdminProfile1 from './components/admin/AdminProfile1'
// // import AdminProfile2 from './components/admin/AdminProfile2'
// import AdminProfile3 from './components/admin/AdminProfile3'
// import UpdateJobDialog from './components/admin/UpdateJobDialog'
// //import ProtectedRoute from './components/admin/ProtectedRoute'


// import ProtectedRoute from './components/admin/ProtectedRoute';

// const appRouter = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />
//   },
//   {
//     path: '/login',
//     element: <Login />
//   },
//   {
//     path: '/signup',
//     element: <Signup />
//   },
//   {
//     path: '/jobs',
//     element: <Jobs />
//   },
//   {
//     path: '/description/:id',
//     element: <JobDescription />
//   },
//   {
//     path: '/browse',
//     element: <Browse />
//   },
//   {
//     path: '/profile',
//     element: <ProtectedRoute><Profile /></ProtectedRoute>
//   },

//   //admin ke liye
//   {
//     path: "/admin/profile",
//     element: <ProtectedRoute><AdminProfile1 /></ProtectedRoute>
//   },
//   // {
//   //   path:"/admin/profile/organisation",
//   //   element:<ProtectedRoute><AdminProfile2/></ProtectedRoute>
//   // },
//   {
//     path: "/admin/profile/post",
//     element: <ProtectedRoute><AdminProfile3 /></ProtectedRoute>
//   },
//   {
//     path: "/admin/companies",
//     element: <ProtectedRoute><Companies /></ProtectedRoute>
//   },
//   {
//     path: "/admin/companies/create",
//     element: <ProtectedRoute><CompanyCreate /></ProtectedRoute>
//   },
//   {
//     path: "/admin/companies/:id",
//     element: <ProtectedRoute><CompanySetup /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs",
//     element: <ProtectedRoute><AdminJobs /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs/create",
//     element: <ProtectedRoute><PostJob /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs/:id/applicants",
//     element: <ProtectedRoute><Applicants /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs/:id",
//     element: <ProtectedRoute><JobSetup /></ProtectedRoute>
//   },
//   {
//     path: "/admin/jobs/:id/update",
//     element: <ProtectedRoute><UpdateJobDialog /></ProtectedRoute>
//   },
// ])

// function App() {
//   const dispatch = useDispatch()
//   const [count, setCount] = useState(0)
//   useEffect(() => {
//     const currentUser = JSON.parse(localStorage.getItem("user"))
//     if (currentUser) {
//       dispatch(setUser(currentUser))
//     }
//   }, [dispatch])

//   return (
//     <div className='w-screen'>
//       <RouterProvider router={appRouter} />
//     </div>

//   )
// };

// export default App

