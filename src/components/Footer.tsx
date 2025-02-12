import React from 'react';
import { Link } from 'react-router-dom';
import {
  BarChart2,
  Twitter,
  Linkedin,
  Github,
  Mail,
  Globe,
  Shield,
  Lock,
  HelpCircle,
  FileText,
  Book,
  MessageCircle,
  Phone,
  MapPin
} from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-3 group mb-6">
              <div className="relative">
                <BarChart2 className="h-8 w-8 text-primary-500 group-hover:scale-110 transition-transform duration-300" />
                <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900"></div>
              </div>
              <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">
                TradePro
              </span>
            </Link>
            <p className="text-gray-400 mb-6 max-w-sm">
              Professional-grade trading platform with advanced analytics and AI-powered insights. Transform your trading journey with data-driven precision.
            </p>
            <div className="flex items-center space-x-4">
              <a href="#" className="p-2 text-gray-400 hover:text-primary-400 transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-primary-400 transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="p-2 text-gray-400 hover:text-primary-400 transition-colors">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/features" className="text-gray-400 hover:text-primary-400 transition-colors">Features</Link>
              </li>
              <li>
                <Link to="/pricing" className="text-gray-400 hover:text-primary-400 transition-colors">Pricing</Link>
              </li>
              <li>
                <Link to="/brokers" className="text-gray-400 hover:text-primary-400 transition-colors">Brokers</Link>
              </li>
              <li>
                <Link to="/stories" className="text-gray-400 hover:text-primary-400 transition-colors">Success Stories</Link>
              </li>
              <li>
                <Link to="/changelog" className="text-gray-400 hover:text-primary-400 transition-colors">Changelog</Link>
              </li>
              <li>
                <Link to="/roadmap" className="text-gray-400 hover:text-primary-400 transition-colors">Roadmap</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-primary-400 transition-colors">Help Center</Link>
              </li>
              <li>
                <Link to="/documentation" className="text-gray-400 hover:text-primary-400 transition-colors">Documentation</Link>
              </li>
              <li>
                <Link to="/api" className="text-gray-400 hover:text-primary-400 transition-colors">API Reference</Link>
              </li>
              <li>
                <Link to="/community" className="text-gray-400 hover:text-primary-400 transition-colors">Community</Link>
              </li>
              <li>
                <Link to="/status" className="text-gray-400 hover:text-primary-400 transition-colors">System Status</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-primary-400 transition-colors">Contact Us</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-100 font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 hover:text-primary-400 transition-colors">About Us</Link>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-primary-400 transition-colors">Careers</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-primary-400 transition-colors">Blog</Link>
              </li>
              <li>
                <Link to="/press" className="text-gray-400 hover:text-primary-400 transition-colors">Press</Link>
              </li>
              <li>
                <Link to="/partners" className="text-gray-400 hover:text-primary-400 transition-colors">Partners</Link>
              </li>
              <li>
                <Link to="/legal" className="text-gray-400 hover:text-primary-400 transition-colors">Legal</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            <div className="flex items-center space-x-3 text-gray-400">
              <Globe className="h-5 w-5 text-primary-400" />
              <span>Available Worldwide</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <Shield className="h-5 w-5 text-primary-400" />
              <span>Bank-grade Security</span>
            </div>
            <div className="flex items-center space-x-3 text-gray-400">
              <Lock className="h-5 w-5 text-primary-400" />
              <span>SOC 2 Type II Certified</span>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-center justify-between pt-8 border-t border-gray-800">
            <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0 mb-4 md:mb-0">
              <span className="text-gray-400">© {currentYear} TradePro. All rights reserved.</span>
              <div className="flex items-center space-x-4">
                <Link to="/privacy" className="text-gray-400 hover:text-primary-400 transition-colors">Privacy</Link>
                <Link to="/terms" className="text-gray-400 hover:text-primary-400 transition-colors">Terms</Link>
                <Link to="/cookies" className="text-gray-400 hover:text-primary-400 transition-colors">Cookies</Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <select className="bg-gray-800 text-gray-400 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>English (US)</option>
                <option>Español</option>
                <option>Français</option>
                <option>Deutsch</option>
              </select>
              <select className="bg-gray-800 text-gray-400 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option>USD ($)</option>
                <option>EUR (€)</option>
                <option>GBP (£)</option>
                <option>JPY (¥)</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}