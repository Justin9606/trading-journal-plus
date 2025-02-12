import React from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle2,
  Globe,
  ExternalLink
} from 'lucide-react';

const brokers = [
  {
    id: 'interactive-brokers',
    name: 'Interactive Brokers',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    description: 'Professional-grade broker with global market access',
    markets: ['Stocks', 'Options', 'Futures', 'Forex'],
    features: ['API Access', 'Real-time Data', 'Paper Trading'],
    status: 'connected'
  },
  {
    id: 'td-ameritrade',
    name: 'TD Ameritrade',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    description: 'Full-service broker with powerful thinkorswim platform',
    markets: ['Stocks', 'Options', 'Futures'],
    features: ['API Access', 'Real-time Data', 'Paper Trading'],
    status: 'available'
  },
  {
    id: 'robinhood',
    name: 'Robinhood',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    description: 'Commission-free trading with a simple interface',
    markets: ['Stocks', 'Options', 'Crypto'],
    features: ['API Access', 'Real-time Data'],
    status: 'available'
  },
  {
    id: 'webull',
    name: 'Webull',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    description: 'Tech-focused broker with advanced trading tools',
    markets: ['Stocks', 'Options', 'Crypto'],
    features: ['API Access', 'Real-time Data', 'Paper Trading'],
    status: 'available'
  }
];

export function BrokersSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary-500/5 to-gray-900"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            <span className="gradient-text">Supported Brokers</span>
          </h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Connect your favorite brokers for automated trading and seamless data synchronization
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {brokers.map((broker) => (
            <div key={broker.id} className="glass-effect rounded-xl p-6 card-hover">
              {/* Broker Header */}
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={broker.logo}
                  alt={broker.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-50">{broker.name}</h3>
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full ${
                      broker.status === 'connected' ? 'bg-green-500' : 'bg-gray-500'
                    }`}></div>
                    <span className="text-sm text-gray-400 capitalize">{broker.status}</span>
                  </div>
                </div>
              </div>

              {/* Markets */}
              <div className="mb-6">
                <div className="flex flex-wrap gap-2">
                  {broker.markets.map((market) => (
                    <span
                      key={market}
                      className="px-2 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                    >
                      {market}
                    </span>
                  ))}
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
                <div className="space-y-2">
                  {broker.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center space-x-2 text-sm text-gray-300"
                    >
                      <CheckCircle2 className="h-4 w-4 text-green-400" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Button */}
              <button className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center justify-center space-x-2 transition-all duration-300 text-gray-50">
                <Globe className="h-4 w-4" />
                <span>Connect</span>
              </button>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-300 mb-6">
            Looking for more options? Check out our full list of supported brokers.
          </p>
          <Link
            to="/brokers"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 rounded-lg transition-all duration-300 text-gray-50"
          >
            <span>View All Brokers</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}