import React, { useState } from 'react';
import {
  AlertTriangle,
  TrendingUp,
  TrendingDown,
  BarChart,
  PieChart as PieChartIcon,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Percent,
  DollarSign,
  Calculator,
  RefreshCw,
  Filter,
  Download,
  ChevronRight,
  Shield,
  Target,
  Activity,
  Zap,
  Clock,
  Plus,
} from 'lucide-react';
import {
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
  LineChart,
  Line,
  Area,
  AreaChart,
} from 'recharts';

// Mock data generators
const generateExposureData = () => [
  { name: 'Tech', value: 35 },
  { name: 'Finance', value: 25 },
  { name: 'Healthcare', value: 20 },
  { name: 'Energy', value: 15 },
  { name: 'Others', value: 5 },
];

const generateRiskMetrics = () => [
  { date: 'Mon', var: 2500, maxDrawdown: 1500, sharpe: 1.8 },
  { date: 'Tue', var: 2200, maxDrawdown: 1800, sharpe: 1.6 },
  { date: 'Wed', var: 2800, maxDrawdown: 2000, sharpe: 1.9 },
  { date: 'Thu', var: 2400, maxDrawdown: 1600, sharpe: 1.7 },
  { date: 'Fri', var: 2600, maxDrawdown: 1900, sharpe: 1.8 },
];

const generatePortfolioHistory = () => {
  return Array.from({ length: 30 }, (_, i) => ({
    date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
    value: 100000 + Math.random() * 20000 - 10000,
    risk: Math.random() * 100,
  }));
};

const COLORS = ['#8b5cf6', '#6366f1', '#a78bfa', '#818cf8', '#c4b5fd'];

export default function Risk() {
  const [position, setPosition] = useState({
    accountSize: 100000,
    riskPerTrade: 1,
    entryPrice: 0,
    stopLoss: 0,
    targetPrice: 0,
  });
  const [timeframe, setTimeframe] = useState('1M');

  const exposureData = generateExposureData();
  const riskMetrics = generateRiskMetrics();
  const portfolioHistory = generatePortfolioHistory();

  const calculatePosition = () => {
    const riskAmount = (position.accountSize * position.riskPerTrade) / 100;
    const stopDistance = Math.abs(position.entryPrice - position.stopLoss);
    const targetDistance = Math.abs(position.targetPrice - position.entryPrice);
    const riskRewardRatio = targetDistance / stopDistance;
    const positionSize = riskAmount / stopDistance;

    return {
      shares: Math.floor(positionSize),
      totalRisk: riskAmount.toFixed(2),
      potentialReward: (positionSize * targetDistance).toFixed(2),
      riskRewardRatio: riskRewardRatio.toFixed(2),
    };
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Risk Management</h1>
          <p className="text-gray-400">Monitor and optimize your trading risk</p>
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

          {/* New Alert Button */}
          <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Alert</span>
          </button>
        </div>
      </div>

      {/* Risk Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Value at Risk (VaR)',
            value: '$2,458.36',
            change: '+2.3%',
            icon: AlertTriangle,
            color: 'text-yellow-400',
          },
          {
            label: 'Max Drawdown',
            value: '-15.3%',
            change: '-1.2%',
            icon: TrendingDown,
            color: 'text-red-400',
          },
          {
            label: 'Sharpe Ratio',
            value: '1.8',
            change: '+0.2',
            icon: Activity,
            color: 'text-green-400',
          },
          {
            label: 'Beta',
            value: '1.15',
            change: '+0.05',
            icon: Target,
            color: 'text-blue-400',
          },
        ].map((metric, index) => (
          <div key={index} className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-gray-400">{metric.label}</span>
              <metric.icon className={`h-5 w-5 ${metric.color}`} />
            </div>
            <p className="text-2xl font-bold mb-1">{metric.value}</p>
            <p className={metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
              {metric.change}
            </p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Position Calculator */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Position Size Calculator</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Account Size</label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={position.accountSize}
                  onChange={(e) =>
                    setPosition({ ...position, accountSize: Number(e.target.value) })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Risk Per Trade (%)</label>
              <div className="relative">
                <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={position.riskPerTrade}
                  onChange={(e) =>
                    setPosition({ ...position, riskPerTrade: Number(e.target.value) })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Entry Price</label>
              <div className="relative">
                <ArrowUpRight className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={position.entryPrice}
                  onChange={(e) =>
                    setPosition({ ...position, entryPrice: Number(e.target.value) })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Stop Loss</label>
              <div className="relative">
                <ArrowDownRight className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={position.stopLoss}
                  onChange={(e) =>
                    setPosition({ ...position, stopLoss: Number(e.target.value) })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Target Price</label>
              <div className="relative">
                <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={position.targetPrice}
                  onChange={(e) =>
                    setPosition({ ...position, targetPrice: Number(e.target.value) })
                  }
                  className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-700">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Position Size</p>
                  <p className="text-lg font-medium">{calculatePosition().shares} shares</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Total Risk</p>
                  <p className="text-lg font-medium">${calculatePosition().totalRisk}</p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">Potential Reward</p>
                  <p className="text-lg font-medium">
                    ${calculatePosition().potentialReward}
                  </p>
                </div>
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <p className="text-sm text-gray-400 mb-1">R:R Ratio</p>
                  <p className="text-lg font-medium">
                    {calculatePosition().riskRewardRatio}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Portfolio Risk Chart */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Portfolio Risk Analysis</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={portfolioHistory}>
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

        {/* Risk Distribution */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Risk Distribution</h3>
          <div className="flex items-center justify-between">
            <ResponsiveContainer width="50%" height={250}>
              <PieChart>
                <Pie
                  data={exposureData}
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {exposureData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    border: 'none',
                    borderRadius: '0.5rem',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-4">
              {exposureData.map((item, index) => (
                <div key={item.name} className="flex items-center space-x-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: COLORS[index] }}
                  ></div>
                  <span className="text-sm">
                    {item.name} ({item.value}%)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Additional Risk Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Risk Metrics Chart */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Risk Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsBarChart data={riskMetrics}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="date" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1F2937',
                  border: 'none',
                  borderRadius: '0.5rem',
                }}
              />
              <Bar dataKey="var" name="VaR" fill="#8b5cf6" />
              <Bar dataKey="maxDrawdown" name="Max Drawdown" fill="#ef4444" />
            </RechartsBarChart>
          </ResponsiveContainer>
        </div>

        {/* Risk Alerts */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Risk Alerts</h3>
          <div className="space-y-4">
            {[
              {
                type: 'warning',
                message: 'Portfolio VaR exceeds threshold',
                time: '2m ago',
                value: '$2,458.36',
                threshold: '$2,000.00',
              },
              {
                type: 'danger',
                message: 'Sector exposure limit reached',
                time: '1h ago',
                value: '35%',
                threshold: '30%',
              },
              {
                type: 'info',
                message: 'New correlation detected',
                time: '3h ago',
                value: '0.85',
                threshold: '0.80',
              },
            ].map((alert, index) => (
              <div
                key={index}
                className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between"
              >
                <div>
                  <div className="flex items-center space-x-2">
                    <AlertTriangle
                      className={`h-5 w-5 ${
                        alert.type === 'warning'
                          ? 'text-yellow-400'
                          : alert.type === 'danger'
                          ? 'text-red-400'
                          : 'text-blue-400'
                      }`}
                    />
                    <p className="font-medium">{alert.message}</p>
                  </div>
                  <div className="mt-1 text-sm text-gray-400">
                    <span>{alert.time}</span>
                    <span className="mx-2">•</span>
                    <span>
                      {alert.value} / {alert.threshold}
                    </span>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-gray-400" />
              </div>
            ))}
          </div>
        </div>

        {/* Risk Parameters */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Risk Parameters</h3>
          <div className="space-y-4">
            {[
              { label: 'Max Position Size', value: '5%', icon: Target },
              { label: 'Max Sector Exposure', value: '30%', icon: PieChartIcon },
              { label: 'Stop Loss Required', value: 'Yes', icon: Shield },
              { label: 'Max Daily Loss', value: '$5,000', icon: TrendingDown },
              { label: 'Risk per Trade', value: '1%', icon: Percent },
              { label: 'Correlation Limit', value: '0.80', icon: Activity },
            ].map((param, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg"
              >
                <div className="flex items-center space-x-3">
                  <param.icon className="h-5 w-5 text-gray-400" />
                  <span>{param.label}</span>
                </div>
                <span className="font-medium">{param.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}