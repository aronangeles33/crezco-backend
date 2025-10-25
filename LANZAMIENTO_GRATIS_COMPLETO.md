// components/SEO.tsx
// Componente reutilizable para SEO en todas las páginas

import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
}

export default function SEO({
  title = 'Crezco - Plataforma de Crowdfunding para Emprendedores',
  description = 'Impulsa tu proyecto en Crezco. Conecta emprendedores con inversionistas y haz realidad tus sueños. Crea tu campaña gratis y recibe donaciones seguras.',
  image = '/og-image.jpg',
  url = 'https://tudominio.com',
  type = 'website',
  keywords = [
    'crowdfunding',
    'emprendimiento',
    'inversión',
    'proyectos',
    'donaciones',
    'startup',
    'financiamiento',
    'emprendedores'
  ],
  author = 'Crezco',
  publishedTime,
  modifiedTime
}: SEOProps) {
  const fullTitle = title.includes('Crezco') ? title : `${title} | Crezco`;
  const fullUrl = url.startsWith('http') ? url : `https://tudominio.com${url}`;
  const fullImage = image.startsWith('http') ? image : `https://tudominio.com${image}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="Spanish" />
      <meta name="revisit-after" content="7 days" />

      {/* Canonical URL */}
      <link rel="canonical" href={fullUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={fullUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content="Crezco" />
      <meta property="og:locale" content="es_ES" />

      {/* Article specific tags */}
      {type === 'article' && publishedTime && (
        <meta property="article:published_time" content={publishedTime} />
      )}
      {type === 'article' && modifiedTime && (
        <meta property="article:modified_time" content={modifiedTime} />
      )}
      {type === 'article' && author && (
        <meta property="article:author" content={author} />
      )}

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:creator" content="@crezco" />

      {/* Additional SEO */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="Crezco" />

      {/* Geo Tags */}
      <meta name="geo.region" content="ES" />
      <meta name="geo.placename" content="España" />

      {/* Verification (agregar cuando tengas las cuentas) */}
      {/* <meta name="google-site-verification" content="tu_codigo_aqui" /> */}
      {/* <meta name="facebook-domain-verification" content="tu_codigo_aqui" /> */}
    </Head>
  );
}
