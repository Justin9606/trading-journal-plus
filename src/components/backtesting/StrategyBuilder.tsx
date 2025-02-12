import React, { useState } from 'react';
import { Plus, X, Save, AlertTriangle } from 'lucide-react';

interface Condition {
  id: string;
  indicator: string;
  operator: string;
  value: number;
  timeframe?: string;
}

interface Action {
  id: string;
  type: 'buy' | 'sell';
  size: number;
  stopLoss?: number;
  takeProfit?: number;
}

interface StrategyBuilderProps {
  onSave: (strategy: {
    name: string;
    description: string;
    conditions: Condition[];
    actions: Action[];
  }) => void;
  onClose: () => void;
}

export function StrategyBuilder({ onSave, onClose }: StrategyBuilderProps) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [conditions, setConditions] = useState<Condition[]>([]);
  const [actions, setActions] = useState<Action[]>([]);

  const indicators = [
    'Moving Average',
    'RSI',
    'MACD',
    'Bollinger Bands',
    'Stochastic',
    'Volume',
    'Price Action',
  ];

  const operators = ['>', '<', '>=', '<=', '==', 'crosses above', 'crosses below'];

  const addCondition = () => {
    const newCondition: Condition = {
      id: Date.now().toString(),
      indicator: indicators[0],
      operator: operators[0],
      value: 0,
    };
    setConditions([...conditions, newCondition]);
  };

  const addAction = () => {
    const newAction: Action = {
      id: Date.now().toString(),
      type: 'buy',
      size: 1,
      stopLoss: 2,
      takeProfit: 4,
    };
    setActions([...actions, newAction]);
  };

  const removeCondition = (id: string) => {
    setConditions(conditions.filter(c => c.id !== id));
  };

  const removeAction = (id: string) => {
    setActions(actions.filter(a => a.id !== id));
  };

  const handleSave = () => {
    if (!name.trim()) {
      alert('Please enter a strategy name');
      return;
    }
    if (conditions.length === 0) {
      alert('Please add at least one condition');
      return;
    }
    if (actions.length === 0) {
      alert('Please add at least one action');
      return;
    }

    onSave({
      name,
      description,
      conditions,
      actions,
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="w-full max-w-4xl bg-gray-900 rounded-xl shadow-xl border border-gray-800">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h3 className="text-lg font-semibold">Strategy Builder</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Strategy Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="e.g., Moving Average Crossover"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Description</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none h-24"
                placeholder="Describe your strategy..."
              />
            </div>
          </div>

          {/* Conditions */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-medium">Entry Conditions</h4>
              <button
                onClick={addCondition}
                className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm flex items-center space-x-1"
              >
                <Plus className="h-4 w-4" />
                <span>Add Condition</span>
              </button>
            </div>
            <div className="space-y-4">
              {conditions.map((condition) => (
                <div
                  key={condition.id}
                  className="p-4 bg-gray-800/50 rounded-lg flex items-center space-x-4"
                >
                  <select
                    value={condition.indicator}
                    onChange={(e) =>
                      setConditions(
                        conditions.map((c) =>
                          c.id === condition.id
                            ? { ...c, indicator: e.target.value }
                            : c
                        )
                      )
                    }
                    className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {indicators.map((indicator) => (
                      <option key={indicator} value={indicator}>
                        {indicator}
                      </option>
                    ))}
                  </select>
                  <select
                    value={condition.operator}
                    onChange={(e) =>
                      setConditions(
                        conditions.map((c) =>
                          c.id === condition.id
                            ? { ...c, operator: e.target.value }
                            : c
                        )
                      )
                    }
                    className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    {operators.map((operator) => (
                      <option key={operator} value={operator}>
                        {operator}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    value={condition.value}
                    onChange={(e) =>
                      setConditions(
                        conditions.map((c) =>
                          c.id === condition.id
                            ? { ...c, value: Number(e.target.value) }
                            : c
                        )
                      )
                    }
                    className="w-24 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                  <button
                    onClick={() => removeCondition(condition.id)}
                    className="p-2 hover:bg-gray-700 rounded-lg text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
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
              {actions.map((action) => (
                <div
                  key={action.id}
                  className="p-4 bg-gray-800/50 rounded-lg flex items-center space-x-4"
                >
                  <select
                    value={action.type}
                    onChange={(e) =>
                      setActions(
                        actions.map((a) =>
                          a.id === action.id
                            ? { ...a, type: e.target.value as 'buy' | 'sell' }
                            : a
                        )
                      )
                    }
                    className="flex-1 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="buy">Buy</option>
                    <option value="sell">Sell</option>
                  </select>
                  <input
                    type="number"
                    value={action.size}
                    onChange={(e) =>
                      setActions(
                        actions.map((a) =>
                          a.id === action.id
                            ? { ...a, size: Number(e.target.value) }
                            : a
                        )
                      )
                    }
                    className="w-24 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Size"
                  />
                  <input
                    type="number"
                    value={action.stopLoss}
                    onChange={(e) =>
                      setActions(
                        actions.map((a) =>
                          a.id === action.id
                            ? { ...a, stopLoss: Number(e.target.value) }
                            : a
                        )
                      )
                    }
                    className="w-24 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Stop Loss %"
                  />
                  <input
                    type="number"
                    value={action.takeProfit}
                    onChange={(e) =>
                      setActions(
                        actions.map((a) =>
                          a.id === action.id
                            ? { ...a, takeProfit: Number(e.target.value) }
                            : a
                        )
                      )
                    }
                    className="w-24 px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Take Profit %"
                  />
                  <button
                    onClick={() => removeAction(action.id)}
                    className="p-2 hover:bg-gray-700 rounded-lg text-red-400"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Warning */}
          <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-yellow-500 mt-0.5" />
            <div>
              <h5 className="font-medium text-yellow-500">Important Note</h5>
              <p className="text-sm text-gray-400">
                Backtesting results are simulated and may not reflect actual market conditions.
                Past performance does not guarantee future results.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end p-4 border-t border-gray-800 space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 hover:bg-gray-800 rounded-lg transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center space-x-2"
          >
            <Save className="h-5 w-5" />
            <span>Save Strategy</span>
          </button>
        </div>
      </div>
    </div>
  );
}