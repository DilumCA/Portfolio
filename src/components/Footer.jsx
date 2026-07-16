import { Link } from 'react-router-dom';
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa';
import socialLinks from '../data/social-links.json';
import profile from '../data/profile.json';

const iconMap = { FaLinkedin, FaGithub, FaEnvelope };

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-slate-50 dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700">
      <div className="container-narrow px-4 md:px-8 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="text-center md:text-left">
          <Link to="/" className="font-bold text-slate-900 dark:text-white text-base">
            Dilum<span className="text-accent-600 dark:text-accent-400">.</span>
          </Link>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Associate Quality Assurance Engineer · {profile.location}
          </p>
        </div>

        <div className="flex items-center gap-4">
          {socialLinks.map(link => {
            const Icon = iconMap[link.icon];
            return (
              <a
                key={link.platform}
                href={link.url}
                target={link.platform !== 'Email' ? '_blank' : undefined}
                rel="noopener noreferrer"
                aria-label={link.platform}
                className="p-2 rounded-lg text-slate-500 hover:text-accent-600 dark:text-slate-400 dark:hover:text-accent-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
              >
                {Icon && <Icon size={18} />}
              </a>
            );
          })}
        </div>

        <p className="text-xs text-slate-400 dark:text-slate-500">
          © {year} Dilum Andradi
        </p>
      </div>
    </footer>
  );
}
