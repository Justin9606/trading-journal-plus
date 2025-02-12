import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar
} from 'recharts';
import { TrendingUp, TrendingDown, Target, Activity } from 'lucide-react';

interface BacktestResultsProps {
  results: {
    equity: { date: string; value: number }[];
    trades: {
      date: string;
      type: 'buy' | 'sell';
      entry: number;
      exit: number;
      pnl: number;
      duration: string;
    }[];
    metrics: {
      totalReturn: number;
      winRate: number;
      profitFactor: number;
      maxDrawdown: number;
      sharpeRatio: number;
      averageTrade: number;
      totalTrades: number;
      profitableTrades: number;
    };
  };
}

export function BacktestResults({ results }: BacktestResultsProps) {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Return</span>
            <TrendingUp className="h-5 w-5 text-green-400" />
          </div>
          <p className="text-2xl font-bold mb-1">
            {results.metrics.totalReturn > 0 ? '+' : ''}
            {results.metrics.totalReturn.toFixed(2)}%
          </p>
          <p className="text-sm text-gray-400">
            {formatCurrency(results.equity[results.equity.length - 1].value)}
          </p>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Win Rate</span>
            <Target className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold mb-1">{results.metrics.winRate}%</p>
          <p className="text-sm text-gray-400">
            {results.metrics.profitableTrades} / {results.metrics.totalTrades} trades
          </p>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Profit Factor</span>
            <Activity className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold mb-1">{results.metrics.profitFactor}</p>
          <p className="text-sm text-gray-400">
            Avg Trade: {formatCurrency(results.metrics.averageTrade)}
          </p>
        </div>

        <div className="glass-effect rounded-xl p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Max Drawdown</span>
            <TrendingDown className="h-5 w-5 text-red-400" />
          </div>
          <p className="text-2xl font-bold mb-1">
            {results.metrics.maxDrawdown}%
          </p>
          <p className="text-sm text-gray-400">
            Sharpe: {results.metrics.sharpeRatio.toFixed(2)}
          </p>
        </div>
      </div>

      {/* Equity Curve */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Equity Curve</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={results.equity}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                </linearGradient>
              </defs>
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
      </div>

      {/* Trade Distribution */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Trade Distribution</h3>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={results.trades}>
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
              <Bar
                dataKey="pnl"
                fill={(d) => (d.pnl >= 0 ? '#22C55E' : '#EF4444')}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Trade List */}
      <div className="glass-effect rounded-xl p-6">
        <h3 className="text-lg font-semibold mb-6">Trade History</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-gray-800">
                <th className="pb-4 font-medium text-gray-400">Date</th>
                <th className="pb-4 font-medium text-gray-400">Type</th>
                <th className="pb-4 font-medium text-gray-400">Entry</th>
                <th className="pb-4 font-medium text-gray-400">Exit</th>
                <th className="pb-4 font-medium text-gray-400">P&L</th>
                <th className="pb-4 font-medium text-gray-400">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800">
              {results.trades.map((trade, index) => (
                <tr key={index}>
                  <td className="py-4">{trade.date}</td>
                  <td className="py-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        trade.type === 'buy'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {trade.type.toUpperCase()}
                    </span>
                  </td>
                  <td className="py-4">{trade.entry}</td>
                  <td className="py-4">{trade.exit}</td>
                  <td className={`py-4 ${trade.pnl >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                    {trade.pnl > 0 ? '+' : ''}
                    {formatCurrency(trade.pnl)}
                  </td>
                  <td className="py-4 text-gray-400">{trade.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}