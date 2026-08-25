import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url }) => {
  const siteName = "CastFlow";
  const defaultDescription = "CastFlow is a premier Digital Marketing and AI Automation Agency founded by Binod Shaw. We build high-performance web applications, automate business workflows, and develop autonomous AI systems that drive growth globally.";
  const defaultKeywords = "Digital Marketing Agency, AI Automation Services, React Developer India, Binod Shaw, Custom CRM Development, AI Agent Developer, n8n Automation, Make.com Expert, Full Stack Web Development";

  const seoTitle = title ? `${title} | ${siteName}` : siteName;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const canonicalUrl = `https://www.castflow.in${url || ''}`;

  // Organization Schema for Google Knowledge Graph
  const schemaOrgJSONLD = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "CastFlow",
    "url": "https://www.castflow.in",
    "logo": "https://www.castflow.in/logo.png",
    "description": seoDescription,
    "founder": {
      "@type": "Person",
      "name": "Binod Shaw",
      "jobTitle": "Founder & CEO"
    },
    "sameAs": [
      "https://www.linkedin.com/company/castflow",
      "https://twitter.com/castflow"
    ]
  };

  // Person Schema for Binod Shaw (Founder Knowledge Graph)
  const schemaPersonJSONLD = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Binod Shaw",
    "jobTitle": "Founder & CEO",
    "worksFor": {
      "@type": "Organization",
      "name": "CastFlow"
    },
    "url": "https://www.castflow.in",
    "image": "https://www.castflow.in/binod-profile.png",
    "sameAs": [
      "https://github.com/workbinodshaw-design",
      "https://www.linkedin.com/in/binodshaw"
    ],
    "description": "Binod Shaw is the Founder and CEO of CastFlow, a Digital Marketing and AI Automation Agency. He is a full-stack developer, AI automation expert, and tech entrepreneur."
  };

  // Professional Service / Agency Schema for SEO
  const schemaServiceJSONLD = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "CastFlow",
    "image": "https://www.castflow.in/logo.png",
    "url": "https://www.castflow.in",
    "priceRange": "$$",
    "description": "Top Web Development, Digital Marketing, and AI Automation Agency. We build premium websites and run scalable marketing campaigns.",
    "areaServed": ["India", "United States", "United Kingdom", "Global"],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Agency Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Web Development Services",
            "description": "Custom website development, React/Next.js web apps, and eCommerce solutions."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Digital Marketing Services",
            "description": "SEO, Social Media Marketing, Performance Marketing, and Growth Hacking."
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "AI Automation Agency Services",
            "description": "Business process automation, intelligent chatbots, and AI integration."
          }
        }
      ]
    }
  };

  // Combine schemas
  const schemas = [schemaOrgJSONLD, schemaPersonJSONLD, schemaServiceJSONLD];

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
      <meta name="author" content="Binod Shaw" />
      <link rel="canonical" href={canonicalUrl} />

      {/* OpenGraph tags (for Facebook, LinkedIn, etc.) */}
      <meta property="og:title" content={seoTitle} />
      <meta property="og:description" content={seoDescription} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seoTitle} />
      <meta name="twitter:description" content={seoDescription} />

      {/* Inject JSON-LD Schema explicitly on every page load */}
      <script type="application/ld+json">
        {JSON.stringify(schemas)}
      </script>
    </Helmet>
  );
};

export default SEO;
