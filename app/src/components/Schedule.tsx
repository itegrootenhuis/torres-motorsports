'use client';

import { motion } from 'framer-motion';
import { ScheduleEvent } from '@/types';

interface ScheduleProps {
  events: ScheduleEvent[];
}

function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}

function formatDateRange(startDate: string, endDate: string): string {
  const [startYear, startMonth, startDay] = startDate.split('-').map(Number);
  const [endYear, endMonth, endDay] = endDate.split('-').map(Number);
  const start = new Date(startYear, startMonth - 1, startDay);
  const end = new Date(endYear, endMonth - 1, endDay);
  
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const startMonthName = monthNames[startMonth - 1];
  const endMonthName = monthNames[endMonth - 1];
  
  // Same day
  if (startYear === endYear && startMonth === endMonth && startDay === endDay) {
    return `${startMonthName} ${startDay}, ${startYear}`;
  }
  
  // Same month and year: "Mar 4 - 8, 2026"
  if (startYear === endYear && startMonth === endMonth) {
    return `${startMonthName} ${startDay} - ${endDay}, ${startYear}`;
  }
  
  // Same year, different months: "Nov 30 - Dec 2, 2026"
  if (startYear === endYear) {
    return `${startMonthName} ${startDay} - ${endMonthName} ${endDay}, ${startYear}`;
  }
  
  // Different years: "Dec 30, 2025 - Jan 2, 2026"
  return `${startMonthName} ${startDay}, ${startYear} - ${endMonthName} ${endDay}, ${endYear}`;
}

export default function Schedule({ events }: ScheduleProps) {
  if (!events || events.length === 0) return null;

  return (
    <section id="schedule" className="section-padding bg-primary-black">
      <div className="container-custom mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center mb-12 uppercase"
        >
          Upcoming Schedule
        </motion.h2>

        <div className="max-w-3xl mx-auto">
          {events.map((event, index) => (
            <motion.div
              key={event._id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="grid grid-cols-[200px_1fr] items-center py-4 border-b border-zinc-800 last:border-b-0"
            >
              <div className="text-primary-red font-bold text-lg">
                {formatDateRange(event.startDate, event.endDate)}
              </div>
              <div className="text-white text-lg font-medium">
                {event.raceName}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
