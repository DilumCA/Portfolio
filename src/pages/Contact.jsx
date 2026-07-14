import { useRef, useState } from 'react';
import { FiSend, FiLoader, FiMapPin, FiMail, FiPhone, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { Section, SectionHeader } from '../components/ui/Section';
import { sendContactEmail } from '../services/email.js';
import profile from '../data/profile.json';
import socialLinks from '../data/social-links.json';

const iconMap = { FaLinkedin, FaGithub, FaEnvelope };

function validate(data) {
  const errs = {};
  if (!data.from_name.trim()) errs.from_name = 'Name is required';
  if (!data.user_email.trim()) errs.user_email = 'Email is required';
  else if (!/\S+@\S+\.\S+/.test(data.user_email)) errs.user_email = 'Enter a valid email';
  if (!data.message.trim()) errs.message = 'Message is required';
  return errs;
}

function Toast({ type, message, onDismiss }) {
  if (!message) return null;
  const isSuccess = type === 'success';
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className={`flex items-start gap-3 p-4 rounded-xl border ${
        isSuccess
          ? 'bg-pass-50 border-pass-500/30 text-pass-600 dark:bg-emerald-900/30 dark:text-emerald-400'
          : 'bg-red-50 border-red-200 text-red-700 dark:bg-red-900/20 dark:text-red-400'
      }`}
    >
      {isSuccess ? <FiCheckCircle size={16} className="shrink-0 mt-0.5" /> : <FiAlertCircle size={16} className="shrink-0 mt-0.5" />}
      <span className="text-sm">{message}</span>
      <button onClick={onDismiss} className="ml-auto text-current opacity-60 hover:opacity-100" aria-label="Dismiss">✕</button>
    </motion.div>
  );
}

export default function Contact() {
  const formRef = useRef();
  const [formData, setFormData] = useState({ from_name: '', user_email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: '', message: '' });

  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const errs = validate(formData);
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setLoading(true);
    setToast({ type: '', message: '' });
    try {
      await sendContactEmail(formRef.current);
      setToast({ type: 'success', message: "Message sent! I'll get back to you soon." });
      setFormData({ from_name: '', user_email: '', message: '' });
      setErrors({});
    } catch {
      setToast({ type: 'error', message: 'Failed to send. Please try again or email me directly.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact"
        description={`Get in touch with ${profile.name} — open to QA Engineer roles and collaboration.`}
        path="/contact"
      />
      <Section>
        <SectionHeader
          label="Get in Touch"
          title="Contact"
          description="Open to QA Engineer roles, freelance testing engagements, and collaboration."
        />

        <div className="grid lg:grid-cols-5 gap-12 max-w-4xl mx-auto">
          {/* Info panel */}
          <div className="lg:col-span-2 space-y-6">
            <div className="card-base p-6">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-pass-50 dark:bg-emerald-900/30 text-pass-600 dark:text-emerald-400 text-xs font-semibold border border-pass-500/20">
                <span className="w-2 h-2 rounded-full bg-pass-500 animate-pulse" />
                {profile.availability}
              </span>

              <ul className="space-y-3 text-sm">
                <li className="flex items-center gap-3 text-body">
                  <FiMail size={14} className="text-accent-500 shrink-0" />
                  <a href={`mailto:${profile.email}`} className="link-accent hover:underline">{profile.email}</a>
                </li>
                <li className="flex items-center gap-3 text-body">
                  <FiPhone size={14} className="text-accent-500 shrink-0" />
                  <a href={`tel:${profile.phone.replace(/\s/g, '')}`} className="hover:text-accent-600 transition-colors">{profile.phone}</a>
                </li>
                <li className="flex items-center gap-3 text-body">
                  <FiMapPin size={14} className="text-accent-500 shrink-0" />
                  {profile.location}
                </li>
              </ul>
            </div>

            <div className="card-base p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Social
              </p>
              <div className="flex gap-3">
                {socialLinks.map(link => {
                  const Icon = iconMap[link.icon];
                  return (
                    <a
                      key={link.platform}
                      href={link.url}
                      target={link.platform !== 'Email' ? '_blank' : undefined}
                      rel="noopener noreferrer"
                      aria-label={link.platform}
                      className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-600 text-slate-500 hover:text-accent-600 hover:border-accent-300 dark:text-slate-400 dark:hover:text-accent-400 dark:hover:border-accent-600 transition-colors"
                    >
                      {Icon && <Icon size={18} />}
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4">
              {toast.message && (
                <Toast type={toast.type} message={toast.message} onDismiss={() => setToast({ type: '', message: '' })} />
              )}

              <div>
                <label htmlFor="from_name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Name
                </label>
                <input
                  id="from_name"
                  name="from_name"
                  type="text"
                  autoComplete="name"
                  placeholder="Your name"
                  value={formData.from_name}
                  onChange={handleChange}
                  className={`input-base ${errors.from_name ? 'border-red-400 focus:ring-red-400' : ''}`}
                  aria-describedby={errors.from_name ? 'name-error' : undefined}
                />
                {errors.from_name && <p id="name-error" className="mt-1 text-xs text-red-500">{errors.from_name}</p>}
              </div>

              <div>
                <label htmlFor="user_email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Email
                </label>
                <input
                  id="user_email"
                  name="user_email"
                  type="email"
                  autoComplete="email"
                  placeholder="your@email.com"
                  value={formData.user_email}
                  onChange={handleChange}
                  className={`input-base ${errors.user_email ? 'border-red-400 focus:ring-red-400' : ''}`}
                  aria-describedby={errors.user_email ? 'email-error' : undefined}
                />
                {errors.user_email && <p id="email-error" className="mt-1 text-xs text-red-500">{errors.user_email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell me about the role or project…"
                  value={formData.message}
                  onChange={handleChange}
                  className={`input-base resize-none ${errors.message ? 'border-red-400 focus:ring-red-400' : ''}`}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                />
                {errors.message && <p id="message-error" className="mt-1 text-xs text-red-500">{errors.message}</p>}
              </div>

              <button type="submit" disabled={loading} className="btn-primary w-full justify-center">
                {loading ? (
                  <><FiLoader className="animate-spin" size={16} /> Sending…</>
                ) : (
                  <><FiSend size={16} /> Send Message</>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </Section>
    </>
  );
}
