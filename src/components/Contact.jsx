import React, { useRef, useState } from 'react';
import { FaLinkedin, FaGithub, FaFacebook, FaTwitter, FaSpinner } from 'react-icons/fa';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';
import { motion } from 'framer-motion';

function Contact() {
  const form = useRef();
  const [formData, setFormData] = useState({
    from_name: '',
    user_email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.from_name) errors.from_name = 'Name is required';
    if (!formData.user_email) {
      errors.user_email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      errors.user_email = 'Email address is invalid';
    }
    if (!formData.message) errors.message = 'Message is required';
    return errors;
  };

  const sendEmail = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      Swal.fire({
        icon: 'error',
        title: 'Error',
        html: Object.values(validationErrors).map(error => `<p>${error}</p>`).join(''),
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        background: '#333',
        color: '#fff',
        iconColor: '#f27474',
        customClass: {
          popup: 'swal2-dark',
          title: 'swal2-title-dark',
          content: 'swal2-content-dark',
        }
      });
      return;
    }

    setLoading(true);
    emailjs.sendForm('service_2lxxaxo', 'template_kgc3lrb', form.current, 'rI3tVakFjB_gIVeHb')
      .then((result) => {
        console.log(result.text);
        Swal.fire({
          icon: 'success',
          title: 'Message Sent',
          text: 'Your message has been sent successfully!',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#333',
          color: '#fff',
          iconColor: '#a5dc86',
          customClass: {
            popup: 'swal2-dark',
            title: 'swal2-title-dark',
            content: 'swal2-content-dark',
          }
        });
        setFormData({ from_name: '', user_email: '', message: '' }); // Clear the form
        setErrors({}); // Clear errors
        setLoading(false);
      }, (error) => {
        console.log(error.text);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Failed to send message, please try again.',
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true,
          background: '#333',
          color: '#fff',
          iconColor: '#f27474',
          customClass: {
            popup: 'swal2-dark',
            title: 'swal2-title-dark',
            content: 'swal2-content-dark',
          }
        });
        setLoading(false);
      });
  };

  return (
    <motion.div
      className='border-b border-neutral-900 pb-24'
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
    >
      <h1 className='my-20 text-center text-4xl'>Get in Touch</h1>
      <p className='text-center text-lg mb-8 text-gray-400'>
        I would love to hear from you! Whether you have a question, a project idea, or just want to say hello, feel free to reach out.
      </p>
      <div className='flex flex-col items-center'>
        <form ref={form} onSubmit={sendEmail} className='w-full max-w-lg'>
          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='from_name'>
              Name
            </label>
            <input
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black'
              type='text'
              id='from_name'
              name='from_name'
              placeholder='Your Name'
              value={formData.from_name}
              onChange={handleChange}
            />
            {errors.from_name && <p className='text-red-500 text-xs mt-1'>{errors.from_name}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='user_email'>
              Email
            </label>
            <input
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black'
              type='email'
              id='user_email'
              name='user_email'
              placeholder='Your Email'
              value={formData.user_email}
              onChange={handleChange}
            />
            {errors.user_email && <p className='text-red-500 text-xs mt-1'>{errors.user_email}</p>}
          </div>
          <div className='mb-4'>
            <label className='block text-sm font-bold mb-2' htmlFor='message'>
              Message
            </label>
            <textarea
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 text-black'
              id='message'
              name='message'
              rows='5'
              placeholder='Your Message'
              value={formData.message}
              onChange={handleChange}
            ></textarea>
            {errors.message && <p className='text-red-500 text-xs mt-1'>{errors.message}</p>}
          </div>
          <div className='flex justify-center'>
            <button
              className='px-6 py-3 bg-cyan-500 text-cyan-900 font-semibold rounded-md hover:bg-cyan-600 transition duration-300 flex items-center'
              type='submit'
              disabled={loading}
            >
              {loading ? <FaSpinner className='animate-spin mr-2' /> : 'Send Message'}
            </button>
          </div>
        </form>
        <div className='mt-12 flex gap-6 text-2xl'>
          <a href='https://www.linkedin.com/in/dilumandradi/' target='_blank' rel='noopener noreferrer'>
            <FaLinkedin className='transition-colors hover:text-cyan-500' />
          </a>
                  <a href='https://github.com/DilumCA' target='_blank' rel='noopener noreferrer'>
            <FaGithub className='transition-colors hover:text-[#181717]' />
          </a>
          <a href='https://web.facebook.com/dilum.andradi/' target='_blank' rel='noopener noreferrer'>
            <FaFacebook className='transition-colors hover:text-blue-500' />
          </a>
          <a href='https://x.com/DilumAndradi' target='_blank' rel='noopener noreferrer'>
            <FaTwitter className='transition-colors hover:text-cyan-400' />
          </a>
        </div>
        <div className='mt-8 text-center'>
          <p className='text-lg text-gray-300'>Or reach out to me via email:</p>
          <a href='mailto:dilumandradi@gmail.com' className='text-cyan-400 hover:text-cyan-600 transition duration-300'>
            dilumandradi@gmail.com
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default Contact;