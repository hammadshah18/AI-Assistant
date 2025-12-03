'use client';
import React from 'react';
import Link from 'next/link';
import { Navbar } from '../../components/Navbar';
import { Mail, MapPin, Code } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="bg-blue-50 py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            About AI Assistant
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Intelligent coding assistance powered by advanced AI technology, created to help
            developers code faster, smarter, and better.
          </p>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-start md:gap-12">
            <div className="md:flex-shrink-0 mb-8 md:mb-0 md:mr-6 flex justify-center md:justify-start">
              <div className="w-72 h-72 rounded-3xl overflow-hidden shadow-2xl border-4 border-blue-600">
                <img
                  src="/photo1.jpg"
                  alt="Muhammad Hammad"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio Content */}
            <div className="flex-1">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Muhammad Hammad
              </h2>

              <div className="space-y-6 text-lg text-gray-700 leading-relaxed">
                <p>
                  Muhammad Hammad is a passionate AI developer with a deep interest in
                  artificial intelligence and machine learning. With over 2+ years of experience
                  in Data Science and AI Development, he's dedicated to creating tools
                  that empower developers worldwide.
                </p>

                <p>
                  The idea for this AI Assistant came from a simple observation: developers spend
                  significant time on repetitive coding tasks, debugging, and documentation. By
                  leveraging modern AI, Hammad envisioned a tool that could handle these tasks
                  intelligently, allowing developers to focus on what matters most—building great
                  products.
                </p>

                <p>
                  With expertise in:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>AI development (Python,Scikit-Learn,TensorFlow,Langchain,API Integration,FastAPI)</li>
                  <li>AI and Machine Learning integration</li>
                  <li>Gen AI Application</li>
                  <li>Data Science and Analytics</li>
                  <li>Software architecture and design patterns</li>
                </ul>

                <p>
                  Hammad continues to build tools and solutions that bridge the gap between
                  developers and advanced technology, making AI accessible and practical for
                  everyday development challenges.
                </p>
              </div>

              <div className="mt-10 space-y-4">
                <h3 className="text-2xl font-bold text-gray-900">Connect with Muhammad</h3>
                <div className="space-y-3">
                  <a
                    href="https://www.hammadshah.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    <Code size={20} /> Portfolio: www.hammadshah.me
                  </a>
                  <a
                    href="https://linkedin.com/in/hammad-shah-90741b25b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    <MapPin size={20} /> LinkedIn: hammad-shah-90741b25b
                  </a>
                  <a
                    href="https://github.com/hammadshah18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    <Code size={20} /> GitHub: @hammadshah18
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-blue-50 py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-8 text-center">
            Our Mission
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Empower</h3>
              <p className="text-gray-700">
                Give developers intelligent tools that help them code more efficiently and
                effectively.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Educate</h3>
              <p className="text-gray-700">
                Help developers learn best practices through AI-powered code analysis and
                feedback.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition">
              <h3 className="text-2xl font-bold text-blue-600 mb-4">Innovate</h3>
              <p className="text-gray-700">
                Continuously improve and expand AI capabilities to solve real developer problems.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 md:py-32">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-12 text-center">
            Built With Modern Technology
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Frontend</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Next.js 14 (App Router)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> React 18
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Tailwind CSS
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> React Markdown
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Backend</h3>
              <ul className="space-y-3 text-gray-700">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> FastAPI (Python)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Google Gemini AI
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> LangChain
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> CORS enabled
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span> Production Ready
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50/30 py-16 md:py-20 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6">
            Ready to Experience AI-Powered Development?
          </h2>
          <Link
            href="/chat"
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105"
          >
            Start Using AI Assistant
          </Link>
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
