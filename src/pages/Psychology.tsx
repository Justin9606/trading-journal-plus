import React, { useState } from 'react';
import {
  Brain,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  Filter,
  Download,
  Smile,
  Frown,
  Meh,
  ThumbsUp,
  ThumbsDown,
  BarChart2,
  Target,
  RefreshCw,
  Activity,
  ArrowUp,
  ArrowDown,
  Flag,
  MessageSquare,
  Zap,
  Shield,
} from 'lucide-react';

interface EmotionalEntry {
  id: string;
  date: string;
  mood: 'positive' | 'neutral' | 'negative';
  stress: number;
  focus: number;
  confidence: number;
  discipline: number;
  energy: number;
  notes: string;
  tradingDay: boolean;
  performance?: {
    trades: number;
    winRate: number;
    pnl: number;
    bestTrade: number;
    worstTrade: number;
    mistakes: string[];
    emotions: {
      fomo: number;
      revenge: number;
      greed: number;
      fear: number;
    };
  };
  insights: {
    strengths: string[];
    weaknesses: string[];
    actionItems: string[];
  };
  tags: string[];
  correlations: {
    moodVsPerformance: number;
    stressVsWinRate: number;
    confidenceVsPnl: number;
    disciplineVsMistakes: number;
  };
}

// Mock data generator
const generateMockEntries = (count: number): EmotionalEntry[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: `entry-${i}`,
    date: new Date(2024, 1, i + 1).toISOString(),
    mood: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)] as 'positive' | 'neutral' | 'negative',
    stress: Math.floor(Math.random() * 10) + 1,
    focus: Math.floor(Math.random() * 10) + 1,
    confidence: Math.floor(Math.random() * 10) + 1,
    discipline: Math.floor(Math.random() * 10) + 1,
    energy: Math.floor(Math.random() * 10) + 1,
    notes: 'Maintained emotional balance throughout the trading session. Followed the plan consistently.',
    tradingDay: Math.random() > 0.2,
    performance: Math.random() > 0.2 ? {
      trades: Math.floor(Math.random() * 10) + 1,
      winRate: Math.round(Math.random() * 100),
      pnl: Math.round((Math.random() * 2000 - 1000) * 100) / 100,
      bestTrade: Math.round(Math.random() * 1000),
      worstTrade: -Math.round(Math.random() * 1000),
      mistakes: [
        'Entered too early',
        'Sized position too large',
        'Moved stop loss',
      ].slice(0, Math.floor(Math.random() * 3) + 1),
      emotions: {
        fomo: Math.floor(Math.random() * 10) + 1,
        revenge: Math.floor(Math.random() * 10) + 1,
        greed: Math.floor(Math.random() * 10) + 1,
        fear: Math.floor(Math.random() * 10) + 1,
      },
    } : undefined,
    insights: {
      strengths: [
        'Patience in entry execution',
        'Strong risk management',
        'Clear decision making',
      ],
      weaknesses: [
        'Emotional during drawdowns',
        'Overtrading in volatile markets',
        'Position sizing inconsistency',
      ],
      actionItems: [
        'Meditate before trading',
        'Review risk parameters',
        'Journal every trade',
      ],
    },
    tags: ['Morning Session', 'High Volume', 'Trend Day'].slice(
      0,
      Math.floor(Math.random() * 3) + 1
    ),
    correlations: {
      moodVsPerformance: Math.random(),
      stressVsWinRate: -Math.random(),
      confidenceVsPnl: Math.random(),
      disciplineVsMistakes: -Math.random(),
    },
  }));
};

export default function Psychology() {
  const [entries, setEntries] = useState<EmotionalEntry[]>(generateMockEntries(20));
  const [selectedEntry, setSelectedEntry] = useState<EmotionalEntry | null>(null);
  const [timeframe, setTimeframe] = useState('1M');
  const [filter, setFilter] = useState({
    mood: 'all',
    tradingDay: 'all',
  });

  const getMoodIcon = (mood: EmotionalEntry['mood']) => {
    switch (mood) {
      case 'positive':
        return <Smile className="h-5 w-5 text-green-400" />;
      case 'negative':
        return <Frown className="h-5 w-5 text-red-400" />;
      default:
        return <Meh className="h-5 w-5 text-yellow-400" />;
    }
  };

  const getRatingColor = (value: number) => {
    if (value >= 8) return 'text-green-400';
    if (value >= 5) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Trading Psychology</h1>
          <p className="text-gray-400">Monitor and improve your trading mindset</p>
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

          {/* Filters */}
          <div className="flex items-center space-x-2">
            <select
              value={filter.mood}
              onChange={(e) => setFilter({ ...filter, mood: e.target.value })}
              className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Moods</option>
              <option value="positive">Positive</option>
              <option value="neutral">Neutral</option>
              <option value="negative">Negative</option>
            </select>

            <select
              value={filter.tradingDay}
              onChange={(e) => setFilter({ ...filter, tradingDay: e.target.value })}
              className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Days</option>
              <option value="trading">Trading Days</option>
              <option value="non-trading">Non-Trading Days</option>
            </select>
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

          {/* New Entry Button */}
          <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Entry</span>
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          {
            label: 'Average Mood',
            value: 'Positive',
            change: '+5%',
            icon: Brain,
            color: 'text-primary-400',
          },
          {
            label: 'Stress Level',
            value: '4.2/10',
            change: '-12%',
            icon: Activity,
            color: 'text-green-400',
          },
          {
            label: 'Trading Days',
            value: '85%',
            change: '+3%',
            icon: Calendar,
            color: 'text-blue-400',
          },
          {
            label: 'Emotional Control',
            value: '7.8/10',
            change: '+8%',
            icon: Shield,
            color: 'text-purple-400',
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Journal Entries */}
        <div className="lg:col-span-2">
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Journal Entries</h3>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <Calendar className="h-4 w-4" />
                </button>
                <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                  <BarChart2 className="h-4 w-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              {entries.map((entry) => (
                <div
                  key={entry.id}
                  onClick={() => setSelectedEntry(entry)}
                  className={`p-4 rounded-lg transition-all cursor-pointer ${
                    selectedEntry?.id === entry.id
                      ? 'bg-primary-500/20 border border-primary-500/50'
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {getMoodIcon(entry.mood)}
                      <div>
                        <h4 className="font-medium">
                          {new Date(entry.date).toLocaleDateString()}
                        </h4>
                        <p className="text-sm text-gray-400">
                          {entry.tradingDay ? 'Trading Day' : 'Non-Trading Day'}
                        </p>
                      </div>
                    </div>
                    {entry.performance && (
                      <span
                        className={`text-lg font-medium ${
                          entry.performance.pnl > 0 ? 'text-green-400' : 'text-red-400'
                        }`}
                      >
                        {entry.performance.pnl > 0 ? '+' : ''}$
                        {entry.performance.pnl.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400">Stress</p>
                      <p className={`font-medium ${getRatingColor(entry.stress)}`}>
                        {entry.stress}/10
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Focus</p>
                      <p className={`font-medium ${getRatingColor(entry.focus)}`}>
                        {entry.focus}/10
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Confidence</p>
                      <p className={`font-medium ${getRatingColor(entry.confidence)}`}>
                        {entry.confidence}/10
                      </p>
                    </div>
                  </div>

                  {entry.performance && (
                    <div className="flex items-center justify-between text-sm text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span>{entry.performance.trades} trades</span>
                        <span>{entry.performance.winRate}% win rate</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        {entry.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Entry Details */}
        <div className="glass-effect rounded-xl p-6">
          {selectedEntry ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Entry Details</h3>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors">
                    <Edit2 className="h-4 w-4" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-red-400">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Basic Info */}
                <div>
                  <div className="flex items-center space-x-3 mb-4">
                    {getMoodIcon(selectedEntry.mood)}
                    <div>
                      <h4 className="text-2xl font-bold">
                        {new Date(selectedEntry.date).toLocaleDateString()}
                      </h4>
                      <p className="text-gray-400">
                        {selectedEntry.tradingDay ? 'Trading Day' : 'Non-Trading Day'}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Emotional Metrics */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Emotional State
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400">Stress Level</p>
                      <p className={`font-medium ${getRatingColor(selectedEntry.stress)}`}>
                        {selectedEntry.stress}/10
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400">Focus Level</p>
                      <p className={`font-medium ${getRatingColor(selectedEntry.focus)}`}>
                        {selectedEntry.focus}/10
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400">Confidence</p>
                      <p
                        className={`font-medium ${getRatingColor(
                          selectedEntry.confidence
                        )}`}
                      >
                        {selectedEntry.confidence}/10
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400">Discipline</p>
                      <p
                        className={`font-medium ${getRatingColor(
                          selectedEntry.discipline
                        )}`}
                      >
                        {selectedEntry.discipline}/10
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trading Performance */}
                {selectedEntry.performance && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Trading Performance
                    </h4>
                    <div className="space-y-2">
                      <div className="p-3 bg-gray-800/50 rounded-lg">
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-gray-400">P&L</p>
                          <p
                            className={`font-medium ${
                              selectedEntry.performance.pnl > 0
                                ? 'text-green-400'
                                : 'text-red-400'
                            }`}
                          >
                            {selectedEntry.performance.pnl > 0 ? '+' : ''}$
                            {selectedEntry.performance.pnl.toFixed(2)}
                          </p>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <p className="text-sm text-gray-400">Trades</p>
                          <p className="font-medium">
                            {selectedEntry.performance.trades}
                          </p>
                        </div>
                        <div className="p-3 bg-gray-800/50 rounded-lg">
                          <p className="text-sm text-gray-400">Win Rate</p>
                          <p className="font-medium">
                            {selectedEntry.performance.winRate}%
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Emotional Analysis */}
                {selectedEntry.performance && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Emotional Analysis
                    </h4>
                    <div className="space-y-2">
                      {Object.entries(selectedEntry.performance.emotions).map(
                        ([emotion, level]) => (
                          <div
                            key={emotion}
                            className="p-3 bg-gray-800/50 rounded-lg flex items-center justify-between"
                          >
                            <p className="text-sm capitalize">
                              {emotion.replace(/([A-Z])/g, ' $1').trim()}
                            </p>
                            <div className="flex items-center space-x-2">
                              <div className="w-24 h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    level > 7
                                      ? 'bg-red-500'
                                      : level > 4
                                      ? 'bg-yellow-500'
                                      : 'bg-green-500'
                                  }`}
                                  style={{ width: `${level * 10}%` }}
                                ></div>
                              </div>
                              <span
                                className={
                                  level > 7
                                    ? 'text-red-400'
                                    : level > 4
                                    ? 'text-yellow-400'
                                    : 'text-green-400'
                                }
                              >
                                {level}/10
                              </span>
                            </div>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Insights */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Insights</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400 mb-2">Strengths</p>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedEntry.insights.strengths.map((strength, index) => (
                          <li key={index} className="text-sm">{strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400 mb-2">Areas for Improvement</p>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedEntry.insights.weaknesses.map((weakness, index) => (
                          <li key={index} className="text-sm">{weakness}</li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-sm text-gray-400 mb-2">Action Items</p>
                      <ul className="list-disc list-inside space-y-1">
                        {selectedEntry.insights.actionItems.map((item, index) => (
                          <li key={index} className="text-sm">{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Notes</h4>
                  <div className="p-3 bg-gray-800/50 rounded-lg">
                    <p className="text-sm">{selectedEntry.notes}</p>
                  </div>
                </div>

                {/* Correlations */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Correlations</h4>
                  <div className="grid grid-cols-2 gap-2">
                    {Object.entries(selectedEntry.correlations).map(
                      ([correlation, value]) => (
                        <div
                          key={correlation}
                          className="p-3 bg-gray-800/50 rounded-lg"
                        >
                          <p className="text-xs text-gray-400 capitalize">
                            {correlation.replace(/([A-Z])/g, ' $1').trim()}
                          </p>
                          <div className="flex items-center space-x-2">
                            <span
                              className={
                                value > 0 ? 'text-green-400' : 'text-red-400'
                              }
                            >
                              {Math.abs(value).toFixed(2)}
                            </span>
                            {value > 0 ? (
                              <ArrowUp className="h-4 w-4 text-green-400" />
                            ) : (
                              <ArrowDown className="h-4 w-4 text-red-400" />
                            )}
                          </div>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p>Select an entry to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}