import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useCalendar } from '../hooks/useCalendar';
import { CalendarHeatmap } from './CalendarHeatmap';
import { CalendarStats } from './CalendarStats';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Filter,
  Download,
  TrendingUp,
  TrendingDown,
  Target,
  Clock,
  Sun,
  Moon,
  Search,
  X,
} from 'lucide-react';

interface DayStats {
  date: string;
  trades: number;
  pnl: number;
  winRate: number;
  volume: number;
  bestTrade: number;
  worstTrade: number;
  avgTradeTime: string;
  riskRewardRatio: number;
}

const generateMonthData = (year: number, month: number): DayStats[] => {
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: daysInMonth }, (_, i) => {
    const dayOfWeek = new Date(year, month, i + 1).getDay();
    const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;
    const hasTraded = !isWeekend && Math.random() > 0.2;
    
    if (!hasTraded) return {
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
      trades: 0,
      pnl: 0,
      winRate: 0,
      volume: 0,
      bestTrade: 0,
      worstTrade: 0,
      avgTradeTime: '0m',
      riskRewardRatio: 0
    };

    const trades = Math.floor(Math.random() * 8) + 3;
    const winRate = Math.round(Math.random() * 30 + 50);
    const pnl = Math.round((Math.random() * 2000 - 800) * 100) / 100;
    
    return {
      date: `${year}-${String(month + 1).padStart(2, '0')}-${String(i + 1).padStart(2, '0')}`,
      trades,
      pnl,
      winRate,
      volume: Math.round(Math.random() * 50000),
      bestTrade: Math.round(Math.random() * 500 + 100),
      worstTrade: Math.round(Math.random() * -300 - 100),
      avgTradeTime: `${Math.floor(Math.random() * 45 + 15)}m`,
      riskRewardRatio: Math.round((Math.random() * 1.5 + 1) * 10) / 10
    };
  });
};

export default function TradingCalendar() {
  const { theme, toggleTheme } = useTheme();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [searchDate, setSearchDate] = useState('');
  const [showStats, setShowStats] = useState(true);
  const [view, setView] = useState<'month' | 'week'>('month');
  const [filterType, setFilterType] = useState<'all' | 'profit' | 'loss'>('all');

  const {
    calendar,
    currentDate,
    nextMonth,
    prevMonth,
    goToToday,
  } = useCalendar();

  const monthData = generateMonthData(
    currentDate.getFullYear(),
    currentDate.getMonth()
  );

  const getDayClass = (day: DayStats) => {
    const baseClass = 'transition-all duration-200 hover:scale-105 ';
    if (day.trades === 0) return baseClass + 'bg-gray-800/50';
    if (day.pnl > 0) return baseClass + 'bg-green-500/20 hover:bg-green-500/30';
    if (day.pnl < 0) return baseClass + 'bg-red-500/20 hover:bg-red-500/30';
    return baseClass + 'bg-gray-700/50 hover:bg-gray-700/70';
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  const handleDateSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const date = new Date(searchDate);
    if (!isNaN(date.getTime())) {
      setSelectedDate(searchDate);
      setShowDatePicker(false);
    }
  };

  const filteredData = monthData.filter(day => {
    if (filterType === 'profit') return day.pnl > 0;
    if (filterType === 'loss') return day.pnl < 0;
    return true;
  });

  const monthStats = {
    totalTrades: filteredData.reduce((acc, day) => acc + day.trades, 0),
    totalPnL: filteredData.reduce((acc, day) => acc + day.pnl, 0),
    avgWinRate: Math.round(
      filteredData.reduce((acc, day) => acc + day.winRate, 0) / filteredData.length
    ),
    totalVolume: filteredData.reduce((acc, day) => acc + day.volume, 0),
  };

  return (
    <div className={`glass-effect rounded-xl p-6 ${theme === 'light' ? 'bg-white shadow-lg' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <h3 className="text-lg font-semibold">Trading Calendar</h3>
          <div className="flex items-center space-x-2 text-sm">
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-green-500/20"></div>
              <span className="text-gray-400">Profit</span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-3 h-3 rounded-full bg-red-500/20"></div>
              <span className="text-gray-400">Loss</span>
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            {theme === 'dark' ? (
              <Sun className="h-5 w-5" />
            ) : (
              <Moon className="h-5 w-5" />
            )}
          </button>

          {/* Date Picker */}
          <div className="relative">
            <button
              onClick={() => setShowDatePicker(!showDatePicker)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <Calendar className="h-5 w-5" />
            </button>

            {showDatePicker && (
              <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-lg p-4 z-10">
                <form onSubmit={handleDateSearch}>
                  <div className="flex space-x-2">
                    <input
                      type="date"
                      value={searchDate}
                      onChange={(e) => setSearchDate(e.target.value)}
                      className="flex-1 px-3 py-1 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button
                      type="submit"
                      className="p-1 bg-primary-500 hover:bg-primary-600 rounded-lg"
                    >
                      <Search className="h-4 w-4" />
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Filter */}
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as 'all' | 'profit' | 'loss')}
            className="px-3 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
          >
            <option value="all">All Trades</option>
            <option value="profit">Profitable</option>
            <option value="loss">Loss Making</option>
          </select>

          {/* Navigation */}
          <div className="flex items-center space-x-2">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={goToToday}
              className="px-3 py-1 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm"
            >
              Today
            </button>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Month Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total Trades</span>
            <Target className="h-5 w-5 text-primary-400" />
          </div>
          <p className="text-2xl font-bold">{monthStats.totalTrades}</p>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Total P&L</span>
            {monthStats.totalPnL >= 0 ? (
              <TrendingUp className="h-5 w-5 text-green-400" />
            ) : (
              <TrendingDown className="h-5 w-5 text-red-400" />
            )}
          </div>
          <p className={`text-2xl font-bold ${
            monthStats.totalPnL >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {formatCurrency(monthStats.totalPnL)}
          </p>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Avg Win Rate</span>
            <Target className="h-5 w-5 text-blue-400" />
          </div>
          <p className="text-2xl font-bold">{monthStats.avgWinRate}%</p>
        </div>
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-400">Volume</span>
            <Clock className="h-5 w-5 text-purple-400" />
          </div>
          <p className="text-2xl font-bold">{formatCurrency(monthStats.totalVolume)}</p>
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="mb-6">
        <div className="grid grid-cols-7 gap-1 mb-1">
          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-400 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {filteredData.map((day, index) => (
            <button
              key={day.date}
              onClick={() => setSelectedDate(day.date)}
              className={`aspect-square p-2 rounded-lg ${getDayClass(day)} ${
                selectedDate === day.date ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <div className="h-full flex flex-col">
                <span className="text-sm font-medium">{index + 1}</span>
                {day.trades > 0 && (
                  <>
                    <div className="flex-1 flex flex-col justify-center items-center">
                      <span className="text-xs font-medium">
                        {day.trades} trades
                      </span>
                      <span
                        className={`text-xs ${
                          day.pnl > 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {formatCurrency(day.pnl)}
                      </span>
                    </div>
                    <div className="mt-1 h-1 w-full bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-primary-500"
                        style={{ width: `${day.winRate}%` }}
                      ></div>
                    </div>
                  </>
                )}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDate && (
        <div className="p-4 bg-gray-800/50 rounded-lg">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-lg font-medium">
              {new Date(selectedDate).toLocaleDateString('default', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
              })}
            </h4>
            <button
              onClick={() => setSelectedDate(null)}
              className="p-1 hover:bg-gray-700 rounded-lg"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {monthData.find(d => d.date === selectedDate)?.trades ? (
            <div className="grid grid-cols-4 gap-4">
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-1 text-gray-400 mb-1">
                  <Target className="h-4 w-4" />
                  <span>Win Rate</span>
                </div>
                <span className="font-medium">
                  {monthData.find(d => d.date === selectedDate)?.winRate}%
                </span>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-1 text-gray-400 mb-1">
                  <Clock className="h-4 w-4" />
                  <span>Avg Time</span>
                </div>
                <span className="font-medium">
                  {monthData.find(d => d.date === selectedDate)?.avgTradeTime}
                </span>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-1 text-gray-400 mb-1">
                  <TrendingUp className="h-4 w-4" />
                  <span>Best Trade</span>
                </div>
                <span className="font-medium text-green-400">
                  {formatCurrency(monthData.find(d => d.date === selectedDate)?.bestTrade || 0)}
                </span>
              </div>
              <div className="p-3 bg-gray-800 rounded-lg">
                <div className="flex items-center space-x-1 text-gray-400 mb-1">
                  <TrendingDown className="h-4 w-4" />
                  <span>Worst Trade</span>
                </div>
                <span className="font-medium text-red-400">
                  {formatCurrency(monthData.find(d => d.date === selectedDate)?.worstTrade || 0)}
                </span>
              </div>
            </div>
          ) : (
            <p className="text-gray-400 text-center">No trades on this day</p>
          )}
        </div>
      )}
    </div>
  );
}