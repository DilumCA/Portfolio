import React from 'react';
import { RiReactjsLine } from 'react-icons/ri';
import { TbBrandNextjs } from 'react-icons/tb';
import { SiMongodb, SiSpring, SiMysql } from 'react-icons/si';
import { FaNodeJs } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Technologies = () => {
  const reactVariants = {
    animate: {
      y: [0, -10, 0], // Move up and down
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2,
        },
      },
    },
  };

  const nextjsVariants = {
    animate: {
      y: [0, -15, 0], // Move up and down
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2.5,
        },
      },
    },
  };

  const mongodbVariants = {
    animate: {
      y: [0, -12, 0], // Move up and down
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2.2,
        },
      },
    },
  };

  const springVariants = {
    animate: {
      y: [0, -8, 0], // Move up and down
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 1.8,
        },
      },
    },
  };

  const nodejsVariants = {
    animate: {
      y: [0, -10, 0], // Move up and down
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2.1,
        },
      },
    },
  };

  const mysqlVariants = {
    animate: {
      y: [0, -14, 0], // Move up and down
      transition: {
        y: {
          repeat: Infinity,
          repeatType: 'loop',
          duration: 2.3,
        },
      },
    },
  };

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
        <div className='flex flex-wrap items-center justify-center gap-4'>
          <motion.div
            className='rounded-2xl border-4 border-neutral-800 p-4'
            variants={reactVariants}
            animate="animate"
          >
            <RiReactjsLine className='text-7xl' style={{ color: '#61DAFB' }} />
          </motion.div>
          <motion.div
            className='rounded-2xl border-4 border-neutral-800 p-4'
            variants={nextjsVariants}
            animate="animate"
          >
            <TbBrandNextjs className='text-7xl' style={{ color: '#ffffff' }} />
          </motion.div>
          <motion.div
            className='rounded-2xl border-4 border-neutral-800 p-4'
            variants={mongodbVariants}
            animate="animate"
          >
            <SiMongodb className='text-7xl' style={{ color: '#47A248' }} />
          </motion.div>
          <motion.div
            className='rounded-2xl border-4 border-neutral-800 p-4'
            variants={springVariants}
            animate="animate"
          >
            <SiSpring className='text-7xl' style={{ color: '#6DB33F' }} />
          </motion.div>
          <motion.div
            className='rounded-2xl border-4 border-neutral-800 p-4'
            variants={nodejsVariants}
            animate="animate"
          >
            <FaNodeJs className='text-7xl' style={{ color: '#339933' }} />
          </motion.div>
          <motion.div
            className='rounded-2xl border-4 border-neutral-800 p-4'
            variants={mysqlVariants}
            animate="animate"
          >
            <SiMysql className='text-7xl' style={{ color: '#4479A1' }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Technologies;