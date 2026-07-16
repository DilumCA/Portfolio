/* eslint-disable react-refresh/only-export-components */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { RootLayout } from './layouts/RootLayout';
import { PageFallback } from './components/PageFallback';
import './index.css';

const Home           = lazy(() => import('./pages/Home'));
const About          = lazy(() => import('./pages/About'));
const Experience     = lazy(() => import('./pages/Experience'));
const Projects       = lazy(() => import('./pages/Projects'));
const ProjectDetail  = lazy(() => import('./pages/ProjectDetail'));
const Skills         = lazy(() => import('./pages/Skills'));
const Resume         = lazy(() => import('./pages/Resume'));
const OpenSource     = lazy(() => import('./pages/OpenSource'));
const Achievements   = lazy(() => import('./pages/Achievements'));
const Contact        = lazy(() => import('./pages/Contact'));
const Certifications = lazy(() => import('./pages/Certifications'));
const Blog           = lazy(() => import('./pages/Blog'));
const Gallery        = lazy(() => import('./pages/Gallery'));
const NotFound       = lazy(() => import('./pages/NotFound'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      { index: true,              element: <Home /> },
      { path: 'about',            element: <About /> },
      { path: 'experience',       element: <Experience /> },
      { path: 'projects',         element: <Projects /> },
      { path: 'projects/:id',     element: <ProjectDetail /> },
      { path: 'skills',           element: <Skills /> },
      { path: 'resume',           element: <Resume /> },
      { path: 'open-source',      element: <OpenSource /> },
      { path: 'achievements',     element: <Achievements /> },
      { path: 'contact',          element: <Contact /> },
      { path: 'certifications',   element: <Certifications /> },
      { path: 'blog',             element: <Blog /> },
      { path: 'gallery',          element: <Gallery /> },
      { path: '*',                element: <NotFound /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HelmetProvider>
      <Suspense fallback={<PageFallback />}>
        <RouterProvider router={router} />
      </Suspense>
    </HelmetProvider>
  </React.StrictMode>
);
