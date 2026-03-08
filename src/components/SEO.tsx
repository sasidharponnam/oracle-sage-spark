import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'product';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  structuredData?: object;
}

const defaultMeta = {
  title: 'Paramanu Consulting | Enterprise Oracle, Cloud & DevOps Managed Services',
  description: 'Tier-1 Enterprise IT Consulting with 20+ years of Oracle, Cloud, DevOps, SRE, and AI-enabled Managed Services for Fortune 500 organizations. 99.99% uptime SLA.',
  keywords: 'Oracle consulting, enterprise IT services, DevOps, SRE, cloud migration, managed services, AI operations, Fortune 500 IT, Oracle DBA, cloud transformation',
  image: 'https://www.paramanuconsulting.com/og-banner.png',
  url: 'https://www.paramanuconsulting.com',
};

const SEO = ({
  title,
  description = defaultMeta.description,
  keywords = defaultMeta.keywords,
  image = defaultMeta.image,
  url = defaultMeta.url,
  type = 'website',
  author = 'Paramanu Consulting',
  publishedTime,
  modifiedTime,
  structuredData,
}: SEOProps) => {
  const fullTitle = title 
    ? `${title} | Paramanu Consulting`
    : defaultMeta.title;

  // Default Organization structured data
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Paramanu Consulting',
    url: 'https://www.paramanuconsulting.com',
    logo: 'https://www.paramanuconsulting.com/og-banner.png',
    description: defaultMeta.description,
    foundingDate: '2025',
    sameAs: [
      'https://www.linkedin.com/company/paramanu-consulting',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+917989359581',
      email: 'info@paramanuconsulting.com',
      contactType: 'customer service',
      availableLanguage: ['English'],
    },
    areaServed: 'Worldwide',
    serviceType: [
      'Oracle Managed Services',
      'Cloud Transformation',
      'DevOps & SRE',
      'AI-Enabled Operations',
      'Production Support',
    ],
  };

  // Professional Service structured data with required address field
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: 'Paramanu Consulting',
    url: 'https://www.paramanuconsulting.com',
    image: 'https://www.paramanuconsulting.com/og-banner.png',
    description: defaultMeta.description,
    priceRange: '$$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Global',
      addressRegion: 'Worldwide',
      addressCountry: 'US',
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <link rel="canonical" href={url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Paramanu Consulting" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      <meta name="twitter:site" content="@ParamanuConsulting" />
      <meta name="twitter:creator" content="@ParamanuConsulting" />

      {/* Article specific meta (for blog posts) */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {type === 'article' && <meta property="article:author" content={author} />}

      {/* Additional SEO meta tags */}
      <meta name="theme-color" content="#0a0f1a" />
      <meta name="msapplication-TileColor" content="#0a0f1a" />
      <meta name="format-detection" content="telephone=no" />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(structuredData || organizationSchema)}
      </script>
      <script type="application/ld+json">
        {JSON.stringify(serviceSchema)}
      </script>
    </Helmet>
  );
};

export default SEO;
