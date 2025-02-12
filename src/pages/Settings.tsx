import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  User,
  Bell,
  Lock,
  Database,
  Globe,
  Zap,
  Mail,
  ChevronRight,
  Shield,
  CreditCard,
  RefreshCw,
  Download,
  Upload,
  Key,
  Smartphone,
  AlertTriangle,
  Eye,
  EyeOff,
  Check,
  X,
  Clock,
  BarChart2,
  DollarSign,
  Percent,
  Target,
  Activity,
} from 'lucide-react';

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  email: boolean;
  push: boolean;
  sms: boolean;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  scopes: string[];
}

export default function Settings() {
  const [activeSection, setActiveSection] = useState('profile');
  const [showApiKey, setShowApiKey] = useState(false);
  const [notifications, setNotifications] = useState<NotificationSetting[]>([
    {
      id: 'trades',
      label: 'Trade Notifications',
      description: 'Get notified about trade executions and updates',
      email: true,
      push: true,
      sms: false,
    },
    {
      id: 'alerts',
      label: 'Risk Alerts',
      description: 'Receive alerts when risk thresholds are exceeded',
      email: true,
      push: true,
      sms: true,
    },
    {
      id: 'news',
      label: 'Market News',
      description: 'Stay updated with relevant market news',
      email: false,
      push: true,
      sms: false,
    },
    {
      id: 'reports',
      label: 'Performance Reports',
      description: 'Receive daily and weekly performance summaries',
      email: true,
      push: false,
      sms: false,
    },
  ]);

  const [apiKeys] = useState<ApiKey[]>([
    {
      id: '1',
      name: 'Trading Bot',
      key: 'sk_live_123456789',
      created: '2024-02-01',
      lastUsed: '2024-02-15',
      scopes: ['read', 'trade', 'account'],
    },
    {
      id: '2',
      name: 'Analytics Integration',
      key: 'sk_live_987654321',
      created: '2024-01-15',
      lastUsed: '2024-02-14',
      scopes: ['read'],
    },
  ]);

  const [tradingPreferences] = useState({
    defaultRiskPerTrade: 1,
    maxPositionSize: 5,
    defaultTimeframe: '1h',
    autoStopLoss: true,
    autoProfitTarget: true,
    tradingHours: {
      start: '09:30',
      end: '16:00',
    },
    instruments: ['Stocks', 'ETFs', 'Options'],
  });

  const navigationItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'data', label: 'Data Management', icon: Database },
    { id: 'api', label: 'API Connections', icon: Globe },
    { id: 'preferences', label: 'Trading Preferences', icon: Zap },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="flex items-start space-x-4 mb-6">
              <img
                src="https://api.dicebear.com/7.x/avatars/svg?seed=John"
                alt="Profile"
                className="w-20 h-20 rounded-lg"
              />
              <div>
                <h4 className="font-medium mb-1">John Doe</h4>
                <p className="text-gray-400 text-sm mb-3">john.doe@example.com</p>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm">
                  Change Avatar
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-2">Display Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john.doe@example.com"
                  className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Time Zone</label>
                <select className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>UTC-05:00 Eastern Time</option>
                  <option>UTC-08:00 Pacific Time</option>
                  <option>UTC+00:00 GMT</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-2">Date Format</label>
                <select className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                  <option>MM/DD/YYYY</option>
                  <option>DD/MM/YYYY</option>
                  <option>YYYY-MM-DD</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 bg-gray-800/50 rounded-lg space-y-4"
              >
                <div>
                  <h4 className="font-medium">{notification.label}</h4>
                  <p className="text-sm text-gray-400">{notification.description}</p>
                </div>
                <div className="flex items-center space-x-4">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notification.email}
                      onChange={(e) => {
                        const updated = notifications.map((n) =>
                          n.id === notification.id
                            ? { ...n, email: e.target.checked }
                            : n
                        );
                        setNotifications(updated);
                      }}
                      className="form-checkbox h-4 w-4 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm">Email</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notification.push}
                      onChange={(e) => {
                        const updated = notifications.map((n) =>
                          n.id === notification.id
                            ? { ...n, push: e.target.checked }
                            : n
                        );
                        setNotifications(updated);
                      }}
                      className="form-checkbox h-4 w-4 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm">Push</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={notification.sms}
                      onChange={(e) => {
                        const updated = notifications.map((n) =>
                          n.id === notification.id
                            ? { ...n, sms: e.target.checked }
                            : n
                        );
                        setNotifications(updated);
                      }}
                      className="form-checkbox h-4 w-4 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm">SMS</span>
                  </label>
                </div>
              </div>
            ))}
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg">
                  Enable
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Password</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Current Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg">
                  Update Password
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Security Log</h4>
              <div className="space-y-2">
                {[
                  {
                    action: 'Password changed',
                    date: '2024-02-15 14:30',
                    ip: '192.168.1.1',
                  },
                  {
                    action: 'New login',
                    date: '2024-02-14 09:15',
                    ip: '192.168.1.1',
                  },
                ].map((log, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <div>
                      <p className="text-sm">{log.action}</p>
                      <p className="text-xs text-gray-400">{log.ip}</p>
                    </div>
                    <p className="text-sm text-gray-400">{log.date}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'data':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Download className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium">Export Data</h4>
                    <p className="text-sm text-gray-400">
                      Download your trading history and analytics
                    </p>
                  </div>
                </div>
                <select className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 mb-4">
                  <option>All Data</option>
                  <option>Trading History</option>
                  <option>Analytics</option>
                  <option>Journal Entries</option>
                </select>
                <button className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg">
                  Export
                </button>
              </div>

              <div className="p-4 bg-gray-800/50 rounded-lg">
                <div className="flex items-center space-x-3 mb-4">
                  <Upload className="h-5 w-5 text-gray-400" />
                  <div>
                    <h4 className="font-medium">Import Data</h4>
                    <p className="text-sm text-gray-400">
                      Import external trading data
                    </p>
                  </div>
                </div>
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 text-center mb-4">
                  <p className="text-sm text-gray-400">
                    Drag and drop files here or click to browse
                  </p>
                </div>
                <button className="w-full px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg">
                  Import
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Data Management</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Backup</p>
                    <p className="text-sm text-gray-400">
                      Automatically backup your data daily
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Data Retention</p>
                    <p className="text-sm text-gray-400">
                      Keep trading history for 2 years
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm">
                    Change
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'api':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <div className="flex items-center justify-between mb-4">
                <h4 className="font-medium">API Keys</h4>
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg text-sm">
                  Generate New Key
                </button>
              </div>
              <div className="space-y-4">
                {apiKeys.map((apiKey) => (
                  <div key={apiKey.id} className="p-4 bg-gray-800 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium">{apiKey.name}</h5>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                        <button className="p-1.5 rounded-lg hover:bg-gray-700 transition-colors text-red-400">
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                    <div className="mb-2">
                      <p className="text-sm font-mono bg-gray-900 p-2 rounded">
                        {showApiKey ? apiKey.key : '•'.repeat(20)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-gray-400">
                      <span>Created: {apiKey.created}</span>
                      <span>Last used: {apiKey.lastUsed}</span>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {apiKey.scopes.map((scope) => (
                        <span
                          key={scope}
                          className="px-2 py-1 bg-gray-700 rounded-full text-xs"
                        >
                          {scope}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Webhooks</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Trade Notifications</p>
                    <p className="text-sm text-gray-400">
                      Send trade events to external services
                    </p>
                  </div>
                  <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm">
                    Configure
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case 'preferences':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Trading Parameters</h4>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Default Risk per Trade (%)
                  </label>
                  <input
                    type="number"
                    defaultValue={tradingPreferences.defaultRiskPerTrade}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Max Position Size (%)
                  </label>
                  <input
                    type="number"
                    defaultValue={tradingPreferences.maxPositionSize}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Default Timeframe
                  </label>
                  <select
                    defaultValue={tradingPreferences.defaultTimeframe}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="1m">1 minute</option>
                    <option value="5m">5 minutes</option>
                    <option value="15m">15 minutes</option>
                    <option value="1h">1 hour</option>
                    <option value="4h">4 hours</option>
                    <option value="1d">1 day</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Automation</h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Stop Loss</p>
                    <p className="text-sm text-gray-400">
                      Automatically set stop loss based on risk parameters
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={tradingPreferences.autoStopLoss}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Auto Take Profit</p>
                    <p className="text-sm text-gray-400">
                      Automatically set profit targets
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      className="sr-only peer"
                      defaultChecked={tradingPreferences.autoProfitTarget}
                    />
                    <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-primary-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-500"></div>
                  </label>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Trading Schedule</h4>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Trading Start Time
                  </label>
                  <input
                    type="time"
                    defaultValue={tradingPreferences.tradingHours.start}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-2">
                    Trading End Time
                  </label>
                  <input
                    type="time"
                    defaultValue={tradingPreferences.tradingHours.end}
                    className="w-full px-4 py-2 bg-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Instruments</h4>
              <div className="space-y-2">
                {tradingPreferences.instruments.map((instrument) => (
                  <label
                    key={instrument}
                    className="flex items-center space-x-2"
                  >
                    <input
                      type="checkbox"
                      defaultChecked
                      className="form-checkbox h-4 w-4 text-primary-500 rounded focus:ring-primary-500"
                    />
                    <span>{instrument}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Current Plan</h4>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-xl font-bold">Professional</p>
                  <p className="text-sm text-gray-400">$89/month</p>
                </div>
                <button className="px-4 py-2 bg-primary-500 hover:bg-primary-600 rounded-lg">
                  Upgrade
                </button>
              </div>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Advanced Analytics</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>Real-time Data</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Check className="h-4 w-4 text-green-400" />
                  <span>API Access</span>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Payment Method</h4>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex-1 p-4 border border-gray-700 rounded-lg">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="h-5 w-5 text-gray-400" />
                    <span>•••• 4242</span>
                  </div>
                </div>
                <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg">
                  Change
                </button>
              </div>
            </div>

            <div className="p-4 bg-gray-800/50 rounded-lg">
              <h4 className="font-medium mb-4">Billing History</h4>
              <div className="space-y-4">
                {[
                  {
                    date: '2024-02-01',
                    amount: '$89.00',
                    status: 'Paid',
                  },
                  {
                    date: '2024-01-01',
                    amount: '$89.00',
                    status: 'Paid',
                  },
                ].map((invoice, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between py-2 border-b border-gray-700"
                  >
                    <div>
                      <p className="font-medium">{invoice.amount}</p>
                      <p className="text-sm text-gray-400">{invoice.date}</p>
                    </div>
                    <div className="flex items-center space-x-4">
                      <span className="text-green-400 text-sm">
                        {invoice.status}
                      </span>
                      <Download className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Navigation */}
        <div className="glass-effect rounded-xl p-6">
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors ${
                  activeSection === item.id
                    ? 'bg-primary-500/20 text-primary-400'
                    : 'hover:bg-gray-800'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </div>
                 <ChevronRight className="h-5 w-5 text-gray-400" />
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 glass-effect rounded-xl p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}