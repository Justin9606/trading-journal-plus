import React from 'react';
import { Calendar, Clock, DollarSign, Percent, Target } from 'lucide-react';

interface BacktestSettingsProps {
  settings: {
    symbol: string;
    timeframe: string;
    startDate: string;
    endDate: string;
    initialCapital: number;
    positionSize: number;
    maxOpenPositions: number;
    stopLoss: number;
    takeProfit: number;
  };
  onChange: (settings: any) => void;
}

export function BacktestSettings({ settings, onChange }: BacktestSettingsProps) {
  const timeframes = [
    { label: '1 minute', value: '1' },
    { label: '5 minutes', value: '5' },
    { label: '15 minutes', value: '15' },
    { label: '1 hour', value: '60' },
    { label: '4 hours', value: '240' },
    { label: 'Daily', value: 'D' },
    { label: 'Weekly', value: 'W' },
  ];

  const symbols = [
    { label: 'AAPL', value: 'NASDAQ:AAPL' },
    { label: 'GOOGL', value: 'NASDAQ:GOOGL' },
    { label: 'MSFT', value: 'NASDAQ:MSFT' },
    { label: 'AMZN', value: 'NASDAQ:AMZN' },
    { label: 'TSLA', value: 'NASDAQ:TSLA' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm text-gray-400 mb-2">Symbol</label>
        <select
          value={settings.symbol}
          onChange={(e) => onChange({ ...settings, symbol: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {symbols.map((symbol) => (
            <option key={symbol.value} value={symbol.value}>
              {symbol.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Timeframe</label>
        <select
          value={settings.timeframe}
          onChange={(e) => onChange({ ...settings, timeframe: e.target.value })}
          className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          {timeframes.map((timeframe) => (
            <option key={timeframe.value} value={timeframe.value}>
              {timeframe.label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Start Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={settings.startDate}
              onChange={(e) => onChange({ ...settings, startDate: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">End Date</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="date"
              value={settings.endDate}
              onChange={(e) => onChange({ ...settings, endDate: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm text-gray-400 mb-2">Initial Capital</label>
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="number"
            value={settings.initialCapital}
            onChange={(e) => onChange({ ...settings, initialCapital: Number(e.target.value) })}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Position Size (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={settings.positionSize}
              onChange={(e) => onChange({ ...settings, positionSize: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Max Open Positions</label>
          <div className="relative">
            <Target className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={settings.maxOpenPositions}
              onChange={(e) => onChange({ ...settings, maxOpenPositions: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-gray-400 mb-2">Stop Loss (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={settings.stopLoss}
              onChange={(e) => onChange({ ...settings, stopLoss: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm text-gray-400 mb-2">Take Profit (%)</label>
          <div className="relative">
            <Percent className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="number"
              value={settings.takeProfit}
              onChange={(e) => onChange({ ...settings, takeProfit: Number(e.target.value) })}
              className="w-full pl-10 pr-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
}