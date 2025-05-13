import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './shared/Navbar';
import HeroSection from './HeroSection';
import CategoryCaousel from './CategoryCaousel';
import LatestJobs from './LatestJobs';
import Footer from './shared/Footer';
import useGetAllJobs from '@/hooks/useGetAllJobs';

const Home = () => {
  useGetAllJobs();
  const { user } = useSelector(store => store.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.role === 'recruiter') {
      navigate("/admin/profile");
    }
  }, [user, navigate]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-50 to-gray-100 min-h-screen flex flex-col"
    >
      {/* Navbar with subtle slide-down animation */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-50 shadow-sm bg-white/80 backdrop-blur-sm"
      >
        <Navbar />
      </motion.header>

      <main className="flex-1">
        {/* Hero Section with parallax effect */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative overflow-hidden"
        >
          <HeroSection />
        </motion.section>

        {/* Category Carousel with staggered animation */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="py-16 bg-white"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Explore <span className="text-blue-600">Categories</span>
            </h2>
            <CategoryCaousel />
          </div>
        </motion.section>

        {/* Latest Jobs Section with fade-in on scroll */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="py-16 bg-gray-50"
        >
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
              Latest <span className="text-blue-600">Opportunities</span>
            </h2>
            <LatestJobs />
          </div>
        </motion.section>
      </main>

      {/* Footer with smooth entrance */}
      <motion.footer
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="bg-gray-900"
      >
        <Footer />
      </motion.footer>
    </motion.div>
  );
};

export default Home;