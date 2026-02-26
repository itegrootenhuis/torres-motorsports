import { defineType, defineField } from 'sanity';

export default defineType({
  name: 'scheduleEvent',
  title: 'Schedule Event',
  type: 'document',
  fields: [
    defineField({
      name: 'raceName',
      title: 'Race Name',
      type: 'string',
      description: 'Name of the race event',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'startDate',
      title: 'Start Date',
      type: 'date',
      description: 'Start date of the race',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'End date of the race',
      validation: (Rule) => Rule.required(),
    }),
  ],
  orderings: [
    {
      title: 'Date, Upcoming',
      name: 'dateAsc',
      by: [{ field: 'startDate', direction: 'asc' }],
    },
  ],
  preview: {
    select: {
      title: 'raceName',
      startDate: 'startDate',
      endDate: 'endDate',
    },
    prepare({ title, startDate, endDate }) {
      const formatDate = (date: string) => 
        new Date(date + 'T00:00:00').toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      let subtitle = 'No dates';
      if (startDate && endDate) {
        subtitle = `${formatDate(startDate)} - ${formatDate(endDate)}`;
      } else if (startDate) {
        subtitle = formatDate(startDate);
      }
      
      return {
        title: title || 'Untitled Event',
        subtitle,
      };
    },
  },
});
