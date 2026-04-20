import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url }) => {
  const siteName = "Super Napier";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Quality Grass Seed and Agricultural Products from Super Napier. Best fodder solutions for your livestock.";
  
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || "agriculture, fodder, grass seed, super napier, livestock feed"} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {image && <meta property="og:image" content={image} />}
      {url && <meta property="og:url" content={url} />}
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {image && <meta name="twitter:image" content={image} />}

      {/* Canonical Link */}
      {url && <link rel="canonical" href={url} />}
    </Helmet>
  );
};

export default SEO;
