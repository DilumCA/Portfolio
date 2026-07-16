import { Link } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { SEO } from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO title="404 — Page Not Found" />
      <div className="min-h-[70vh] flex items-center justify-center text-center px-4">
        <div>
          <p className="text-8xl font-bold text-accent-100 dark:text-accent-900 mb-2 select-none">404</p>
          <h1 className="heading-md mb-3">Page not found</h1>
          <p className="text-body mb-8">This page doesn&apos;t exist — it may have been moved or the URL is wrong.</p>
          <Link to="/" className="btn-primary">
            <FiHome size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </>
  );
}
