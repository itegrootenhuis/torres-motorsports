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
      description: 'Paste the full YouTube URL (e.g., https://www.youtube.com/watch?v=VIDEO_ID or https://youtu.be/VIDEO_ID). Leave empty if uploading a video file.',
      validation: (Rule) =>
        Rule.uri({
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
    defineField({
      name: 'videoFile',
      title: 'Video File',
      type: 'file',
      description: 'Upload a video file directly (MP4, WebM, etc.). Leave empty if using YouTube URL.',
      options: {
        accept: 'video/*',
      },
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      description: 'Custom thumbnail for uploaded videos. Required if uploading a video file, optional for YouTube videos.',
      options: {
        hotspot: true,
      },
    }),
  ],
  validation: (Rule) =>
    Rule.custom((fields) => {
      const hasYoutube = fields?.youtubeUrl;
      const hasVideoFile = fields?.videoFile;
      if (!hasYoutube && !hasVideoFile) {
        return 'Please provide either a YouTube URL or upload a video file';
      }
      return true;
    }),
  preview: {
    select: {
      url: 'youtubeUrl',
      file: 'videoFile',
      thumbnail: 'thumbnail',
    },
    prepare({ url, file, thumbnail }) {
      const title = url ? url : (file ? 'Uploaded Video' : 'No video');
      return {
        title,
        media: thumbnail,
      };
    },
  },
});
