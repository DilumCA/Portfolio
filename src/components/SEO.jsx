import { Helmet } from 'react-helmet-async';
import profile from '../data/profile.json';
import settings from '../data/settings.json';

export function SEO({ title, description, path = '' }) {
  const siteTitle = settings.site.title;
  const siteUrl = settings.site.url;
  const fullTitle = title ? `${title} | ${profile.name}` : siteTitle;
  const metaDesc = description || settings.site.description;
  const canonical = `${siteUrl}${path}`;
  const ogImage = `${siteUrl}/og-image.png`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={metaDesc} />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={metaDesc} />
      <meta property="og:url" content={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content={settings.site.locale} />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={metaDesc} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Person schema */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: profile.name,
          jobTitle: profile.title,
          email: profile.email,
          url: siteUrl,
          sameAs: [
            'https://www.linkedin.com/in/dilumandradi/',
            'https://github.com/DilumCA',
          ],
        })}
      </script>
    </Helmet>
  );
}
