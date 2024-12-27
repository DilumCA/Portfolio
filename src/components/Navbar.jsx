import React, { useState } from 'react';
import { FaLinkedin, FaGithub, FaTwitter, FaBars, FaTimes } from 'react-icons/fa';
import logo from '../../public/logo.png';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false); // Close the menu if it's open
    }
  };

  return (
    <motion.nav
      ref={ref}
      className="navbar mb-3 flex items-center justify-between py-4 px-8 bg-neutral-900 bg-opacity-50 backdrop-filter backdrop-blur-lg shadow-lg z-50"
      initial={{ opacity: 0, y: -50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="flex items-center">
        <motion.img
          src={logo}
          alt="Logo"
          className="h-16 w-16 transition-transform transform hover:scale-105"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        />
        <motion.h3
          className="text-2xl font-semibold ml-4 text-white hidden md:block"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          Portfolio
        </motion.h3>
      </div>
      <div className="hidden md:flex items-center gap-6 text-xl text-white">
        {['Home', 'Technologies', 'Projects', 'Timeline', 'Interests', 'Contact'].map((item) => (
          <motion.button
            key={item}
            onClick={() => handleScroll(item.toLowerCase())}
            className="hover:text-cyan-500 transition-colors"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {item}
          </motion.button>
        ))}
      </div>
      <div className="md:hidden flex items-center">
        <button onClick={toggleMenu} className="text-white focus:outline-none">
          {isOpen ? <FaTimes className="h-6 w-6" /> : <FaBars className="h-6 w-6" />}
        </button>
      </div>
      {isOpen && (
        <motion.div
          className="fixed inset-0 bg-neutral-900 bg-opacity-90 backdrop-filter backdrop-blur-lg shadow-lg flex flex-col items-center gap-6 py-4 text-xl text-white md:hidden z-50"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {['Home', 'Technologies', 'Projects', 'Timeline', 'Interests', 'Contact'].map((item) => (
            <motion.button
              key={item}
              onClick={() => handleScroll(item.toLowerCase())}
              className="hover:text-cyan-500 transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {item}
            </motion.button>
          ))}
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;