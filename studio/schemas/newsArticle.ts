import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'newsArticle',
  title: 'News Article',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Featured Image',
      type: 'image',
      description: 'Article thumbnail image. Recommended ratio: 16:9',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Publication Date',
      type: 'date',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'externalLink',
      title: 'External Link',
      type: 'url',
      description: 'Link to the full article (external website)',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
  ],
  orderings: [
    {
      title: 'Publication Date, New',
      name: 'dateDesc',
      by: [{ field: 'date', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      date: 'date',
      media: 'image',
    },
    prepare({ title, date, media }) {
      return {
        title,
        subtitle: date ? new Date(date).toLocaleDateString() : 'No date',
        media,
      };
    },
  },
});
