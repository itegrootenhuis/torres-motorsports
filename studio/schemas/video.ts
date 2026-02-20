import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
  fields: [
    defineField({
      name: 'youtubeUrl',
      title: 'YouTube URL',
      type: 'url',
      description: 'Paste the full YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID)',
      validation: (Rule) =>
        Rule.required().uri({
          scheme: ['http', 'https'],
        }).custom((url) => {
          if (!url) return true;
          const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/;
          if (!youtubeRegex.test(url)) {
            return 'Please enter a valid YouTube URL';
          }
          return true;
        }),
    }),
  ],
  preview: {
    select: {
      url: 'youtubeUrl',
    },
    prepare({ url }) {
      return {
        title: url || 'No URL',
      };
    },
  },
});
