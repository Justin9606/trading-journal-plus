import React, { useState } from 'react';
import {
  Target,
  TrendingUp,
  Calendar,
  CheckCircle2,
  Clock,
  AlertCircle,
  Plus,
  Edit2,
  Trash2,
  ChevronRight,
  BarChart2,
  Filter,
  Download,
  Flag,
  Award,
  Star,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  RefreshCw,
} from 'lucide-react';

interface Goal {
  id: string;
  title: string;
  description: string;
  category: 'profit' | 'trades' | 'winRate' | 'risk' | 'learning';
  target: number;
  current: number;
  deadline: string;
  startDate: string;
  status: 'ongoing' | 'completed' | 'at-risk' | 'failed';
  priority: 'low' | 'medium' | 'high';
  milestones: {
    value: number;
    achieved: boolean;
    date?: string;
  }[];
  metrics: {
    progressRate: number;
    timeRemaining: number;
    probability: number;
    requiredRate: number;
  };
  dependencies?: string[];
  tags: string[];
}

// Mock data generator
const generateMockGoals = (): Goal[] => {
  const categories = ['profit', 'trades', 'winRate', 'risk', 'learning'] as const;
  const priorities = ['low', 'medium', 'high'] as const;
  const statuses = ['ongoing', 'completed', 'at-risk', 'failed'] as const;

  return Array.from({ length: 8 }, (_, i) => {
    const target = Math.round(Math.random() * 10000);
    const current = Math.round(Math.random() * target);
    const category = categories[Math.floor(Math.random() * categories.length)];
    
    return {
      id: `goal-${i}`,
      title: `${category.charAt(0).toUpperCase() + category.slice(1)} Goal ${i + 1}`,
      description: 'Achieve consistent trading performance through disciplined execution',
      category,
      target,
      current,
      deadline: new Date(2024, 5, 30).toISOString(),
      startDate: new Date(2024, 0, 1).toISOString(),
      status: statuses[Math.floor(Math.random() * statuses.length)],
      priority: priorities[Math.floor(Math.random() * priorities.length)],
      milestones: Array.from({ length: 4 }, (_, j) => ({
        value: Math.round((j + 1) * (target / 4)),
        achieved: Math.random() > 0.5,
        date: Math.random() > 0.5 ? new Date().toISOString() : undefined,
      })),
      metrics: {
        progressRate: Math.round((current / target) * 100),
        timeRemaining: Math.floor(Math.random() * 30),
        probability: Math.round(Math.random() * 100),
        requiredRate: Math.round(Math.random() * 100),
      },
      dependencies: Math.random() > 0.5 ? [`goal-${Math.floor(Math.random() * i)}`] : undefined,
      tags: ['Important', 'Q1', '2024'].slice(0, Math.floor(Math.random() * 3) + 1),
    };
  });
};

export default function Goals() {
  const [goals, setGoals] = useState<Goal[]>(generateMockGoals());
  const [selectedGoal, setSelectedGoal] = useState<Goal | null>(null);
  const [filter, setFilter] = useState({
    status: 'all',
    category: 'all',
    priority: 'all',
  });

  const getProgressColor = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-500';
      case 'at-risk':
        return 'bg-yellow-500';
      case 'failed':
        return 'bg-red-500';
      default:
        return 'bg-primary-500';
    }
  };

  const getStatusIcon = (status: Goal['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'at-risk':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      case 'failed':
        return <TrendingDown className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-primary-500" />;
    }
  };

  const getPriorityColor = (priority: Goal['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-400 bg-red-400/20';
      case 'medium':
        return 'text-yellow-400 bg-yellow-400/20';
      default:
        return 'text-blue-400 bg-blue-400/20';
    }
  };

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold mb-2">Trading Goals</h1>
          <p className="text-gray-400">Track and achieve your trading objectives</p>
        </div>
        
        <div className="flex items-center space-x-4">
          {/* Filters */}
          <div className="flex items-center space-x-2">
            <select
              value={filter.status}
              onChange={(e) => setFilter({ ...filter, status: e.target.value })}
              className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Status</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
              <option value="at-risk">At Risk</option>
              <option value="failed">Failed</option>
            </select>

            <select
              value={filter.category}
              onChange={(e) => setFilter({ ...filter, category: e.target.value })}
              className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Categories</option>
              <option value="profit">Profit</option>
              <option value="trades">Trades</option>
              <option value="winRate">Win Rate</option>
              <option value="risk">Risk</option>
              <option value="learning">Learning</option>
            </select>

            <select
              value={filter.priority}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value })}
              className="px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
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

          {/* New Goal Button */}
          <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg flex items-center space-x-2">
            <Plus className="h-5 w-5" />
            <span>New Goal</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Stats */}
        <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              label: 'Active Goals',
              value: goals.filter((g) => g.status === 'ongoing').length,
              change: '+2',
              icon: Target,
              color: 'text-primary-400',
            },
            {
              label: 'Completion Rate',
              value: '75%',
              change: '+5%',
              icon: CheckCircle2,
              color: 'text-green-400',
            },
            {
              label: 'At Risk',
              value: goals.filter((g) => g.status === 'at-risk').length,
              change: '-1',
              icon: AlertCircle,
              color: 'text-yellow-400',
            },
            {
              label: 'Average Progress',
              value: '68%',
              change: '+12%',
              icon: TrendingUp,
              color: 'text-blue-400',
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

        {/* Goals List */}
        <div className="lg:col-span-2">
          <div className="glass-effect rounded-xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Active Goals</h3>
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
              {goals.map((goal) => (
                <div
                  key={goal.id}
                  onClick={() => setSelectedGoal(goal)}
                  className={`p-4 rounded-lg transition-all cursor-pointer ${
                    selectedGoal?.id === goal.id
                      ? 'bg-primary-500/20 border border-primary-500/50'
                      : 'hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg font-medium">{goal.title}</span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(
                          goal.priority
                        )}`}
                      >
                        {goal.priority.toUpperCase()}
                      </span>
                    </div>
                    {getStatusIcon(goal.status)}
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">Progress</span>
                      <span>
                        {goal.current} / {goal.target}
                        {goal.category === 'winRate' ? '%' : ''}
                        {goal.category === 'profit' ? '$' : ''}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${getProgressColor(goal.status)}`}
                        style={{
                          width: `${(goal.current / goal.target) * 100}%`,
                        }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-400">
                    <div className="flex items-center space-x-4">
                      <span>{new Date(goal.deadline).toLocaleDateString()}</span>
                      <span>{goal.metrics.timeRemaining} days left</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {goal.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Goal Details */}
        <div className="glass-effect rounded-xl p-6">
          {selectedGoal ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold">Goal Details</h3>
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
                  <h4 className="text-2xl font-bold mb-2">{selectedGoal.title}</h4>
                  <p className="text-gray-400">{selectedGoal.description}</p>
                </div>

                {/* Progress Overview */}
                <div className="p-4 bg-gray-800/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-400">Overall Progress</span>
                    <span className="font-medium">
                      {selectedGoal.metrics.progressRate}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-700 rounded-full overflow-hidden mb-4">
                    <div
                      className={`h-full ${getProgressColor(selectedGoal.status)}`}
                      style={{
                        width: `${selectedGoal.metrics.progressRate}%`,
                      }}
                    ></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Current</p>
                      <p className="font-medium">
                        {selectedGoal.current}
                        {selectedGoal.category === 'winRate' ? '%' : ''}
                        {selectedGoal.category === 'profit' ? '$' : ''}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">Target</p>
                      <p className="font-medium">
                        {selectedGoal.target}
                        {selectedGoal.category === 'winRate' ? '%' : ''}
                        {selectedGoal.category === 'profit' ? '$' : ''}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Milestones</h4>
                  <div className="space-y-2">
                    {selectedGoal.milestones.map((milestone, index) => (
                      <div
                        key={index}
                        className="p-3 bg-gray-800/50 rounded-lg flex items-center justify-between"
                      >
                        <div>
                          <p className="font-medium">
                            {milestone.value}
                            {selectedGoal.category === 'winRate' ? '%' : ''}
                            {selectedGoal.category === 'profit' ? '$' : ''}
                          </p>
                          {milestone.date && (
                            <p className="text-sm text-gray-400">
                              {new Date(milestone.date).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                        {milestone.achieved ? (
                          <CheckCircle2 className="h-5 w-5 text-green-400" />
                        ) : (
                          <Flag className="h-5 w-5 text-gray-400" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Performance Metrics */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">
                    Performance Metrics
                  </h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Time Remaining</p>
                      <p className="text-sm font-medium">
                        {selectedGoal.metrics.timeRemaining} days
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Required Rate</p>
                      <p className="text-sm font-medium">
                        {selectedGoal.metrics.requiredRate}/day
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Success Probability</p>
                      <p className="text-sm font-medium">
                        {selectedGoal.metrics.probability}%
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Progress Rate</p>
                      <p className="text-sm font-medium">
                        {selectedGoal.metrics.progressRate}%
                      </p>
                    </div>
                  </div>
                </div>

                {/* Dependencies */}
                {selectedGoal.dependencies && (
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-2">
                      Dependencies
                    </h4>
                    <div className="space-y-2">
                      {selectedGoal.dependencies.map((depId) => {
                        const dep = goals.find((g) => g.id === depId);
                        return (
                          dep && (
                            <div
                              key={depId}
                              className="p-3 bg-gray-800/50 rounded-lg flex items-center justify-between"
                            >
                              <span>{dep.title}</span>
                              {getStatusIcon(dep.status)}
                            </div>
                          )
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Timeline */}
                <div>
                  <h4 className="text-sm font-medium text-gray-400 mb-2">Timeline</h4>
                  <div className="space-y-2">
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Start Date</p>
                      <p className="text-sm font-medium">
                        {new Date(selectedGoal.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="p-3 bg-gray-800/50 rounded-lg">
                      <p className="text-xs text-gray-400 mb-1">Deadline</p>
                      <p className="text-sm font-medium">
                        {new Date(selectedGoal.deadline).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-400">
              <p>Select a goal to view details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}