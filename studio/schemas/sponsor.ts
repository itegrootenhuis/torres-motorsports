import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'sponsor',
  title: 'Sponsor',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Logo',
      type: 'image',
      description: 'Sponsor logo image. Recommended: transparent PNG with 3:2 aspect ratio',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'altText',
      title: 'Alt Text',
      type: 'string',
      description: 'Sponsor name for accessibility (e.g., "Toyota")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'link',
      title: 'Website Link',
      type: 'url',
      description: 'Link to sponsor website (optional)',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first. Leave empty for default ordering.',
    }),
  ],
  orderings: [
    {
      title: 'Display Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'altText',
      order: 'order',
      media: 'image',
    },
    prepare({ title, order, media }) {
      return {
        title: title || 'Untitled Sponsor',
        subtitle: order !== undefined ? `Order: ${order}` : 'No order set',
        media,
      };
    },
  },
});
