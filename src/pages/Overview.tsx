import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart as PieChartIcon,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  DollarSign,
  Clock,
  Target,
  Activity,
  Wallet,
  Users,
  Globe,
  Zap,
  RefreshCw,
  Filter,
  Download,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

// Generate realistic market data
const generateMarketData = () => {
  const basePrice = 100;
  let currentPrice = basePrice;
  const volatility = 0.02;
  
  return Array.from({ length: 30 }, (_, i) => {
    const change = (Math.random() - 0.5) * volatility;
    currentPrice = currentPrice * (1 + change);
    
    return {
      date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
      value: Math.round(currentPrice * 100) / 100,
      volume: Math.round(Math.random() * 1000000 + 500000),
    };
  });
};

// Generate sector performance data
const generateSectorData = () => [
  { name: 'Technology', performance: 12.5, allocation: 35 },
  { name: 'Healthcare', performance: 8.2, allocation: 20 },
  { name: 'Finance', performance: -3.5, allocation: 15 },
  { name: 'Energy', performance: 5.8, allocation: 10 },
  { name: 'Consumer', performance: -1.2, allocation: 20 },
];

// Generate market sentiment data
const generateSentimentData = () => {
  const sentiments = ['Bullish', 'Neutral', 'Bearish'];
  const timeframes = ['Short-term', 'Medium-term', 'Long-term'];
  
  return timeframes.map(timeframe => ({
    timeframe,
    sentiment: sentiments[Math.floor(Math.random() * sentiments.length)],
    confidence: Math.round(Math.random() * 100),
    signals: Math.floor(Math.random() * 10 + 5),
  }));
};

const COLORS = ['#8b5cf6', '#6366f1', '#a78bfa', '#818cf8', '#c4b5fd'];

export default function Overview() {
  const [timeframe, setTimeframe] = useState('1M');
  const marketData = generateMarketData();
  const sectorData = generateSectorData();
  const sentimentData = generateSentimentData();

  // Calculate market statistics
  const marketStats = {
    totalValue: '$2.85M',
    dailyChange: '+3.2%',
    monthlyVolume: '12.5M',
    activeTraders: '15.2K',
    volatilityIndex: '18.5',
    marketDepth: '$125M',
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Market Overview</h1>
          <p className="text-gray-400">Real-time market insights and analysis</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Time Range Selector */}
          <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
            {['1D', '1W', '1M', '3M', '6M', 'YTD', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeframe(range)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  timeframe === range
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Filter className="h-5 w-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Download className="h-5 w-5" />
            </button>
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Market Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {[
          {
            label: 'Total Market Value',
            value: marketStats.totalValue,
            change: marketStats.dailyChange,
            icon: Wallet,
            color: 'text-primary-400',
          },
          {
            label: 'Monthly Volume',
            value: marketStats.monthlyVolume,
            change: '+5.8%',
            icon: BarChart,
            color: 'text-blue-400',
          },
          {
            label: 'Active Traders',
            value: marketStats.activeTraders,
            change: '+2.1%',
            icon: Users,
            color: 'text-green-400',
          },
          {
            label: 'Volatility Index',
            value: marketStats.volatilityIndex,
            change: '-1.2',
            icon: Activity,
            color: 'text-yellow-400',
          },
          {
            label: 'Market Depth',
            value: marketStats.marketDepth,
            change: '+8.5%',
            icon: Globe,
            color: 'text-purple-400',
          },
          {
            label: 'Market Sentiment',
            value: 'Bullish',
            change: '+2',
            icon: TrendingUp,
            color: 'text-indigo-400',
          },
        ].map((stat, index) => (
          <div key={index} className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className={stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* Market Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Market Trend */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Market Trend</h3>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                <Filter className="h-4 w-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={marketData}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tickFormatter={(value) => value.split('-')[2]}
              />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="#8b5cf6"
                fillOpacity={1}
                fill="url(#colorValue)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Volume Analysis */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold">Volume Analysis</h3>
            <div className="flex items-center space-x-2">
              <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                <BarChart className="h-4 w-4" />
              </button>
              <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                <PieChartIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={marketData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="date"
                stroke="#9CA3AF"
                tickFormatter={(value) => value.split('-')[2]}
              />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="volume" fill="#6366f1" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Sector Performance and Market Sentiment */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Performance */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Sector Performance</h3>
          <div className="space-y-4">
            {sectorData.map((sector, index) => (
              <div key={sector.name} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="font-medium">{sector.name}</span>
                  </div>
                  <span
                    className={sector.performance > 0 ? 'text-green-400' : 'text-red-400'}
                  >
                    {sector.performance > 0 ? '+' : ''}
                    {sector.performance}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary-500"
                    style={{ width: `${sector.allocation}%` }}
                  ></div>
                </div>
                <div className="mt-1 text-sm text-gray-400">
                  Allocation: {sector.allocation}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Market Sentiment */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Market Sentiment</h3>
          <div className="space-y-6">
            {sentimentData.map((data) => (
              <div key={data.timeframe} className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-medium">{data.timeframe}</span>
                  <div
                    className={`px-3 py-1 rounded-full text-sm ${
                      data.sentiment === 'Bullish'
                        ? 'bg-green-500/20 text-green-400'
                        : data.sentiment === 'Bearish'
                        ? 'bg-red-500/20 text-red-400'
                        : 'bg-yellow-500/20 text-yellow-400'
                    }`}
                  >
                    {data.sentiment}
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-400">Confidence Score</span>
                  <span>{data.confidence}%</span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mt-2">
                  <div
                    className={`h-full ${
                      data.sentiment === 'Bullish'
                        ? 'bg-green-500'
                        : data.sentiment === 'Bearish'
                        ? 'bg-red-500'
                        : 'bg-yellow-500'
                    }`}
                    style={{ width: `${data.confidence}%` }}
                  ></div>
                </div>
                <div className="mt-4 text-sm text-gray-400">
                  {data.signals} trading signals detected
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}