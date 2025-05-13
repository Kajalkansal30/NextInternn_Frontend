import React from "react";
import { motion } from "framer-motion";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGithub } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  const socialLinks = [
    { icon: FaFacebook, url: "#", name: "Facebook" },
    { icon: FaTwitter, url: "#", name: "Twitter" },
    { icon: FaLinkedin, url: "#", name: "LinkedIn" },
    { icon: FaInstagram, url: "#", name: "Instagram" },
    { icon: FaGithub, url: "#", name: "GitHub" },
  ];

  const quickLinks = [
    { name: "Home", url: "#" },
    { name: "About", url: "#" },
    { name: "Internships", url: "#" },
    { name: "Contact", url: "#" },
    { name: "Privacy Policy", url: "#" },
  ];

  return (
    <motion.footer 
      initial={{ opacity: 0, y: 50 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.8 }}
      className="bg-gray-900 text-white py-12 w-full border-t border-gray-700"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Info */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h2 className="font-bold text-2xl">
              Next<span className="text-cyan-400">INTERN</span>
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed">
              Connecting talented students with top companies for meaningful internship experiences.
            </p>
            <div className="flex items-center space-x-2 text-gray-400">
              <MdEmail size={18} />
              <span className="text-sm">contact@nextintern.com</span>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <li key={index}>
                  <a 
                    href={link.url} 
                    className="text-gray-400 hover:text-cyan-400 transition duration-300 text-sm"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg text-white">Newsletter</h3>
            <p className="text-gray-400 text-sm">
              Subscribe to get updates on new internship opportunities.
            </p>
            <div className="flex">
              <input 
                type="email" 
                placeholder="Your email" 
                className="px-4 py-2 bg-gray-800 text-white text-sm rounded-l focus:outline-none focus:ring-1 focus:ring-cyan-400 w-full"
              />
              <button className="bg-cyan-500 hover:bg-cyan-600 text-white px-4 py-2 rounded-r text-sm transition duration-300">
                Subscribe
              </button>
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-4"
          >
            <h3 className="font-semibold text-lg text-white">Connect With Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.url}
                  aria-label={social.name}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-gray-400 hover:text-cyan-400 transition duration-300 bg-gray-800 p-2 rounded-full"
                >
                  <social.icon size={18} />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-500 text-sm"
        >
          <p>© {currentYear} Next Intern. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ for future professionals</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;