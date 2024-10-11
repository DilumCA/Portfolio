import React from 'react';
import { FaGraduationCap, FaSchool, FaUniversity } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Timeline = () => {
  const events = [
    {
      date: '2019 - 2020',
      topic: 'Secondary Education',
      milestone: 'Completed A/Ls in physycle scince stream.',
      icon: <FaSchool />,
    },
    {
      date: '2021 - 2022',
      topic: 'Higher Education',
      milestone: 'Advanced Diploma in Business Management',
      description: 'Completed with a Distinction from National Institute of Business Management (NIBM)',
      icon: <FaUniversity />,
    },
    {
      date: '2022 - 2026',
      topic: '',
      milestone: 'B.Sc. (Hons) in Information Technology and Management',
      description: 'Faculty of Information Technology- University of Moratuwa',
      icon: <FaGraduationCap />,
    },
  ];

  return (
    <div className='border-b border-neutral-900 pb-24'>
      <h1 className='my-20 text-center text-4xl'>Journey so far</h1>
      <div className='relative'>
        <div className='absolute left-1/2 transform -translate-x-1/2 h-full border-l-2 border-cyan-500'></div>
        <div className='flex flex-col items-center'>
          {events.map((event, index) => (
            <motion.div
              key={index}
              className='mb-16 flex flex-col md:flex-row w-full max-w-3xl items-center'
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className='w-full md:w-1/2 text-right md:pr-8 mb-4 md:mb-0'>
                <h2 className='text-xl md:text-2xl font-semibold'>{event.topic}</h2>
              </div>
              <div className='relative w-16 h-16 flex items-center justify-center bg-cyan-500 text-white rounded-full shadow-lg transition-transform transform hover:scale-110 mb-4 md:mb-0'>
                {event.icon}
              </div>
              <div className='w-full md:w-1/2 md:pl-8'>
                <h2 className='text-xl md:text-2xl font-semibold'>{event.milestone}</h2>
                {event.description && <p className='text-neutral-300'>{event.description}</p>}
                <span className='text-cyan-500'>{event.date}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Timeline;