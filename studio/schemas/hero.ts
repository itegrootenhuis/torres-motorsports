import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'hero',
  title: 'Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      description: 'Main hero background image. Recommended ratio: 16:9 (1920x1080 or larger)',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      media: 'image',
    },
    prepare({ media }) {
      return {
        title: 'Hero Section',
        media,
      };
    },
  },
});
