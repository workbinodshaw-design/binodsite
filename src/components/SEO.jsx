import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, url }) => {
  const siteName = "CastFlow";
  const defaultDescription = "CastFlow is a premier Web Development and AI Automation Agency based in India. We build high-performance web applications, automate business workflows, and develop autonomous AI systems that drive growth globally.";
  const defaultKeywords = "Web Developer, AI Automation Services, React Developer India, Custom CRM Development, AI Agent Developer, n8n Automation, Make.com Expert, Full Stack Web Development India, MVP Development";

  const seoTitle = title ? `${title} | ${siteName}` : siteName;
  const seoDescription = description || defaultDescription;
  const seoKeywords = keywords || defaultKeywords;
  const canonicalUrl = `https://castflow.in${url || ''}`;

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seoTitle}</title>
      <meta name="description" content={seoDescription} />
      <meta name="keywords" content={seoKeywords} />
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
    </Helmet>
  );
};

export default SEO;
