import React from 'react';
import {
  SiPostman,
  SiCucumber,
  SiSpring,
  SiJavascript,
  SiMongodb,
  SiMysql,
  SiGit,
  SiGithub,
  SiBitbucket,
  SiReact,
  SiNodedotjs,
  SiHtml5,
  SiCss3,
  SiIntellijidea,
  SiVisualstudiocode
} from 'react-icons/si';

import {
  FaJava,
  FaBug
} from 'react-icons/fa';

import { RiReactjsLine } from 'react-icons/ri';
import { motion } from 'framer-motion';

const technologies = [
  // Testing Tools
  {
    name: 'Postman',
    icon: <SiPostman className='text-7xl' style={{ color: '#FF6C37' }} />
  },
  {
    name: 'Cucumber',
    icon: <SiCucumber className='text-7xl' style={{ color: '#23D96C' }} />
  },
  {
    name: 'Serenity BDD',
    icon: <FaBug className='text-7xl' style={{ color: '#6A5ACD' }} />
  },

  // Programming Languages
  {
    name: 'Java',
    icon: <FaJava className='text-7xl' style={{ color: '#007396' }} />
  },
  {
    name: 'JavaScript',
    icon: <SiJavascript className='text-7xl' style={{ color: '#F7DF1E' }} />
  },

  // Backend & API
  {
    name: 'Spring Boot',
    icon: <SiSpring className='text-7xl' style={{ color: '#6DB33F' }} />
  },
  {
    name: 'Node.js',
    icon: <SiNodedotjs className='text-7xl' style={{ color: '#339933' }} />
  },

  // Frontend
  {
    name: 'React',
    icon: <SiReact className='text-7xl' style={{ color: '#61DAFB' }} />
  },
  {
    name: 'HTML',
    icon: <SiHtml5 className='text-7xl' style={{ color: '#E34F26' }} />
  },
  {
    name: 'CSS',
    icon: <SiCss3 className='text-7xl' style={{ color: '#1572B6' }} />
  },

  // Databases
  {
    name: 'MongoDB',
    icon: <SiMongodb className='text-7xl' style={{ color: '#47A248' }} />
  },
  {
    name: 'MySQL',
    icon: <SiMysql className='text-7xl' style={{ color: '#4479A1' }} />
  },

  // Version Control
  {
    name: 'Git',
    icon: <SiGit className='text-7xl' style={{ color: '#F05032' }} />
  },
  {
    name: 'GitHub',
    icon: <SiGithub className='text-7xl' />
  },
  {
    name: 'Bitbucket',
    icon: <SiBitbucket className='text-7xl' style={{ color: '#0052CC' }} />
  },

  // IDEs
  {
    name: 'VS Code',
    icon: <SiVisualstudiocode className='text-7xl' style={{ color: '#007ACC' }} />
  },
  {
    name: 'IntelliJ IDEA',
    icon: <SiIntellijidea className='text-7xl' />
  }
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