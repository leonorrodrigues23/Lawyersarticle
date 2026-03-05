// ╔═══════════════════════════════════════════════════════════════╗
// ║  👤 AUTHOR SYSTEM - Automatic author selection for articles   ║
// ╚═══════════════════════════════════════════════════════════════╝

export interface Author {
  name: string;
  title: string;
  image: string;
  bio: string;
}

const authors: Record<string, Author> = {
  'rachel-adams': {
    name: 'Rachel Adams',
    title: 'Legal Services Editor',
    image: '/images/Authors images of the review articles/rachel-adams.jpg',
    bio: 'Former paralegal turned consumer advocate with expertise in online legal services. Rachel has helped thousands of individuals and small businesses find affordable legal solutions without overspending on traditional law firms.'
  },
  'david-martinez': {
    name: 'David Martinez',
    title: 'Senior Legal Writer',
    image: '/images/Authors images of the review articles/david-martinez.jpg',
    bio: 'JD holder and legal technology analyst who has reviewed over 300 online legal platforms. David specializes in making complex legal topics accessible to everyday consumers.'
  },
  'sarah-thompson': {
    name: 'Sarah Thompson',
    title: 'Business Law Analyst',
    image: '/images/Authors images of the review articles/sarah-thompson.jpg',
    bio: 'Former small business attorney with 12 years of experience in corporate formation and compliance. Sarah now focuses on evaluating digital legal services that help entrepreneurs launch and protect their businesses.'
  }
};

const categoryAuthors: Record<string, string[]> = {
  'legal services': ['rachel-adams', 'david-martinez', 'sarah-thompson'],
  'online legal': ['rachel-adams', 'david-martinez'],
  'business law': ['sarah-thompson', 'david-martinez'],
  'estate planning': ['david-martinez', 'rachel-adams'],
  'family law': ['rachel-adams', 'sarah-thompson'],
  'legal tech': ['david-martinez', 'sarah-thompson'],
  'default': ['rachel-adams', 'david-martinez']
};

export function getAuthorByCategory(
  category: string,
  title: string = '',
  keywords: string[] = []
): Author {
  const normalizedCategory = category.toLowerCase();
  const normalizedTitle = title.toLowerCase();
  const normalizedKeywords = keywords.map(k => k.toLowerCase());

  if (
    normalizedCategory.includes('legal') ||
    normalizedTitle.includes('legal') ||
    normalizedKeywords.some(k => k.includes('legal'))
  ) {
    const legalAuthors = categoryAuthors['legal services'];
    const authorKey = legalAuthors[0];
    return authors[authorKey] || authors['rachel-adams'];
  }

  if (
    normalizedCategory.includes('business') ||
    normalizedTitle.includes('business') ||
    normalizedKeywords.some(k => ['business', 'llc', 'incorporation'].includes(k))
  ) {
    const authorKey = categoryAuthors['business law'][0];
    return authors[authorKey] || authors['sarah-thompson'];
  }

  for (const [key, authorKeys] of Object.entries(categoryAuthors)) {
    if (normalizedCategory.includes(key)) {
      return authors[authorKeys[0]] || authors['rachel-adams'];
    }
  }

  return authors['rachel-adams'];
}

export function getAuthorByKey(authorKey: string): Author {
  return authors[authorKey] || authors['rachel-adams'];
}

export function getAllAuthors(): Record<string, Author> {
  return authors;
}
