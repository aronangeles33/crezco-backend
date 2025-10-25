import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: 'website' | 'article' | 'profile';
  keywords?: string[];
  author?: string;
}

export default function SEO({
  title = 'Crezco - Plataforma de Crowdfunding para Emprendedores',
  description = 'Impulsa tu proyecto en Crezco. Conecta emprendedores con inversionistas y haz realidad tus sueños. Crea tu campaña gratis y recibe donaciones seguras.',
  image = '/og-image.jpg',
  url = '/',
  type = 'website',
  keywords = [
    'crowdfunding',
    'crowdfunding españa',
    'financiar proyecto',
    'emprendimiento',
    'inversión',
    'proyectos emprendedores',
    'donaciones online',
    'startup españa',
    'financiamiento colectivo',
    'plataforma emprendedores'
  ],
  author = 'Crezco'
}: SEOProps) {
  const siteName = 'Crezco';
  const fullTitle = title.includes(siteName) ? title : `${title} | ${siteName}`;
  const domain = process.env.NEXT_PUBLIC_DOMAIN || 'https://tudominio.com';
  const fullUrl = `${domain}${url}`;
  const fullImage = image.startsWith('http') ? image : `${domain}${image}`;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
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
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:locale" content="es_ES" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={fullUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullImage} />
      <meta name="twitter:image:alt" content={title} />
      <meta name="twitter:creator" content="@crezco" />
      <meta name="twitter:site" content="@crezco" />

      {/* PWA */}
      <meta name="theme-color" content="#6366f1" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content={siteName} />

      {/* Geo Tags */}
      <meta name="geo.region" content="ES" />
      <meta name="geo.placename" content="España" />
    </Head>
  );
}
