// Mock data store for all dashboard components
export const mockData = {
  // Analytics Data
  analytics: {
    totalTrades: 156,
    winRate: 68.5,
    profitFactor: 2.3,
    averageWin: 245.36,
    averageLoss: -156.82,
    largestWin: 1250.00,
    largestLoss: -850.00,
    maxDrawdown: 15.3,
    sharpeRatio: 1.85,
    dailyPnL: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 0, i + 1).toISOString().split('T')[0],
      pnl: Math.random() * 2000 - 1000,
    })),
    monthlyPnL: Array.from({ length: 12 }, (_, i) => ({
      month: new Date(2024, i, 1).toLocaleString('default', { month: 'short' }),
      pnl: Math.random() * 10000 - 5000,
    })),
  },

  // Trading Data
  trading: {
    openPositions: Array.from({ length: 5 }, (_, i) => ({
      id: `pos-${i}`,
      symbol: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'][i],
      type: Math.random() > 0.5 ? 'long' : 'short',
      entry: Math.round(Math.random() * 200 + 100),
      current: Math.round(Math.random() * 200 + 100),
      size: Math.round(Math.random() * 100),
      pnl: Math.round((Math.random() * 2000 - 1000) * 100) / 100,
      openedAt: new Date(2024, 1, Math.floor(Math.random() * 15) + 1).toISOString(),
    })),
    recentTrades: Array.from({ length: 10 }, (_, i) => ({
      id: `trade-${i}`,
      symbol: ['AAPL', 'GOOGL', 'MSFT', 'AMZN', 'TSLA'][Math.floor(Math.random() * 5)],
      type: Math.random() > 0.5 ? 'long' : 'short',
      entry: Math.round(Math.random() * 200 + 100),
      exit: Math.round(Math.random() * 200 + 100),
      size: Math.round(Math.random() * 100),
      pnl: Math.round((Math.random() * 2000 - 1000) * 100) / 100,
      closedAt: new Date(2024, 1, Math.floor(Math.random() * 15) + 1).toISOString(),
    })),
  },

  // Backtesting Data
  backtesting: {
    strategies: Array.from({ length: 5 }, (_, i) => ({
      id: `strat-${i}`,
      name: `Strategy ${i + 1}`,
      description: 'Moving average crossover with RSI filter',
      winRate: Math.round(Math.random() * 30 + 50),
      profitFactor: Math.round((Math.random() * 1.5 + 1) * 100) / 100,
      sharpeRatio: Math.round((Math.random() * 1 + 1) * 100) / 100,
      maxDrawdown: Math.round(Math.random() * 20),
      totalTrades: Math.round(Math.random() * 500 + 100),
      netProfit: Math.round((Math.random() * 20000 - 5000) * 100) / 100,
    })),
  },

  // Journal Data
  journal: {
    entries: Array.from({ length: 20 }, (_, i) => ({
      id: `entry-${i}`,
      date: new Date(2024, 1, Math.floor(Math.random() * 15) + 1).toISOString(),
      mood: ['positive', 'neutral', 'negative'][Math.floor(Math.random() * 3)],
      trades: Math.floor(Math.random() * 10),
      pnl: Math.round((Math.random() * 2000 - 1000) * 100) / 100,
      notes: 'Market showed strong momentum in the morning session. Key support levels held well.',
      tags: ['Morning Session', 'Trend Following', 'Breakout'].slice(0, Math.floor(Math.random() * 3) + 1),
    })),
  },

  // Goals Data
  goals: {
    active: Array.from({ length: 5 }, (_, i) => ({
      id: `goal-${i}`,
      title: `Goal ${i + 1}`,
      type: ['profit', 'trades', 'winRate'][Math.floor(Math.random() * 3)],
      target: Math.round(Math.random() * 10000),
      current: Math.round(Math.random() * 8000),
      deadline: new Date(2024, 6, 1).toISOString(),
      progress: Math.round(Math.random() * 100),
      status: ['on-track', 'at-risk', 'behind'][Math.floor(Math.random() * 3)],
    })),
  },

  // Psychology Data
  psychology: {
    entries: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(2024, 1, i + 1).toISOString(),
      emotions: {
        stress: Math.round(Math.random() * 10),
        confidence: Math.round(Math.random() * 10),
        focus: Math.round(Math.random() * 10),
        discipline: Math.round(Math.random() * 10),
      },
      tradingMetrics: {
        trades: Math.floor(Math.random() * 10),
        winRate: Math.round(Math.random() * 100),
        pnl: Math.round((Math.random() * 2000 - 1000) * 100) / 100,
      },
    })),
  },

  // Risk Data
  risk: {
    exposure: {
      total: 125000,
      bySymbol: {
        AAPL: 35000,
        GOOGL: 28000,
        MSFT: 22000,
        AMZN: 20000,
        TSLA: 20000,
      },
      bySector: {
        Technology: 45,
        Healthcare: 25,
        Finance: 15,
        Energy: 10,
        Consumer: 5,
      },
    },
    metrics: {
      var: 2458.36,
      maxDrawdown: 15.3,
      sharpeRatio: 1.8,
      beta: 1.15,
    },
  },

  // AI Chat Data
  aiChat: {
    conversations: Array.from({ length: 5 }, (_, i) => ({
      id: `conv-${i}`,
      title: `Conversation ${i + 1}`,
      messages: [
        {
          role: 'user',
          content: 'How can I improve my win rate?',
        },
        {
          role: 'assistant',
          content: 'Based on your recent trading patterns, I notice your win rate is higher during morning sessions. Consider focusing more on these hours and reducing afternoon trades where your performance shows more volatility.',
        },
      ],
      createdAt: new Date(2024, 1, Math.floor(Math.random() * 15) + 1).toISOString(),
    })),
  },
};