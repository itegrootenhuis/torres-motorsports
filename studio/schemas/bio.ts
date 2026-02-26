import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'bio',
  title: 'Bio Section',
  type: 'document',
  fields: [
    defineField({
      name: 'image',
      title: 'Bio Image',
      type: 'image',
      description: 'Optional image displayed alongside the bio text. If not provided, text will be centered.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      description: 'Section heading (e.g., "RICARDO TORRES")',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
          ],
          marks: {
            decorators: [
              { title: 'Bold', value: 'strong' },
              { title: 'Italic', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'heading',
      media: 'image',
    },
    prepare({ title, media }) {
      return {
        title: title || 'Bio Section',
        media,
      };
    },
  },
});
