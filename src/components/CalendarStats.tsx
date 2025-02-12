import React from 'react';
import { TrendingUp, TrendingDown, Target, Activity } from 'lucide-react';

interface CalendarStatsProps {
  data: {
    totalTrades: number;
    winRate: number;
    profitLoss: number;
    volume: number;
  };
}

export function CalendarStats({ data }: CalendarStatsProps) {
  return (
    <div className="grid grid-cols-4 gap-4 mb-6">
      <div className="p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Total Trades</span>
          <Activity className="h-5 w-5 text-primary-400" />
        </div>
        <p className="text-2xl font-bold">{data.totalTrades}</p>
      </div>
      
      <div className="p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Win Rate</span>
          <Target className="h-5 w-5 text-green-400" />
        </div>
        <p className="text-2xl font-bold">{data.winRate}%</p>
      </div>
      
      <div className="p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">P&L</span>
          {data.profitLoss >= 0 ? (
            <TrendingUp className="h-5 w-5 text-green-400" />
          ) : (
            <TrendingDown className="h-5 w-5 text-red-400" />
          )}
        </div>
        <p className={`text-2xl font-bold ${
          data.profitLoss >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          ${Math.abs(data.profitLoss).toLocaleString()}
        </p>
      </div>
      
      <div className="p-4 bg-gray-800/50 rounded-lg">
        <div className="flex items-center justify-between mb-2">
          <span className="text-gray-400">Volume</span>
          <Activity className="h-5 w-5 text-blue-400" />
        </div>
        <p className="text-2xl font-bold">
          ${data.volume.toLocaleString()}
        </p>
      </div>
    </div>
  );
}