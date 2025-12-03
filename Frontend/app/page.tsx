'use client';
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navbar } from '../components/Navbar';
import { ArrowRight, Code, Zap, Users, BookOpen, Shield, Brain } from 'lucide-react';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 md:py-32 bg-blue-50/50 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-400 rounded-full blur-3xl"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Meet Your Personal AI Assistant
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto leading-relaxed">
              Powered by advanced AI technology, your assistant helps with code analysis, debugging,
              documentation, and much more. Get instant answers to your coding challenges.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => router.push('/chat')}
                className="bg-blue-600 text-white hover:bg-blue-700 px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition flex items-center justify-center gap-2"
              >
                Start Chat <ArrowRight size={20} />
              </button>
              <Link
                href="/about"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 md:py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-gray-900">
            Features
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Multiple AI modes to help you with any coding task
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: Code,
                title: 'Code Analysis',
                description: 'Deep dive into code structure and identify issues',
              },
              {
                icon: Zap,
                title: 'Code Generation',
                description: 'Generate high-quality, production-ready code',
              },
              {
                icon: Brain,
                title: 'Debugging Assistant',
                description: 'Find and fix bugs quickly with detailed explanations',
              },
              {
                icon: BookOpen,
                title: 'Documentation',
                description: 'Auto-generate professional documentation',
              },
              {
                icon: Shield,
                title: 'Security Auditing',
                description: 'Identify vulnerabilities and security concerns',
              },
              {
                icon: Users,
                title: 'Code Review',
                description: 'Get professional code review feedback',
              },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="p-8 rounded-xl border border-gray-200 hover:shadow-lg transition hover:border-blue-600"
              >
                <feature.icon className="text-blue-600 mb-4" size={32} />
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="bg-blue-50 py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900">
            Meet the Founder
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Profile Image */}
            <div className="flex justify-center">
              <div className="w-80 h-80 rounded-2xl overflow-hidden shadow-2xl border-4 border-blue-600">
                <img 
                  src="/photo1.jpg" 
                  alt="Muhammad Hammad" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Bio */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">
                Muhammad Hammad
              </h3>
              <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                AI Engineer specializing in scalable machine learning solutions, predictive analytics, and automated data workflows.
 Skilled in designing production-ready ML pipelines, interactive dashboards, chatbots, and API-driven systems using
 Python, FastAPI, and SQL. Focused on delivering high-accuracy models, optimized performance, and measurable
 value that enhances operational efficiency and business outcomes.
              </p>
              <p className="text-gray-600 mb-8">
                Committed to making AI accessible and practical for everyday development
                challenges.
              </p>

              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.hammadshah.me"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  Portfolio
                </a>
                <a
                  href="https://linkedin.com/in/hammad-shah-90741b25b"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  LinkedIn
                </a>
                <a
                  href="https://github.com/hammadshah18"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white border-2 border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-20 md:py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-900 animate-fadeInUp">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            {[
              {
                q: 'What is this AI Assistant?',
                a: 'This is a personal AI assistant powered by Google Gemini that helps with code analysis, debugging, generation, and documentation. It supports multiple modes for different tasks.',
              },
              {
                q: 'How does the code analysis work?',
                a: 'The assistant analyzes your code line-by-line, identifying potential issues, suggesting improvements, and explaining complex logic in simple terms.',
              },
              {
                q: 'Can I use this for production code?',
                a: 'Yes! The code generation mode is designed to produce production-ready code. Always review and test suggestions in your own environment.',
              },
              {
                q: 'Is my data secure?',
                a: 'Yes, we use secure API connections. However, we recommend not sharing sensitive information. Always review our privacy policy.',
              },
              {
                q: 'How much does it cost?',
                a: 'This depends on your usage and the backend service tier. Check with the administrator for pricing details.',
              },
              {
                q: 'Can I save my conversations?',
                a: 'Yes! All your chats are automatically saved in the sidebar. You can access them anytime and delete them as needed.',
              },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group border-l-4 border-transparent hover:border-blue-600 bg-gray-50 hover:bg-blue-50 p-6 rounded-r-lg transition-all duration-300 hover:shadow-lg transform hover:-translate-x-2"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600 mb-3 transition-colors duration-300">{item.q}</h3>
                <p className="text-gray-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-50/30 py-16 md:py-20 border-t border-blue-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-blue-600 mb-6 animate-pulse-slow">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-700 mb-8 animate-fadeInUp">
            Join thousands of developers using AI to code faster
          </p>
          <button
            onClick={() => router.push('/chat')}
            className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 hover:shadow-xl transition-all duration-300 transform hover:scale-105 animate-bounce-slow"
          >
            Start Your First Chat
          </button>
        </div>
        
        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes pulse-slow {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0.8;
            }
          }
          
          @keyframes bounce-slow {
            0%, 100% {
              transform: translateY(0);
            }
            50% {
              transform: translateY(-5px);
            }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 1s ease-out;
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 3s ease-in-out infinite;
          }
          
          .animate-bounce-slow {
            animation: bounce-slow 2s ease-in-out infinite;
          }
        `}</style>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-bold mb-4">AI Assistant</h4>
              <p className="text-gray-400">
                Empowering developers with intelligent coding assistance.
              </p>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link href="/" className="hover:text-white transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="hover:text-white transition">
                    About
                  </Link>
                </li>
                <li>
                  <Link href="/chat" className="hover:text-white transition">
                    Chat
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-bold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://github.com/hammadshah18"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    GitHub
                  </a>
                </li>
                <li>
                  <a
                    href="https://linkedin.com/in/hammad-shah-90741b25b"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.hammadshah.me"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-400 hover:text-white transition"
                  >
                    Portfolio
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2024 AI Assistant. All rights reserved.</p>
            <p className="mt-2">Created by Muhammad Hammad</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

