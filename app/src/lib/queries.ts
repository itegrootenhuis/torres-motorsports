import { groq } from 'next-sanity';

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    _id,
    _type,
    logo,
    footerLogo,
    footerText,
    socialLinks,
    "privacyPolicyPage": privacyPolicyPage->{
      _id,
      _type,
      title,
      slug
    },
    "termsOfUsePage": termsOfUsePage->{
      _id,
      _type,
      title,
      slug
    }
  }
`;

export const heroQuery = groq`
  *[_type == "hero"][0] {
    _id,
    _type,
    image
  }
`;

export const bioQuery = groq`
  *[_type == "bio"][0] {
    _id,
    _type,
    image,
    heading,
    body
  }
`;

export const newsArticlesQuery = groq`
  *[_type == "newsArticle"] | order(date desc)[0...3] {
    _id,
    _type,
    title,
    body,
    image,
    date,
    externalLink
  }
`;

export const videosQuery = groq`
  *[_type == "video"] | order(_createdAt desc) {
    _id,
    _type,
    youtubeUrl
  }
`;

export const galleryImagesQuery = groq`
  *[_type == "galleryImage"] | order(order asc, _createdAt desc) {
    _id,
    _type,
    image,
    altText,
    order
  }
`;

export const sponsorsQuery = groq`
  *[_type == "sponsor"] | order(order asc, _createdAt asc) {
    _id,
    _type,
    image,
    altText,
    link,
    order
  }
`;

export const legalPageQuery = groq`
  *[_type == "legalPage" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    body
  }
`;

export const contactSectionQuery = groq`
  *[_type == "contactSection"][0] {
    _id,
    _type,
    title,
    body,
    buttonText
  }
`;

export const homePageQuery = groq`
  {
    "siteSettings": ${siteSettingsQuery},
    "hero": ${heroQuery},
    "bio": ${bioQuery},
    "newsArticles": ${newsArticlesQuery},
    "videos": ${videosQuery},
    "galleryImages": ${galleryImagesQuery},
    "sponsors": ${sponsorsQuery},
    "contactSection": ${contactSectionQuery}
  }
`;
