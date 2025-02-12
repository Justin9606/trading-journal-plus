import React, { useState } from 'react';
import { TradingViewWidget } from '../components/tradingview/TradingViewWidget';
import {
  Settings,
  Maximize2,
  Minimize2,
  Filter,
  Download,
  RefreshCw,
  ChevronRight,
  BarChart2,
  Clock,
  DollarSign,
  Target,
  Activity,
  Plus,
  Search,
  Bell,
  LayoutGrid,
  Zap,
  LineChart,
  CandlestickChart,
  BarChart,
} from 'lucide-react';

export default function Trading() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState('NASDAQ:AAPL');
  const [interval, setInterval] = useState('D');
  const [chartType, setChartType] = useState<'candlestick' | 'line' | 'bar'>('candlestick');

  const intervals = [
    { label: '1m', value: '1' },
    { label: '5m', value: '5' },
    { label: '15m', value: '15' },
    { label: '1h', value: '60' },
    { label: '4h', value: '240' },
    { label: '1D', value: 'D' },
    { label: '1W', value: 'W' },
  ];

  const popularSymbols = [
    { label: 'AAPL', value: 'NASDAQ:AAPL' },
    { label: 'GOOGL', value: 'NASDAQ:GOOGL' },
    { label: 'MSFT', value: 'NASDAQ:MSFT' },
    { label: 'AMZN', value: 'NASDAQ:AMZN' },
    { label: 'TSLA', value: 'NASDAQ:TSLA' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Trading Terminal</h1>
          <p className="text-gray-400">Real-time market analysis and trading</p>
        </div>

        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search symbol..."
              className="pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
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
            <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
          </div>

          <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Order</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Day P&L',
            value: '+$2,458.36',
            change: '+5.2%',
            icon: DollarSign,
            color: 'text-green-400',
          },
          {
            label: 'Open Positions',
            value: '8',
            change: '+2',
            icon: Target,
            color: 'text-blue-400',
          },
          {
            label: 'Win Rate',
            value: '68.5%',
            change: '+2.3%',
            icon: Activity,
            color: 'text-purple-400',
          },
          {
            label: 'Trading Time',
            value: '4h 23m',
            change: '2h left',
            icon: Clock,
            color: 'text-yellow-400',
          },
        ].map((stat, index) => (
          <div key={index} className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">{stat.label}</span>
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
            </div>
            <p className="text-2xl font-bold mb-1">{stat.value}</p>
            <p className={stat.change.startsWith('+') ? 'text-green-400' : 'text-gray-400'}>
              {stat.change}
            </p>
          </div>
        ))}
      </div>

      {/* TradingView Chart */}
      <div className={`glass-effect rounded-xl ${isFullscreen ? 'fixed inset-4 z-50' : ''}`}>
        <div className="p-4 border-b border-gray-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <select
                value={selectedSymbol}
                onChange={(e) => setSelectedSymbol(e.target.value)}
                className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                {popularSymbols.map((s) => (
                  <option key={s.value} value={s.value}>
                    {s.label}
                  </option>
                ))}
              </select>

              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
                {intervals.map((i) => (
                  <button
                    key={i.value}
                    onClick={() => setInterval(i.value)}
                    className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                      interval === i.value
                        ? 'bg-primary-500 text-white'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {i.label}
                  </button>
                ))}
              </div>

              <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
                <button
                  onClick={() => setChartType('candlestick')}
                  className={`p-2 rounded-lg ${
                    chartType === 'candlestick' ? 'bg-primary-500' : 'hover:bg-gray-700'
                  }`}
                >
                  <CandlestickChart className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartType('line')}
                  className={`p-2 rounded-lg ${
                    chartType === 'line' ? 'bg-primary-500' : 'hover:bg-gray-700'
                  }`}
                >
                  <LineChart className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setChartType('bar')}
                  className={`p-2 rounded-lg ${
                    chartType === 'bar' ? 'bg-primary-500' : 'hover:bg-gray-700'
                  }`}
                >
                  <BarChart className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <Settings className="h-5 w-5" />
              </button>
              <button className="p-2 hover:bg-gray-800 rounded-lg transition-colors">
                <LayoutGrid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-5 w-5" />
                ) : (
                  <Maximize2 className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className={isFullscreen ? 'h-[calc(100%-80px)]' : 'h-[calc(100vh-400px)] min-h-[900px]'}>
          <TradingViewWidget
            symbol={selectedSymbol}
            interval={interval}
            theme="dark"
            height="100%"
            width="100%"
            allow_symbol_change={true}
            withdateranges={true}
            hide_side_toolbar={false}
            details={true}
            hotlist={true}
            calendar={true}
            style={chartType}
          />
        </div>
      </div>
    </div>
  );
}