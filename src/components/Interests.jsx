import React, { useRef } from 'react';
import { FaCode, FaStar, FaVideo, FaBook, FaPlane, FaGamepad } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Interests = () => {
  const cardRefs = useRef([]);

  const interests = [
    { icon: <FaCode />, title: 'Coding', description: 'I love creating web applications and exploring new technologies.', images: ['path/to/coding1.jpg', 'path/to/coding2.jpg', 'path/to/coding3.jpg'] },
    { icon: <FaStar />, title: 'Astronomy', description: 'Exploring the universe and learning about celestial objects fascinates me.', images: ['path/to/astronomy1.jpg', 'path/to/astronomy2.jpg', 'path/to/astronomy3.jpg'] },
    { icon: <FaVideo />, title: 'Videography', description: 'Creating and editing videos is a creative outlet I enjoy.', images: ['path/to/videography1.jpg', 'path/to/videography2.jpg', 'path/to/videography3.jpg'] },
    { icon: <FaBook />, title: 'Reading', description: 'I enjoy reading books on various topics, especially technology and fiction.', images: ['path/to/reading1.jpg', 'path/to/reading2.jpg', 'path/to/reading3.jpg'] },

  ];

  // const handleClick = (index) => {
  //   setExpandedIndex(expandedIndex === index ? null : index); // Toggle the card
  // };

  // const handleClickOutside = (event) => {
  //   if (expandedIndex !== null && !cardRefs.current[expandedIndex]?.contains(event.target)) {
  //     setExpandedIndex(null);
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, [expandedIndex]);

  return (
    <div className='border-b border-neutral-900 pb-24'>
      <h1 className='my-20 text-center text-4xl'>Interests</h1>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8'>
        {interests.map((interest, index) => (
          <motion.div
            key={index}
            ref={(el) => (cardRefs.current[index] = el)}
            className={`relative p-6 bg-neutral-800 rounded-lg shadow-lg transform transition-all duration-500 ease-in-out hover:scale-105`}
            style={{
              minHeight: '250px',
              maxHeight: '250px',
            }}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className='flex justify-center mb-4 text-cyan-500 text-6xl'>
              {interest.icon}
            </div>
            <h2 className='text-2xl font-semibold text-center mb-2'>{interest.title}</h2>
            <p className='text-center text-neutral-300'>{interest.description}</p>
            {/* {expandedIndex === index && (
              <div
                className='absolute inset-0 bg-black bg-opacity-75 opacity-100 transition-opacity duration-500 ease-in-out flex flex-col items-center justify-center p-4'
                style={{ height: '100%' }}
              >
                <h2 className='text-2xl font-semibold text-center mb-2 text-white'>{interest.title}</h2>
                <p className='text-center text-neutral-300 mb-4'>{interest.description}</p>
                <div className='grid grid-cols-2 gap-2'>
                  {interest.images.map((image, imgIndex) => (
                    <img
                      key={imgIndex}
                      src={image}
                      alt={`${interest.title} ${imgIndex + 1}`}
                      className='w-full h-32 object-cover rounded-md'
                      style={{ transition: 'transform 0.3s ease-in-out' }}
                    />
                  ))}
                </div>
              </div>
            )} */}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Interests;