'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { FaTimes } from 'react-icons/fa';
import { ContactFormData, ContactSection } from '@/types';

interface ContactFormProps {
  contactSection?: ContactSection;
}

export default function ContactForm({ contactSection }: ContactFormProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const openModal = () => {
    setIsModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = '';
    setSubmitStatus('idle');
  };

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TODO: Implement form submission endpoint
      // For now, simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // reCAPTCHA v3 integration (commented out for now)
      // const recaptchaToken = await grecaptcha.execute('YOUR_SITE_KEY', { action: 'contact' });
      // Include recaptchaToken in your API call

      console.log('Form submitted:', data);
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Form submission error:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding bg-primary-black">
      <div className="container-custom mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6 }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 uppercase"
        >
          {contactSection?.title || 'Get In Touch'}
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-gray-400 mb-8 max-w-2xl mx-auto"
        >
          {contactSection?.body || "Interested in sponsorship opportunities, media inquiries, or just want to connect? We'd love to hear from you."}
        </motion.p>
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onClick={openModal}
          className="btn-primary text-lg"
        >
          {contactSection?.buttonText || 'Contact Us'}
        </motion.button>
      </div>

      {/* Contact Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-zinc-900 rounded-lg w-full max-w-lg max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between p-6 border-b border-zinc-700">
                <h3 className="text-2xl font-bold text-white">Contact Us</h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-white transition-colors"
                  aria-label="Close modal"
                >
                  <FaTimes className="w-6 h-6" />
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <input
                      {...register('firstName', { required: 'First name is required' })}
                      type="text"
                      placeholder="First Name *"
                      className={`w-full px-4 py-3 bg-zinc-800 border rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-red ${
                        errors.firstName ? 'border-red-500' : 'border-zinc-700'
                      }`}
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  <div>
                    <input
                      {...register('lastName', { required: 'Last name is required' })}
                      type="text"
                      placeholder="Last Name *"
                      className={`w-full px-4 py-3 bg-zinc-800 border rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-red ${
                        errors.lastName ? 'border-red-500' : 'border-zinc-700'
                      }`}
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <input
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Invalid email address',
                      },
                    })}
                    type="email"
                    placeholder="Email *"
                    className={`w-full px-4 py-3 bg-zinc-800 border rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-red ${
                      errors.email ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <input
                    {...register('phone', { required: 'Phone number is required' })}
                    type="tel"
                    placeholder="Phone *"
                    className={`w-full px-4 py-3 bg-zinc-800 border rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-red ${
                      errors.phone ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Company (Optional) */}
                <div>
                  <input
                    {...register('company')}
                    type="text"
                    placeholder="Company (Optional)"
                    className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-red"
                  />
                </div>

                {/* Details */}
                <div>
                  <textarea
                    {...register('details', { required: 'Please provide some details' })}
                    placeholder="Details *"
                    rows={4}
                    className={`w-full px-4 py-3 bg-zinc-800 border rounded-md text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-red resize-none ${
                      errors.details ? 'border-red-500' : 'border-zinc-700'
                    }`}
                  />
                  {errors.details && (
                    <p className="text-red-500 text-sm mt-1">{errors.details.message}</p>
                  )}
                </div>

                {/* reCAPTCHA Notice (commented out for now) */}
                {/* 
                <p className="text-xs text-gray-500">
                  This site is protected by reCAPTCHA and the Google{' '}
                  <a href="https://policies.google.com/privacy" className="underline">Privacy Policy</a> and{' '}
                  <a href="https://policies.google.com/terms" className="underline">Terms of Service</a> apply.
                </p>
                */}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <p className="text-green-500 text-center">
                    Thank you! Your message has been sent successfully.
                  </p>
                )}
                {submitStatus === 'error' && (
                  <p className="text-red-500 text-center">
                    Something went wrong. Please try again later.
                  </p>
                )}
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
