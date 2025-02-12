import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BarChart2, Menu, X, ChevronRight } from 'lucide-react';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const location = useLocation();
  const isLandingPage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      if (isLandingPage) {
        const sections = ['hero', 'features', 'pricing', 'stories'];
        const scrollPosition = window.scrollY + 100;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
              setActiveSection(section);
              break;
            }
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLandingPage]);

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      const offset = 80; // Height of the header
      const elementPosition = section.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
      setActiveSection(sectionId);
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-3 group"
          >
            <div className="relative">
              <div className="relative transform transition-all duration-300 group-hover:scale-110">
                <BarChart2 className="h-8 w-8 text-primary-500" />
                <div className="absolute inset-0 bg-primary-500/20 blur-lg rounded-full animate-pulse"></div>
              </div>
              <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-900 group-hover:scale-110 transition-transform duration-300"></div>
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300 group-hover:from-primary-400 group-hover:to-secondary-400 transition-all duration-300">
              TradePro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {['features', 'pricing', 'stories'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className={`px-5 py-2.5 rounded-lg transition-all duration-300 relative group ${
                  activeSection === section
                    ? 'text-primary-400'
                    : 'text-white hover:text-primary-400'
                }`}
              >
                <span className="relative z-10 capitalize">{section}</span>
                {activeSection === section && (
                  <div className="absolute inset-0 bg-primary-500/10 rounded-lg"></div>
                )}
                <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 rounded-lg transition-all duration-300"></div>
              </button>
            ))}
            <Link 
              to="/brokers" 
              className="px-5 py-2.5 text-white hover:text-primary-400 rounded-lg transition-all duration-300 group relative"
            >
              <span className="relative z-10">Brokers</span>
              <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 rounded-lg transition-all duration-300"></div>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Link 
              to="/login"
              className="px-6 py-2.5 text-white hover:text-primary-400 rounded-lg transition-all duration-300 font-medium relative group"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 rounded-lg transition-all duration-300"></div>
            </Link>
            <Link
              to="/signup"
              className="relative px-6 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-lg font-medium text-white transition-all duration-300 transform hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary-500/25 overflow-hidden group"
            >
              <span className="relative z-10 flex items-center">
                Get Started
                <ChevronRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2.5 md:hidden rounded-lg hover:bg-gray-800/50 transition-colors relative group"
          >
            <div className="relative z-10">
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </div>
            <div className="absolute inset-0 bg-primary-500/0 group-hover:bg-primary-500/10 rounded-lg transition-all duration-300"></div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={`md:hidden bg-gray-900/95 backdrop-blur-xl border-b border-gray-800/50 transition-all duration-300 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 py-6 space-y-3">
          {['features', 'pricing', 'stories'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className={`block w-full text-left px-4 py-2.5 rounded-lg transition-all duration-300 ${
                activeSection === section
                  ? 'bg-primary-500/10 text-primary-400'
                  : 'text-white hover:bg-gray-800/50'
              }`}
            >
              <span className="capitalize">{section}</span>
            </button>
          ))}
          <Link
            to="/brokers"
            className="block px-4 py-2.5 text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Brokers
          </Link>
          <div className="pt-4 mt-4 border-t border-gray-800 space-y-3">
            <Link
              to="/login"
              className="block w-full px-4 py-2.5 text-white hover:bg-gray-800/50 rounded-lg transition-all duration-300 text-center font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="block w-full px-4 py-2.5 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 rounded-lg text-center transition-all duration-300 font-medium text-white"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}