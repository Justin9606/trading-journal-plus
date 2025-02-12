import React, { useState } from 'react';
import {
  TrendingUp, TrendingDown, BarChart2, Calendar,
  Filter, Download, Brain, Shield, Wallet, Globe, Users, Activity,
  RefreshCw
} from 'lucide-react';
import { StatCard } from '../components/common/StatCard';
import { AreaChartComponent } from '../components/charts/AreaChartComponent';
import { BarChartComponent } from '../components/charts/BarChartComponent';
import { AiChatAssistant } from '../components/ai/AiChatAssistant';
import { TradingViewWidget } from '../components/tradingview/TradingViewWidget';
import TradingCalendar from '../components/TradingCalendar';

// Enhanced data generators for more realistic data
const generateTimeSeriesData = () => {
  const basePrice = 100;
  let currentPrice = basePrice;
  const volatility = 0.02;
  const trend = 0.001; // Slight upward trend
  
  return Array.from({ length: 30 }, (_, i) => {
    const noise = (Math.random() - 0.5) * volatility;
    const trendComponent = trend * i;
    currentPrice = currentPrice * (1 + noise + trendComponent);
    
    return {
      date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
      value: Math.round(currentPrice * 100) / 100,
      volume: Math.round(Math.random() * 1000000 + 500000),
      volatility: Math.abs(noise) * 100,
    };
  });
};

const generateSectorData = () => [
  { name: 'Technology', performance: 12.5, allocation: 35, risk: 8.2 },
  { name: 'Healthcare', performance: 8.2, allocation: 20, risk: 6.5 },
  { name: 'Finance', performance: -3.5, allocation: 15, risk: 9.1 },
  { name: 'Energy', performance: 5.8, allocation: 10, risk: 7.8 },
  { name: 'Consumer', performance: -1.2, allocation: 20, risk: 5.4 },
];

const COLORS = ['#8b5cf6', '#6366f1', '#a78bfa', '#818cf8', '#c4b5fd'];

export default function Analytics() {
  const [timeframe, setTimeframe] = useState('1M');
  const [showAiChat, setShowAiChat] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('NASDAQ:AAPL');

  const marketData = generateTimeSeriesData();
  const sectorData = generateSectorData();

  // Calculate market statistics with more realistic values
  const marketStats = [
    {
      label: 'Total Market Value',
      value: '$2.85M',
      change: '+5.2%',
      icon: Wallet,
      color: 'text-primary-400',
      bgGlow: 'shadow-primary-500/20',
    },
    {
      label: 'Monthly Volume',
      value: '12.5M',
      change: '+8.3%',
      icon: BarChart2,
      color: 'text-blue-400',
      bgGlow: 'shadow-blue-500/20',
    },
    {
      label: 'Active Traders',
      value: '15.2K',
      change: '+12.5%',
      icon: Users,
      color: 'text-green-400',
      bgGlow: 'shadow-green-500/20',
    },
    {
      label: 'Volatility Index',
      value: '18.5',
      change: '-2.1%',
      icon: Activity,
      color: 'text-yellow-400',
      bgGlow: 'shadow-yellow-500/20',
    },
    {
      label: 'Market Depth',
      value: '$125M',
      change: '+15.3%',
      icon: Globe,
      color: 'text-purple-400',
      bgGlow: 'shadow-purple-500/20',
    },
    {
      label: 'Risk Score',
      value: '72/100',
      change: '+5',
      icon: Shield,
      color: 'text-indigo-400',
      bgGlow: 'shadow-indigo-500/20',
    },
  ];

  return (
    <div className="p-8">
      {/* Enhanced Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
            Trading Analytics
          </h1>
          <p className="text-gray-400">Real-time insights and performance analysis</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Enhanced Time Range Selector */}
          <div className="flex items-center space-x-2 bg-gray-800/80 backdrop-blur-sm rounded-lg p-1">
            {['1D', '1W', '1M', '3M', '6M', 'YTD', '1Y', 'ALL'].map((range) => (
              <button
                key={range}
                onClick={() => setTimeframe(range)}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all duration-300 ${
                  timeframe === range
                    ? 'bg-primary-500 text-white shadow-lg shadow-primary-500/20'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                {range}
              </button>
            ))}
          </div>

          {/* Enhanced Action Buttons */}
          <div className="flex items-center space-x-2">
            <button className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition-all duration-300 group">
              <Filter className="h-5 w-5 group-hover:text-primary-400" />
            </button>
            <button className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition-all duration-300 group">
              <Download className="h-5 w-5 group-hover:text-primary-400" />
            </button>
            <button className="p-2 bg-gray-800/80 backdrop-blur-sm rounded-lg hover:bg-gray-700 transition-all duration-300 group">
              <RefreshCw className="h-5 w-5 group-hover:text-primary-400" />
            </button>
            <button 
              onClick={() => setShowAiChat(!showAiChat)}
              className="p-2 bg-primary-500/20 hover:bg-primary-500/30 rounded-lg transition-all duration-300 group"
            >
              <Brain className="h-5 w-5 text-primary-400 group-hover:scale-110 transition-transform" />
            </button>
          </div>
        </div>
      </div>

      {/* Market Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        {marketStats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <AreaChartComponent
          data={marketData}
          dataKey="value"
          title="Market Trend"
          subtitle="30-day price movement and volume"
          gradientColor="#8b5cf6"
        />
        <BarChartComponent
          data={marketData}
          dataKey="volume"
          title="Volume Analysis"
          subtitle="Trading volume distribution"
          barColor="#6366f1"
        />
      </div>

      {/* TradingView Chart */}
      <div className="mb-8 glass-effect rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-white">Technical Analysis</h3>
            <p className="text-sm text-gray-400">Live market data and charting</p>
          </div>
          <select
            value={selectedSymbol}
            onChange={(e) => setSelectedSymbol(e.target.value)}
            className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 text-white"
          >
            <option value="NASDAQ:AAPL">AAPL</option>
            <option value="NASDAQ:GOOGL">GOOGL</option>
            <option value="NASDAQ:MSFT">MSFT</option>
            <option value="NYSE:JPM">JPM</option>
          </select>
        </div>
        <TradingViewWidget
          symbol={selectedSymbol}
          theme="dark"
          height={500}
          interval="D"
        />
      </div>

      {/* Trading Calendar */}
      <div className="mb-8">
        <TradingCalendar />
      </div>

      {/* Sector Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sector Performance */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Sector Performance</h3>
              <p className="text-sm text-gray-400">Performance by market sector</p>
            </div>
          </div>
          <div className="space-y-4">
            {sectorData.map((sector, index) => (
              <div
                key={sector.name}
                className="p-4 bg-gray-800/50 rounded-lg hover:bg-gray-800 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: COLORS[index % COLORS.length] }}
                    ></div>
                    <span className="font-medium text-white">{sector.name}</span>
                  </div>
                  <span
                    className={sector.performance > 0 ? 'text-green-400' : 'text-red-400'}
                  >
                    {sector.performance > 0 ? '+' : ''}
                    {sector.performance}%
                  </span>
                </div>
                <div className="w-full h-2 bg-gray-700 rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-primary-500 transition-all duration-300"
                    style={{ width: `${sector.allocation}%` }}
                  ></div>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>Allocation: {sector.allocation}%</span>
                  <span>Risk Score: {sector.risk}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Risk Analysis */}
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-lg font-semibold text-white">Risk Analysis</h3>
              <p className="text-sm text-gray-400">Portfolio risk metrics</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              {
                label: 'Value at Risk',
                value: '$2,458',
                change: '-12%',
                icon: TrendingDown,
                color: 'text-yellow-400',
                bgGlow: 'shadow-yellow-500/20',
              },
              {
                label: 'Beta',
                value: '1.15',
                change: '+0.05',
                icon: TrendingUp,
                color: 'text-blue-400',
                bgGlow: 'shadow-blue-500/20',
              },
              {
                label: 'Sharpe Ratio',
                value: '1.8',
                change: '+0.2',
                icon: Activity,
                color: 'text-green-400',
                bgGlow: 'shadow-green-500/20',
              },
              {
                label: 'Max Drawdown',
                value: '-15.3%',
                change: '-1.2%',
                icon: TrendingDown,
                color: 'text-red-400',
                bgGlow: 'shadow-red-500/20',
              },
            ].map((metric, index) => (
              <StatCard key={index} {...metric} />
            ))}
          </div>
        </div>
      </div>

      {/* AI Chat Assistant */}
      {showAiChat && <AiChatAssistant onClose={() => setShowAiChat(false)} />}
    </div>
  );
}