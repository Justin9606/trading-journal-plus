import React, { useState } from 'react';
import { AdvancedStrategyBuilder } from '../components/backtesting/AdvancedStrategyBuilder';
import { BacktestResults } from '../components/backtesting/BacktestResults';
import { BacktestSettings } from '../components/backtesting/BacktestSettings';
import { Plus, Filter, Download, RefreshCw } from 'lucide-react';

export default function Backtesting() {
  const [showStrategyBuilder, setShowStrategyBuilder] = useState(false);
  const [backtestSettings, setBacktestSettings] = useState({
    symbol: 'NASDAQ:AAPL',
    timeframe: '1',
    startDate: '2024-01-01',
    endDate: '2024-02-15',
    initialCapital: 100000,
    positionSize: 2,
    maxOpenPositions: 3,
    stopLoss: 2,
    takeProfit: 4,
  });

  const handleSaveStrategy = (strategy: any) => {
    console.log('Strategy saved:', strategy);
    setShowStrategyBuilder(false);
  };

  const mockResults = {
    equity: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
      value: 100000 + Math.random() * 20000 - 10000,
    })),
    trades: Array.from({ length: 20 }, (_, i) => ({
      date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
      type: Math.random() > 0.5 ? 'buy' : 'sell',
      entry: 180 + Math.random() * 20,
      exit: 180 + Math.random() * 20,
      pnl: Math.random() * 2000 - 1000,
      duration: `${Math.floor(Math.random() * 120)}m`,
    })),
    metrics: {
      totalReturn: 15.3,
      winRate: 68.5,
      profitFactor: 2.3,
      maxDrawdown: 8.2,
      sharpeRatio: 1.85,
      averageTrade: 245.36,
      totalTrades: 86,
      profitableTrades: 59,
    },
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Strategy Backtesting</h1>
          <p className="text-gray-400">Test and optimize your trading strategies</p>
        </div>

        <div className="flex items-center space-x-4">
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

          <button
            onClick={() => setShowStrategyBuilder(true)}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center space-x-2"
          >
            <Plus className="h-5 w-5" />
            <span>New Strategy</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Backtest Settings */}
        <div className="glass-effect rounded-xl p-6">
          <h3 className="text-lg font-semibold mb-6">Backtest Settings</h3>
          <BacktestSettings
            settings={backtestSettings}
            onChange={setBacktestSettings}
          />
        </div>

        {/* Backtest Results */}
        <div className="lg:col-span-3">
          <BacktestResults results={mockResults} />
        </div>
      </div>

      {/* Strategy Builder Modal */}
      {showStrategyBuilder && (
        <AdvancedStrategyBuilder
          onSave={handleSaveStrategy}
          onClose={() => setShowStrategyBuilder(false)}
        />
      )}
    </div>
  );
}