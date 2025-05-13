# My App - Job Portal Frontend

## Project Description
This is the frontend application for a job portal built using React and Vite. It provides a responsive and interactive user interface for job seekers and administrators. Users can browse jobs, view job details, apply for jobs, and manage their profiles. Administrators have access to protected routes for managing companies, jobs, applicants, and profiles.

## Technologies Used
- React 19
- Vite (build tool)
- Redux Toolkit for state management
- Redux Persist for state persistence
- React Router DOM for routing
- TailwindCSS for styling
- Radix UI components for accessible UI primitives
- Sonner for notifications
- Axios for HTTP requests
- Framer Motion for animations

## Installation
1. Clone the repository
2. Navigate to the `my-app` directory
3. Install dependencies:
   ```bash
   npm install
   ```

## Running the Development Server
Start the development server with hot module replacement:
```bash
npm run dev
```
The app will be available at `http://localhost:3000` (or the port shown in the terminal).

## Building for Production
To build the app for production deployment:
```bash
npm run build
```
The optimized build will be output to the `dist` directory.

To preview the production build locally:
```bash
npm run preview
```

## Project Structure Overview
- `src/` - Source code directory
  - `components/` - React components organized by feature and shared UI components
  - `redux/` - Redux slices and store configuration
  - `hooks/` - Custom React hooks
  - `utils/` - Utility functions and constants
  - `App.jsx` - Main app component with routing setup
  - `main.jsx` - React app entry point, Redux provider, and persistence setup
- `public/` - Static assets
- `package.json` - Project metadata and scripts
- `vite.config.js` - Vite configuration

## Routing Overview
The app uses `react-router-dom` with the following routes:
- Public routes:
  - `/` - Home page
  - `/login` - User login
  - `/signup` - User signup
  - `/jobs` - Job listings
  - `/description/:id` - Job description details
  - `/browse` - Browse jobs
  - `/profile` - User profile
- Admin routes (protected):
  - `/admin/profile` - Admin profile pages
  - `/admin/companies` - Manage companies
  - `/admin/jobs` - Manage jobs and applicants
  - Other admin-specific routes for creating, updating, and viewing entities

## State Management
- Uses Redux Toolkit for global state management
- Redux Persist is configured to persist the Redux store across sessions
- User authentication state is stored and restored from localStorage

## Admin Features and Protected Routes
- Admin routes are protected using a `ProtectedRoute` component that restricts access to authenticated admin users
- Admin can manage companies, jobs, applicants, and profiles through dedicated components and routes

## Linting
- ESLint is configured with React-specific rules
- Run linting with:
  ```bash
  npm run lint
  ```

## Additional Notes
- Notifications are handled using the Sonner library with a Toaster component included globally
- TailwindCSS is used for styling with utility-first CSS classes
- The app supports animations using Framer Motion

## License
Specify your project license here (e.g., MIT License)
