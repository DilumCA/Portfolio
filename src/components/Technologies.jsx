import React from 'react';
import { RiReactjsLine } from 'react-icons/ri';
import { SiMongodb, SiSpring, SiMysql, SiHtml5, SiCss3, SiJavascript, SiBootstrap, SiMui, SiFigma, SiAdobephotoshop, SiAdobepremierepro, SiBlender, SiArduino, SiPostman } from 'react-icons/si';
import { FaNodeJs, FaJava, FaGit, FaCuttlefish } from 'react-icons/fa';
import { motion } from 'framer-motion';

const technologies = [
  { name: 'Java', icon: <FaJava className='text-7xl' style={{ color: '#007396' }} /> },
  { name: 'C', icon: <FaCuttlefish className='text-7xl' style={{ color: '#A8B9CC' }} /> },
  { name: 'JavaScript', icon: <SiJavascript className='text-7xl' style={{ color: '#F7DF1E' }} /> },
  { name: 'HTML', icon: <SiHtml5 className='text-7xl' style={{ color: '#E34F26' }} /> },
  { name: 'CSS', icon: <SiCss3 className='text-7xl' style={{ color: '#1572B6' }} /> },
  { name: 'ReactJS', icon: <RiReactjsLine className='text-7xl' style={{ color: '#61DAFB' }} /> },
  { name: 'Bootstrap', icon: <SiBootstrap className='text-7xl' style={{ color: '#7952B3' }} /> },
  { name: 'MUI', icon: <SiMui className='text-7xl' style={{ color: '#007FFF' }} /> },
  { name: 'NodeJS', icon: <FaNodeJs className='text-7xl' style={{ color: '#339933' }} /> },
  { name: 'SpringBoot', icon: <SiSpring className='text-7xl' style={{ color: '#6DB33F' }} /> },
  { name: 'MongoDB', icon: <SiMongodb className='text-7xl' style={{ color: '#47A248' }} /> },
  { name: 'MySQL', icon: <SiMysql className='text-7xl' style={{ color: '#4479A1' }} /> },
  { name: 'Figma', icon: <SiFigma className='text-7xl' style={{ color: '#F24E1E' }} /> },
];

const containerVariants = {
  animate: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  animate: {
    y: [0, -20, 0], // Move up and down
    transition: {
      y: {
        repeat: Infinity,
        repeatType: 'loop',
        duration: 2,
      },
    },
  },
};

const Technologies = () => {
  const headingVariants = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div>
      <div className='border-b border-neutral-800 pb-24'>
        <motion.h1
          className='my-20 text-center text-4xl'
          variants={headingVariants}
          initial="initial"
          animate="animate"
        >
          Technologies
        </motion.h1>
        <motion.div
          className='flex flex-wrap items-center justify-center gap-4'
          variants={containerVariants}
          initial="initial"
          animate="animate"
        >
          {technologies.map((tech, index) => (
            <motion.div
              key={index}
              className='rounded-2xl border-4 border-neutral-800 p-4'
              variants={itemVariants}
            >
              {tech.icon}
              <p className='text-center mt-2'>{tech.name}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Technologies;