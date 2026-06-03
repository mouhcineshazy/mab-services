const BASE_URL = 'https://mabservices-ca.com';

const ORGANIZATION = {
  '@type': ['FinancialService', 'LocalBusiness'],
  '@id': `${BASE_URL}/#organization`,
  name: 'MAB Services',
  url: BASE_URL,
  telephone: '+16132614428',
  email: 'sales@mabservices-ca.com',
};

const PERSON = {
  '@type': 'Person',
  '@id': `${BASE_URL}/#person`,
  name: 'Mohammed Amine BENZAKOUR',
  jobTitle: 'Conseiller en sécurité financière & Courtier en assurance de personnes',
  worksFor: { '@id': `${BASE_URL}/#organization` },
};

export function localBusinessSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    ...ORGANIZATION,
    alternateName: 'MAB Services – Mohammed Amine BENZAKOUR',
    description:
      locale === 'fr'
        ? 'Courtier en assurance de personnes et conseiller en sécurité financière au Québec et en Ontario. Solutions en assurance vie, REER, CELI, CELIAPP, REEE et REEI. Consultation 100 % gratuite.'
        : 'Life insurance broker and financial security advisor in Québec and Ontario. Solutions in life insurance, RRSP, TFSA, FHSA, RESP and RDSP. 100% free consultation.',
    founder: PERSON,
    employee: PERSON,
    areaServed: [
      { '@type': 'AdministrativeArea', name: 'Québec',  sameAs: 'https://www.wikidata.org/wiki/Q176' },
      { '@type': 'AdministrativeArea', name: 'Ontario', sameAs: 'https://www.wikidata.org/wiki/Q1904' },
    ],
    knowsAbout: [
      'Assurance vie temporaire', 'Assurance vie permanente', 'Assurance invalidité', 'Assurance maladies graves',
      'REER', 'CELI', 'CELIAPP', 'REEE', 'REEI',
      'Term life insurance', 'Permanent life insurance', 'Disability insurance', 'Critical illness',
      'RRSP', 'TFSA', 'FHSA', 'RESP', 'RDSP',
    ],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional License',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Autorité des marchés financiers (AMF)',
          url: 'https://lautorite.qc.ca',
        },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional License',
        recognizedBy: {
          '@type': 'Organization',
          name: 'Financial Services Regulatory Authority of Ontario (FSRA)',
          url: 'https://www.fsrao.ca',
        },
      },
    ],
    inLanguage: ['fr-CA', 'en-CA'],
    priceRange: 'Free consultation',
    sameAs: [],
  };
}

export function personSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${BASE_URL}/#person`,
    name: 'Mohammed Amine BENZAKOUR',
    jobTitle: 'Conseiller en sécurité financière & Courtier en assurance de personnes',
    description:
      'Courtier en assurance de personnes agréé par la FSRA (Ontario) et conseiller en sécurité financière agréé par l\'AMF (Québec).',
    worksFor: { '@id': `${BASE_URL}/#organization` },
    url: `${BASE_URL}/fr/a-propos`,
    telephone: '+16132614428',
    email: 'sales@mabservices-ca.com',
    knowsAbout: ['Assurance vie', 'Épargne', 'Investissement', 'REER', 'CELI', 'Planification financière'],
    hasCredential: [
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional License',
        recognizedBy: { '@type': 'Organization', name: 'AMF Québec', url: 'https://lautorite.qc.ca' },
      },
      {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Professional License',
        recognizedBy: { '@type': 'Organization', name: 'FSRA Ontario', url: 'https://www.fsrao.ca' },
      },
    ],
  };
}

export function insuranceServiceSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Insurance Brokerage',
    name: locale === 'fr' ? 'Assurance & Protection' : 'Insurance & Protection',
    description:
      locale === 'fr'
        ? 'Solutions d\'assurance vie temporaire, permanente, invalidité et maladies graves pour particuliers au Québec et en Ontario.'
        : 'Term life, permanent life, disability and critical illness insurance for individuals in Québec and Ontario.',
    url: `${BASE_URL}/${locale}/assurance-protection`,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: ['Québec', 'Ontario'],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD', description: 'Free consultation' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'fr' ? 'Produits d\'assurance' : 'Insurance products',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'Assurance vie temporaire' : 'Term Life Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'Assurance vie permanente' : 'Permanent Life Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'Assurance invalidité' : 'Disability Insurance' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'Assurance maladies graves' : 'Critical Illness Insurance' } },
      ],
    },
  };
}

export function savingsServiceSchema(locale: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'Financial Advisory',
    name: locale === 'fr' ? 'Épargne & Investissement' : 'Savings & Investment',
    description:
      locale === 'fr'
        ? 'Conseil et mise en place de régimes enregistrés (REER, CELI, CELIAPP, REEE, REEI) au Québec et en Ontario.'
        : 'Advice and setup of registered plans (RRSP, TFSA, FHSA, RESP, RDSP) in Québec and Ontario.',
    url: `${BASE_URL}/${locale}/epargne-investissement`,
    provider: { '@id': `${BASE_URL}/#organization` },
    areaServed: ['Québec', 'Ontario'],
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'CAD', description: 'Free consultation' },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: locale === 'fr' ? 'Régimes d\'épargne enregistrés' : 'Registered savings plans',
      itemListElement: [
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'CELI' : 'TFSA' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'CELIAPP' : 'FHSA' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'REER' : 'RRSP' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'REEE' : 'RESP' } },
        { '@type': 'Offer', itemOffered: { '@type': 'Service', name: locale === 'fr' ? 'REEI' : 'RDSP' } },
      ],
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function webSiteSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BASE_URL}/#website`,
    name: 'MAB Services',
    url: BASE_URL,
    publisher: { '@id': `${BASE_URL}/#organization` },
    inLanguage: ['fr-CA', 'en-CA'],
    potentialAction: {
      '@type': 'SearchAction',
      target: { '@type': 'EntryPoint', urlTemplate: `${BASE_URL}/fr/contact` },
      'query-input': 'required name=search_term_string',
    },
  };
}
