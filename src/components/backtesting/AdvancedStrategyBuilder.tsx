import React, { useState } from 'react';
import {
  Plus, X, Save, AlertTriangle, ChevronDown, ChevronRight,
  Settings, Code, Play, Pause, Copy, Trash2, Edit2, Eye,
  ArrowRight, Zap, Target, Activity, TrendingUp, TrendingDown,
  BarChart2, LineChart, CandlestickChart
} from 'lucide-react';

interface Indicator {
  id: string;
  type: string;
  params: Record<string, any>;
  output: string[];
}

interface Condition {
  id: string;
  indicator: string;
  operator: string;
  value: number;
  timeframe?: string;
}

interface Action {
  id: string;
  type: 'buy' | 'sell' | 'close';
  size: number;
  stopLoss?: number;
  takeProfit?: number;
  trailingStop?: number;
}

interface Strategy {
  id: string;
  name: string;
  description: string;
  indicators: Indicator[];
  conditions: {
    entry: Condition[];
    exit: Condition[];
  };
  actions: Action[];
  riskManagement: {
    maxPositions: number;
    maxDrawdown: number;
    positionSizing: 'fixed' | 'risk-based' | 'kelly';
    riskPerTrade: number;
  };
}

export function AdvancedStrategyBuilder({
  onSave,
  onClose,
  initialStrategy,
}: {
  onSave: (strategy: Strategy) => void;
  onClose: () => void;
  initialStrategy?: Strategy;
}) {
  const [activeTab, setActiveTab] = useState('visual'); // 'visual' | 'code'
  const [strategy, setStrategy] = useState<Strategy>(
    initialStrategy || {
      id: Date.now().toString(),
      name: '',
      description: '',
      indicators: [],
      conditions: {
        entry: [],
        exit: [],
      },
      actions: [],
      riskManagement: {
        maxPositions: 1,
        maxDrawdown: 10,
        positionSizing: 'risk-based',
        riskPerTrade: 1,
      },
    }
  );
  const [showPreview, setShowPreview] = useState(false);
  const [isBacktesting, setIsBacktesting] = useState(false);

  const indicatorTypes = [
    { type: 'MA', name: 'Moving Average', params: ['period', 'source', 'type'] },
    { type: 'RSI', name: 'Relative Strength Index', params: ['period'] },
    { type: 'MACD', name: 'MACD', params: ['fastPeriod', 'slowPeriod', 'signalPeriod'] },
    { type: 'BB', name: 'Bollinger Bands', params: ['period', 'stdDev'] },
    { type: 'ATR', name: 'Average True Range', params: ['period'] },
  ];

  const addIndicator = (type: string) => {
    const indicator = indicatorTypes.find((i) => i.type === type);
    if (!indicator) return;

    const newIndicator: Indicator = {
      id: Date.now().toString(),
      type,
      params: indicator.params.reduce((acc, param) => ({ ...acc, [param]: '' }), {}),
      output: ['value'],
    };

    setStrategy({
      ...strategy,
      indicators: [...strategy.indicators, newIndicator],
    });
  };

  const addCondition = (type: 'entry' | 'exit') => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      indicator: strategy.indicators[0]?.id || '',
      operator: '>',
      value: 0,
    };

    setStrategy({
      ...strategy,
      conditions: {
        ...strategy.conditions,
        [type]: [...strategy.conditions[type], newCondition],
      },
    });
  };

  const addAction = () => {
    const newAction: Action = {
      id: Date.now().toString(),
      type: 'buy',
      size: 1,
      stopLoss: 2,
      takeProfit: 4,
    };

    setStrategy({
      ...strategy,
      actions: [...strategy.actions, newAction],
    });
  };

  const handleSave = () => {
    if (!strategy.name.trim()) {
      alert('Please enter a strategy name');
      return;
    }
    if (strategy.indicators.length === 0) {
      alert('Please add at least one indicator');
      return;
    }
    if (strategy.conditions.entry.length === 0) {
      alert('Please add at least one entry condition');
      return;
    }
    if (strategy.actions.length === 0) {
      alert('Please add at least one action');
      return;
    }

    onSave(strategy);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-7xl h-[90vh] bg-gray-900 rounded-xl shadow-xl border border-gray-800 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <h3 className="text-lg font-semibold">Advanced Strategy Builder</h3>
            <div className="flex items-center space-x-2 bg-gray-800 rounded-lg p-1">
              <button
                onClick={() => setActiveTab('visual')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'visual'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Visual Editor
              </button>
              <button
                onClick={() => setActiveTab('code')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  activeTab === 'code'
                    ? 'bg-primary-500 text-white'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                Code Editor
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowPreview(!showPreview)}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <Eye className="h-5 w-5" />
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>Save Strategy</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 overflow-hidden flex">
          {/* Strategy Editor */}
          <div className="w-2/3 border-r border-gray-800 flex flex-col">
            {/* Basic Info */}
            <div className="p-6 border-b border-gray-800">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Strategy Name</label>
                  <input
                    type="text"
                    value={strategy.name}
                    onChange={(e) => setStrategy({ ...strategy, name: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., MA Crossover with RSI Filter"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">Description</label>
                  <textarea
                    value={strategy.description}
                    onChange={(e) => setStrategy({ ...strategy, description: e.target.value })}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-20"
                    placeholder="Describe your strategy..."
                  />
                </div>
              </div>
            </div>

            {/* Strategy Components */}
            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {/* Indicators */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Indicators</h4>
                  <div className="relative">
                    <button
                      onClick={() => {}}
                      className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center space-x-1"
                    >
                      <Plus className="h-4 w-4" />
                      <span>Add Indicator</span>
                      <ChevronDown className="h-4 w-4" />
                    </button>
                    {/* Indicator dropdown menu */}
                  </div>
                </div>
                <div className="space-y-4">
                  {strategy.indicators.map((indicator) => (
                    <div
                      key={indicator.id}
                      className="p-4 bg-gray-800/50 rounded-lg flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="p-2 bg-gray-800 rounded-lg">
                          <LineChart className="h-5 w-5 text-primary-400" />
                        </div>
                        <div>
                          <p className="font-medium">{indicator.type}</p>
                          <p className="text-sm text-gray-400">
                            {Object.entries(indicator.params)
                              .map(([key, value]) => `${key}: ${value}`)
                              .join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button className="p-1.5 hover:bg-gray-700 rounded-lg">
                          <Settings className="h-4 w-4" />
                        </button>
                        <button className="p-1.5 hover:bg-gray-700 rounded-lg text-red-400">
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Entry Conditions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Entry Conditions</h4>
                  <button
                    onClick={() => addCondition('entry')}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Condition</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {strategy.conditions.entry.map((condition) => (
                    <div
                      key={condition.id}
                      className="p-4 bg-gray-800/50 rounded-lg flex items-center space-x-4"
                    >
                      <select
                        value={condition.indicator}
                        onChange={(e) =>
                          setStrategy({
                            ...strategy,
                            conditions: {
                              ...strategy.conditions,
                              entry: strategy.conditions.entry.map((c) =>
                                c.id === condition.id
                                  ? { ...c, indicator: e.target.value }
                                  : c
                              ),
                            },
                          })
                        }
                        className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        {strategy.indicators.map((indicator) => (
                          <option key={indicator.id} value={indicator.id}>
                            {indicator.type}
                          </option>
                        ))}
                      </select>
                      <select
                        value={condition.operator}
                        onChange={(e) =>
                          setStrategy({
                            ...strategy,
                            conditions: {
                              ...strategy.conditions,
                              entry: strategy.conditions.entry.map((c) =>
                                c.id === condition.id
                                  ? { ...c, operator: e.target.value }
                                  : c
                              ),
                            },
                          })
                        }
                        className="w-32 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      >
                        <option value=">">Greater than</option>
                        <option value="<">Less than</option>
                        <option value=">=">Greater or equal</option>
                        <option value="<=">Less or equal</option>
                        <option value="==">Equals</option>
                        <option value="crosses above">Crosses Above</option>
                        <option value="crosses below">Crosses Below</option>
                      </select>
                      <input
                        type="number"
                        value={condition.value}
                        onChange={(e) =>
                          setStrategy({
                            ...strategy,
                            conditions: {
                              ...strategy.conditions,
                              entry: strategy.conditions.entry.map((c) =>
                                c.id === condition.id
                                  ? { ...c, value: Number(e.target.value) }
                                  : c
                              ),
                            },
                          })
                        }
                        className="w-32 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      />
                      <button className="p-2 hover:bg-gray-700 rounded-lg text-red-400">
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Exit Conditions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Exit Conditions</h4>
                  <button
                    onClick={() => addCondition('exit')}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Condition</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {strategy.conditions.exit.map((condition) => (
                    <div
                      key={condition.id}
                      className="p-4 bg-gray-800/50 rounded-lg flex items-center space-x-4"
                    >
                      {/* Similar to entry conditions */}
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-medium">Trade Actions</h4>
                  <button
                    onClick={addAction}
                    className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center space-x-1"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add Action</span>
                  </button>
                </div>
                <div className="space-y-4">
                  {strategy.actions.map((action) => (
                    <div
                      key={action.id}
                      className="p-4 bg-gray-800/50 rounded-lg space-y-4"
                    >
                      <div className="flex items-center justify-between">
                        <select
                          value={action.type}
                          onChange={(e) =>
                            setStrategy({
                              ...strategy,
                              actions: strategy.actions.map((a) =>
                                a.id === action.id
                                  ? { ...a, type: e.target.value as 'buy' | 'sell' | 'close' }
                                  : a
                              ),
                            })
                          }
                          className="w-32 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          <option value="buy">Buy</option>
                          <option value="sell">Sell</option>
                          <option value="close">Close</option>
                        </select>
                        <button className="p-2 hover:bg-gray-700 rounded-lg text-red-400">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Position Size
                          </label>
                          <input
                            type="number"
                            value={action.size}
                            onChange={(e) =>
                              setStrategy({
                                ...strategy,
                                actions: strategy.actions.map((a) =>
                                  a.id === action.id
                                    ? { ...a, size: Number(e.target.value) }
                                    : a
                                ),
                              })
                            }
                            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Stop Loss (%)
                          </label>
                          <input
                            type="number"
                            value={action.stopLoss}
                            onChange={(e) =>
                              setStrategy({
                                ...strategy,
                                actions: strategy.actions.map((a) =>
                                  a.id === action.id
                                    ? { ...a, stopLoss: Number(e.target.value) }
                                    : a
                                ),
                              })
                            }
                            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-gray-400 mb-2">
                            Take Profit (%)
                          </label>
                          <input
                            type="number"
                            value={action.takeProfit}
                            onChange={(e) =>
                              setStrategy({
                                ...strategy,
                                actions: strategy.actions.map((a) =>
                                  a.id === action.id
                                    ? { ...a, takeProfit: Number(e.target.value) }
                                    : a
                                ),
                              })
                            }
                            className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Risk Management */}
              <div>
                <h4 className="font-medium mb-4">Risk Management</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Max Open Positions
                    </label>
                    <input
                      type="number"
                      value={strategy.riskManagement.maxPositions}
                      onChange={(e) =>
                        setStrategy({
                          ...strategy,
                          riskManagement: {
                            ...strategy.riskManagement,
                            maxPositions: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Max Drawdown (%)
                    </label>
                    <input
                      type="number"
                      value={strategy.riskManagement.maxDrawdown}
                      onChange={(e) =>
                        setStrategy({
                          ...strategy,
                          riskManagement: {
                            ...strategy.riskManagement,
                            maxDrawdown: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Position Sizing
                    </label>
                    <select
                      value={strategy.riskManagement.positionSizing}
                      onChange={(e) =>
                        setStrategy({
                          ...strategy,
                          riskManagement: {
                            ...strategy.riskManagement,
                            positionSizing: e.target.value as any,
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="fixed">Fixed Size</option>
                      <option value="risk-based">Risk-Based</option>
                      <option value="kelly">Kelly Criterion</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-2">
                      Risk per Trade (%)
                    </label>
                    <input
                      type="number"
                      value={strategy.riskManagement.riskPerTrade}
                      onChange={(e) =>
                        setStrategy({
                          ...strategy,
                          riskManagement: {
                            ...strategy.riskManagement,
                            riskPerTrade: Number(e.target.value),
                          },
                        })
                      }
                      className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Preview Panel */}
          <div className="w-1/3 flex flex-col">
            <div className="p-4 border-b border-gray-800 bg-gray-900/50">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Strategy Preview</h4>
                <button
                  onClick={() => setIsBacktesting(!isBacktesting)}
                  className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                    isBacktesting
                      ? 'bg-red-500 hover:bg-red-600'
                      : 'bg-primary-500 hover:bg-primary-600'
                  }`}
                >
                  {isBacktesting ? (
                    <>
                      <Pause className="h-4 w-4" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-4 w-4" />
                      <span>Test Strategy</span>
                    </>
                  )}
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {/* Strategy Summary */}
              <div className="space-y-6">
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium mb-2">Strategy Overview</h5>
                  <div className="space-y-2 text-sm">
                    <p>
                      <span className="text-gray-400">Name:</span> {strategy.name}
                    </p>
                    <p>
                      <span className="text-gray-400">Indicators:</span>{' '}
                      {strategy.indicators.length}
                    </p>
                    <p>
                      <span className="text-gray-400">Entry Conditions:</span>{' '}
                      {strategy.conditions.entry.length}
                    </p>
                    <p>
                      <span className="text-gray-400">Exit Conditions:</span>{' '}
                      {strategy.conditions.exit.length}
                    </p>
                    <p>
                      <span className="text-gray-400">Actions:</span>{' '}
                      {strategy.actions.length}
                    </p>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Win Rate</span>
                      <Target className="h-4 w-4 text-green-400" />
                    </div>
                    <p className="text-2xl font-bold">68.5%</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Profit Factor</span>
                      <Activity className="h-4 w-4 text-blue-400" />
                    </div>
                    <p className="text-2xl font-bold">2.3</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Max Drawdown</span>
                      <TrendingDown className="h-4 w-4 text-red-400" />
                    </div>
                    <p className="text-2xl font-bold">15.3%</p>
                  </div>
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400">Sharpe Ratio</span>
                      <BarChart2 className="h-4 w-4 text-purple-400" />
                    </div>
                    <p className="text-2xl font-bold">1.85</p>
                  </div>
                </div>

                {/* Performance Chart */}
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium mb-4">Performance</h5>
                  <div className="h-48 bg-gray-800 rounded-lg"></div>
                </div>

                {/* Trade List */}
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <h5 className="font-medium mb-4">Recent Trades</h5>
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-2 bg-gray-800 rounded-lg"
                      >
                        <div>
                          <p className="font-medium">AAPL</p>
                          <p className="text-sm text-gray-400">Buy @ $180.50</p>
                        </div>
                        <span className="text-green-400">+$245.36</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}