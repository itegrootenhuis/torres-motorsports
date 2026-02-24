import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Main site logo displayed in the header',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Media Links',
      type: 'object',
      description: 'Links to social media profiles (all optional)',
      fields: [
        defineField({
          name: 'tiktok',
          title: 'TikTok URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        }),
        defineField({
          name: 'youtube',
          title: 'YouTube URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        }),
        defineField({
          name: 'facebook',
          title: 'Facebook URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        }),
        defineField({
          name: 'twitter',
          title: 'Twitter/X URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        }),
        defineField({
          name: 'instagram',
          title: 'Instagram URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        }),
        defineField({
          name: 'threads',
          title: 'Threads URL',
          type: 'url',
          validation: (Rule) =>
            Rule.uri({
              scheme: ['http', 'https'],
            }),
        }),
      ],
    }),
    defineField({
      name: 'footerLogo',
      title: 'Footer Logo',
      type: 'image',
      description: 'Logo displayed in the footer (uses main logo if not set)',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'footerText',
      title: 'Footer Text',
      type: 'text',
      description: 'Text displayed next to the footer logo',
      rows: 2,
    }),
    defineField({
      name: 'privacyPolicyPage',
      title: 'Privacy Policy Page',
      type: 'reference',
      to: [{ type: 'legalPage' }],
      description: 'Link to the Privacy Policy page (optional)',
    }),
    defineField({
      name: 'termsOfUsePage',
      title: 'Terms of Use Page',
      type: 'reference',
      to: [{ type: 'legalPage' }],
      description: 'Link to the Terms of Use page (optional)',
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Site Settings',
      };
    },
  },
});
