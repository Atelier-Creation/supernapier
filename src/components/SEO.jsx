import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ title, description, keywords, image, url, type = 'website' }) => {
  const siteName = "Super Napier";
  const fullTitle = title ? `${title} | ${siteName}` : siteName;
  const defaultDescription = "Quality Grass Seed and Agricultural Products from Super Napier. Best fodder solutions for your livestock.";
  
  // Ensure image URL is absolute
  let absoluteImage = image;
  if (image && typeof window !== 'undefined' && !/^https?:\/\//i.test(image)) {
    absoluteImage = `${window.location.origin}${image.startsWith('/') ? '' : '/'}${image}`;
  }

  const canonicalUrl = url || (typeof window !== 'undefined' ? window.location.href : '');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || "agriculture, fodder, grass seed, super napier, livestock feed"} />

      {/* Open Graph / Facebook / WhatsApp */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      {absoluteImage && <meta property="og:image" content={absoluteImage} />}
      {absoluteImage && <meta property="og:image:secure_url" content={absoluteImage} />}
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {/* Twitter / X */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      {absoluteImage && <meta name="twitter:image" content={absoluteImage} />}

      {/* Canonical Link */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
    </Helmet>
  );
};

export default SEO;
