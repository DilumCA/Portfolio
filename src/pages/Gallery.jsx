import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Section, SectionHeader } from '../components/ui/Section';
import rawGallery from '../data/gallery.json';

// Strip instruction entries (those with _note / _example keys only)
const images = rawGallery.filter(item => item.id && item.src);

const ALL = 'All';
const categories = images.length
  ? [ALL, ...Array.from(new Set(images.map(img => img.category).filter(Boolean)))]
  : [];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [lightboxIndex, setLightboxIndex]   = useState(null);

  const filtered = activeCategory === ALL
    ? images
    : images.filter(img => img.category === activeCategory);

  const openLightbox  = (index) => setLightboxIndex(index);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const prev = useCallback(() =>
    setLightboxIndex(i => (i - 1 + filtered.length) % filtered.length), [filtered.length]);

  const next = useCallback(() =>
    setLightboxIndex(i => (i + 1) % filtered.length), [filtered.length]);

  // Keyboard navigation
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e) => {
      if (e.key === 'ArrowLeft')  prev();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'Escape')     closeLightbox();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIndex, prev, next, closeLightbox]);

  // Prevent body scroll when lightbox is open
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  return (
    <>
      <SEO
        title="Gallery"
        description="A visual gallery of Dilum Andradi's work, internship, and project moments."
        path="/gallery"
      />

      <Section>
        <SectionHeader
          label="Gallery"
          title="Moments & Work"
          description="Snapshots from projects, internship, and events."
        />

        {images.length === 0 ? (
          /* ── Empty state ── */
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col items-center gap-4 py-24 text-center"
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
              <FiImage size={36} className="text-slate-300 dark:text-slate-600" />
            </div>
            <h2 className="text-lg font-semibold text-slate-700 dark:text-slate-300">
              No photos yet
            </h2>
            <p className="text-sm text-slate-400 dark:text-slate-500 max-w-xs">
              Add images to <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">public/gallery/</code> and
              list them in <code className="bg-slate-100 dark:bg-slate-800 px-1 rounded">src/data/gallery.json</code> to populate this gallery.
            </p>
          </motion.div>
        ) : (
          <>
            {/* ── Category filter ── */}
            {categories.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8">
                {categories.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={[
                      'px-4 py-1.5 rounded-full text-sm font-medium transition-colors',
                      activeCategory === cat
                        ? 'bg-accent-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-accent-50 dark:hover:bg-accent-900/20 hover:text-accent-700 dark:hover:text-accent-400',
                    ].join(' ')}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            )}

            {/* ── Grid ── */}
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              <AnimatePresence>
                {filtered.map((img, idx) => (
                  <motion.div
                    key={img.id}
                    layout
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.25 }}
                    className="cursor-pointer group relative overflow-hidden rounded-xl shadow-card hover:shadow-card-hover transition-shadow aspect-[4/3]"
                    onClick={() => openLightbox(idx)}
                  >
                    <img
                      src={img.src}
                      alt={img.alt}
                      loading="lazy"
                      className="w-full h-full object-cover block"
                    />
                    {img.caption && (
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-3 translate-y-full group-hover:translate-y-0 transition-transform duration-200">
                        <p className="text-white text-xs leading-snug">{img.caption}</p>
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </>
        )}
      </Section>

      {/* ── Lightbox ── */}
      <AnimatePresence>
        {lightboxIndex !== null && filtered[lightboxIndex] && (
          <motion.div
            key="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
            onClick={closeLightbox}
          >
            {/* Image + caption */}
            <motion.div
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.93 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.93 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-4xl w-full"
              onClick={e => e.stopPropagation()}
            >
              <img
                src={filtered[lightboxIndex].src}
                alt={filtered[lightboxIndex].alt}
                className="w-full h-auto max-h-[80vh] object-contain rounded-xl"
              />
              {filtered[lightboxIndex].caption && (
                <p className="mt-3 text-center text-sm text-slate-300">
                  {filtered[lightboxIndex].caption}
                </p>
              )}
              <p className="mt-1 text-center text-xs text-slate-500">
                {lightboxIndex + 1} / {filtered.length}
              </p>
            </motion.div>

            {/* Close */}
            <button
              onClick={closeLightbox}
              aria-label="Close lightbox"
              className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <FiX size={20} />
            </button>

            {/* Prev */}
            {filtered.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                aria-label="Previous image"
                className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <FiChevronLeft size={24} />
              </button>
            )}

            {/* Next */}
            {filtered.length > 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                aria-label="Next image"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
              >
                <FiChevronRight size={24} />
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
