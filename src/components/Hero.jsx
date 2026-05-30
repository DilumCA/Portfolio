import React, { useState } from "react";
import { FaLinkedin, FaGithub, FaFacebook, FaTimes } from "react-icons/fa";
import Modal from "react-modal";
import myImage from "../assets/dilum.png"; // Ensure the correct path
import Technologies from "./Technologies";
import CV from "../assets/DiumAndradi_CV.pdf";
import { motion } from "framer-motion";

Modal.setAppElement('#root'); // Set the root element for accessibility

const Hero = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div className="relative h-auto min-h-[90vh] flex flex-col md:flex-row items-center justify-center px-4 md:px-8 z-10">
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between text-center md:text-left text-white">
        {/* Image Section for Mobile First */}
        <motion.div
          className="flex justify-center mb-0 md:mb-0 md:w-1/2 order-1 md:order-2"
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src={myImage}
            alt="My Image"
            className="rounded-full w-[70%] md:w-[700px] h-auto object-cover"
          />
        </motion.div>

        {/* Text Section */}
        <motion.div
          className="md:w-1/2 mb-4 md:mb-0 order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gradient leading-relaxed">
            Greetings!
            <br />
            <span className="block mt-4">I'm Dilum Andradi</span>
          </h1>

          <h3 className="text-xl md:text-2xl mb-4 italic">
            Aspiring Quality Assuarance Engineer
          </h3>
          <p className="text-base md:text-lg mb-6 text-justify bg-opacity-5 bg-white p-4 rounded-lg shadow-lg leading-relaxed">
            Welcome to my digital space! As an IT & Management undergraduate, I am driven by a passion for software quality and continuous improvement. My journey has equipped me with a strong foundation in testing methodologies, API validation, and test automation, alongside valuable experience in software development and Agile environments. I enjoy approaching challenges with a critical and analytical mindset, uncovering defects, validating requirements, and ensuring applications deliver seamless user experiences. My exposure to both development and testing has given me a broader understanding of the software lifecycle and the importance of quality at every stage. I am continuously expanding my QA expertise and look forward to contributing to the delivery of reliable, secure, and high-performing software solutions.
          </p>

          <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.a
              href={CV}
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:from-cyan-600 hover:to-blue-600 transition duration-300 transform hover:scale-105"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              Get My Resume
            </motion.a>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 md:gap-6 text-xl">
              <motion.a
                href="https://www.linkedin.com/in/dilumandradi/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon h-10 w-10 flex items-center justify-center bg-white text-cyan-500 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-cyan-500 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                <FaLinkedin />
              </motion.a>
              <motion.a
                href="https://github.com/DilumCA"
                target="_blank"
                rel="noopener noreferrer"
                className="icon h-10 w-10 flex items-center justify-center bg-white text-gray-800 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-gray-800 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                <FaGithub />
              </motion.a>
              <motion.a
                href="https://web.facebook.com/dilum.andradi/"
                target="_blank"
                rel="noopener noreferrer"
                className="icon h-10 w-10 flex items-center justify-center bg-white text-blue-500 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-blue-500 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                <FaFacebook />
              </motion.a>
              <motion.a
                href="https://x.com/DilumAndradi"
                target="_blank"
                rel="noopener noreferrer"
                className="icon h-10 w-10 flex items-center justify-center bg-white text-blue-500 rounded-full shadow-lg transition-transform transform hover:scale-110 hover:bg-blue-500 hover:text-white"
                whileHover={{ scale: 1.2 }}
              >
                <FaTimes />
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;