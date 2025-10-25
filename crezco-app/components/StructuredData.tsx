import Head from 'next/head';

interface OrganizationSchema {
  name: string;
  url: string;
  logo: string;
  description: string;
  foundingDate?: string;
  contactPoint?: {
    email: string;
    contactType: string;
  };
}

export function OrganizationStructuredData({ data }: { data: OrganizationSchema }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: data.name,
    url: data.url,
    logo: data.logo,
    description: data.description,
    foundingDate: data.foundingDate,
    contactPoint: data.contactPoint ? {
      '@type': 'ContactPoint',
      email: data.contactPoint.email,
      contactType: data.contactPoint.contactType
    } : undefined,
    sameAs: [
      'https://facebook.com/crezco',
      'https://twitter.com/crezco',
      'https://instagram.com/crezco'
    ]
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

export function ProjectStructuredData({ project }: { project: any }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: project.title,
    image: project.image,
    description: project.description,
    offers: {
      '@type': 'Offer',
      url: `${process.env.NEXT_PUBLIC_DOMAIN}/proyecto/${project.slug}`,
      priceCurrency: 'EUR',
      price: project.goalAmount,
      availability: project.isActive ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock'
    },
    aggregateRating: project.reviews?.length > 0 ? {
      '@type': 'AggregateRating',
      ratingValue: project.averageRating,
      reviewCount: project.reviews.length
    } : undefined
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}

export function BreadcrumbStructuredData({ items }: { items: Array<{ name: string; url: string }> }) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  };

  return (
    <Head>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </Head>
  );
}
