import { FiDownload, FiExternalLink } from 'react-icons/fi';
import { SEO } from '../components/SEO';
import { Section, SectionHeader } from '../components/ui/Section';
import CV from '../assets/DiumAndradi_CV.pdf';

export default function Resume() {
  return (
    <>
      <SEO
        title="Resume"
        description="Download or view the resume of Dilum Andradi — Associate Quality Assurance Engineer."
        path="/resume"
      />
      <Section>
        <SectionHeader
          label="Resume"
          title="Curriculum Vitae"
          description="Current CV for Associate Quality Assurance Engineer roles."
        />

        <div className="max-w-3xl mx-auto">
          {/* Download CTA */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            <a href={CV} download="DilumAndradi_CV.pdf" className="btn-primary">
              <FiDownload size={16} />
              Download PDF
            </a>
            <a href={CV} target="_blank" rel="noopener noreferrer" className="btn-outline">
              <FiExternalLink size={16} />
              Open in new tab
            </a>
          </div>

          {/* Embedded viewer */}
          <div className="card-base overflow-hidden">
            <iframe
              src={CV}
              title="Dilum Andradi CV"
              className="w-full h-[80vh] min-h-[600px]"
              aria-label="Resume PDF viewer"
            />
          </div>

          <p className="text-center text-xs text-slate-400 mt-4">
            If the PDF doesn&apos;t display, use the download or open buttons above.
          </p>
        </div>
      </Section>
    </>
  );
}
