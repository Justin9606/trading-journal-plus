import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Upload,
  RefreshCw,
  CheckCircle2,
  AlertTriangle,
  Search,
  Filter,
  Download,
  Globe,
  Shield,
  Zap,
  Clock,
  ChevronLeft,
  ChevronRight,
  BarChart2,
  LineChart,
  Settings,
  ExternalLink
} from 'lucide-react';

// Broker data with more detailed information
const brokers = [
  {
    id: 'interactive-brokers',
    name: 'Interactive Brokers',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    description: 'Professional-grade broker with global market access',
    markets: ['Stocks', 'Options', 'Futures', 'Forex', 'Bonds', 'ETFs'],
    features: [
      'Real-time data sync',
      'Advanced order types',
      'Portfolio margin',
      'API access'
    ],
    status: 'connected',
    supportedFeatures: {
      realTimeData: true,
      paperTrading: true,
      marginTrading: true,
      optionsTrading: true,
      automation: true
    },
    minDeposit: '$2,000',
    commissions: 'From $0.005 per share',
    rating: 4.8,
    metrics: {
      latency: '<50ms',
      uptime: '99.99%',
      execution: '0.2s'
    }
  },
  {
    id: 'td-ameritrade',
    name: 'TD Ameritrade',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    description: 'Full-service broker with powerful thinkorswim platform',
    markets: ['Stocks', 'Options', 'Futures', 'Forex', 'ETFs'],
    features: [
      'Commission-free trades',
      'Advanced charting',
      'Educational resources',
      'Mobile trading'
    ],
    status: 'available',
    supportedFeatures: {
      realTimeData: true,
      paperTrading: true,
      marginTrading: true,
      optionsTrading: true,
      automation: false
    },
    minDeposit: '$0',
    commissions: '$0 for stocks & ETFs',
    rating: 4.7,
    metrics: {
      latency: '<100ms',
      uptime: '99.95%',
      execution: '0.3s'
    }
  },
  {
    id: 'robinhood',
    name: 'Robinhood',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    description: 'Commission-free trading with a simple interface',
    markets: ['Stocks', 'Options', 'Crypto', 'ETFs'],
    features: [
      'Commission-free trades',
      'Fractional shares',
      'Instant deposits',
      'Crypto trading'
    ],
    status: 'available',
    supportedFeatures: {
      realTimeData: true,
      paperTrading: false,
      marginTrading: true,
      optionsTrading: true,
      automation: false
    },
    minDeposit: '$0',
    commissions: '$0',
    rating: 4.2,
    metrics: {
      latency: '<150ms',
      uptime: '99.90%',
      execution: '0.5s'
    }
  },
  {
    id: 'webull',
    name: 'Webull',
    logo: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80',
    description: 'Tech-focused broker with advanced trading tools',
    markets: ['Stocks', 'Options', 'Crypto', 'ETFs'],
    features: [
      'Extended trading hours',
      'Advanced technical analysis',
      'Paper trading',
      'Full-featured app'
    ],
    status: 'available',
    supportedFeatures: {
      realTimeData: true,
      paperTrading: true,
      marginTrading: true,
      optionsTrading: true,
      automation: false
    },
    minDeposit: '$0',
    commissions: '$0 for stocks & ETFs',
    rating: 4.5,
    metrics: {
      latency: '<120ms',
      uptime: '99.93%',
      execution: '0.4s'
    }
  }
];

export default function Brokers() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);
  const [selectedBroker, setSelectedBroker] = useState<string | null>(null);

  const allMarkets = Array.from(
    new Set(brokers.flatMap((b) => b.markets))
  ).sort();

  const filteredBrokers = brokers.filter((broker) => {
    const matchesSearch = broker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         broker.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMarkets = selectedMarkets.length === 0 || 
                          selectedMarkets.some(market => broker.markets.includes(market));
    return matchesSearch && matchesMarkets;
  });

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-black text-white">
      {/* Fixed header */}
      <div className="fixed-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <Link 
                to="/"
                className="flex items-center space-x-2 text-gray-300 hover:text-white transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
                <span>Back to Home</span>
              </Link>
              <h1 className="text-2xl font-bold gradient-text">Supported Brokers</h1>
            </div>

            <div className="flex items-center space-x-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search brokers..."
                  className="w-64 pl-10 pr-4 py-2 glass-input rounded-lg"
                />
              </div>

              <button className="p-2 glass-button rounded-lg hover:bg-gray-700/50 transition-colors">
                <Filter className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Market Filters */}
      <div className="border-b border-gray-800 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4 overflow-x-auto">
            {allMarkets.map(market => (
              <button
                key={market}
                onClick={() => {
                  setSelectedMarkets(prev => 
                    prev.includes(market) 
                      ? prev.filter(m => m !== market)
                      : [...prev, market]
                  );
                }}
                className={`px-4 py-2 rounded-lg text-sm transition-all duration-300 whitespace-nowrap ${
                  selectedMarkets.includes(market)
                    ? 'bg-primary-500 text-white'
                    : 'glass-button hover:bg-gray-700/50 text-gray-300 hover:text-white'
                }`}
              >
                {market}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Brokers Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBrokers.map((broker) => (
            <div
              key={broker.id}
              className="glass-effect rounded-xl transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              {/* Broker Header */}
              <div className="p-6 border-b border-gray-800/50">
                <div className="flex items-center space-x-4">
                  <img
                    src={broker.logo}
                    alt={broker.name}
                    className="w-16 h-16 rounded-xl object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{broker.name}</h3>
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${
                        broker.status === 'connected' ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                      <span className="text-sm text-gray-400 capitalize">{broker.status}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center space-x-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div
                          key={i}
                          className={`w-1 h-4 rounded-full transition-all duration-300 ${
                            i < Math.floor(broker.rating)
                              ? 'bg-primary-500'
                              : 'bg-gray-700'
                          }`}
                        ></div>
                      ))}
                    </div>
                    <span className="text-sm text-gray-400 mt-1">{broker.rating}/5</span>
                  </div>
                </div>
              </div>

              {/* Broker Content */}
              <div className="p-6 space-y-6">
                {/* Performance Metrics */}
                <div className="grid grid-cols-3 gap-4">
                  {Object.entries(broker.metrics).map(([key, value]) => (
                    <div key={key} className="glass-button rounded-lg p-3 text-center">
                      <p className="text-sm text-gray-400 mb-1 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}
                      </p>
                      <p className="font-medium">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Markets */}
                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Supported Markets</h4>
                  <div className="flex flex-wrap gap-2">
                    {broker.markets.map((market) => (
                      <span
                        key={market}
                        className="px-3 py-1 glass-button rounded-full text-xs"
                      >
                        {market}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div>
                  <h4 className="text-sm text-gray-400 mb-2">Key Features</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(broker.supportedFeatures).map(([feature, supported]) => (
                      <div
                        key={feature}
                        className={`flex items-center space-x-2 text-sm ${
                          supported ? 'text-green-400' : 'text-gray-500'
                        }`}
                      >
                        {supported ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <AlertTriangle className="h-4 w-4" />
                        )}
                        <span>{feature.replace(/([A-Z])/g, ' $1').trim()}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Pricing Info */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Min Deposit</p>
                    <p className="font-medium">{broker.minDeposit}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 mb-1">Commission</p>
                    <p className="font-medium">{broker.commissions}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  {broker.status === 'connected' ? (
                    <button className="flex-1 px-4 py-3 glass-button hover:bg-gray-700/50 rounded-lg flex items-center justify-center space-x-2">
                      <RefreshCw className="h-4 w-4" />
                      <span>Sync Data</span>
                    </button>
                  ) : (
                    <button className="flex-1 px-4 py-3 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center justify-center space-x-2">
                      <Globe className="h-4 w-4" />
                      <span>Connect</span>
                    </button>
                  )}
                  <button className="px-4 py-3 glass-button hover:bg-gray-700/50 rounded-lg flex items-center justify-center space-x-2">
                    <Settings className="h-4 w-4" />
                    <span>Configure</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}