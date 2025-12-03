'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Message sent successfully!');
    setTimeout(() => setStatus(''), 3000);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get In Touch
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Have a question or want to work together? I'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <Mail className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                    <a 
                      href="mailto:Hammadshah7218@gmail.com"
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      Hammadshah7218@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <Phone className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Phone</h3>
                    <a 
                      href="tel:+923192373122"
                      className="text-gray-700 hover:text-blue-600 transition"
                    >
                      +92 319 2373122
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-blue-50 rounded-lg hover:bg-blue-100 transition">
                  <MapPin className="text-blue-600 mt-1 flex-shrink-0" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Location</h3>
                    <p className="text-gray-700">Pakistan</p>
                  </div>
                </div>
              </div>

              <div className="mt-10">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Connect Online</h3>
                <div className="flex gap-4">
                  <a
                    href="https://www.hammadshah.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                  >
                    Portfolio
                  </a>
                  <a
                    href="https://linkedin.com/in/hammad-shah-90741b25b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                  >
                    LinkedIn
                  </a>
                  <a
                    href="https://github.com/hammadshah18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 border-2 border-gray-600 text-gray-600 rounded-lg font-semibold hover:bg-gray-600 hover:text-white transition"
                  >
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                    placeholder="john@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition"
                    placeholder="Project Inquiry"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition resize-none"
                    placeholder="Tell me about your project or question..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center gap-2"
                >
                  <Send size={20} />
                  Send Message
                </button>

                {status && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-center">
                    {status}
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Assistant. All rights reserved.</p>
            <p className="mt-2">Created by Muhammad Hammad</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
