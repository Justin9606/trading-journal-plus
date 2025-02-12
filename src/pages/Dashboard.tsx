import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
  BarChart2, BookOpen, Target, Brain, Activity,
  MessageSquare, Settings, ChevronLeft, Bell, Search,
  User, LineChart, PlaySquare
} from 'lucide-react';

const navigationItems = [
  { icon: BarChart2, label: 'Analytics', id: 'analytics' },
  { icon: LineChart, label: 'Trading', id: 'trading' },
  { icon: PlaySquare, label: 'Backtesting', id: 'backtesting' },
  { icon: BookOpen, label: 'Journal', id: 'journal' },
  { icon: Target, label: 'Goals', id: 'goals' },
  { icon: Brain, label: 'Psychology', id: 'psychology' },
  { icon: Activity, label: 'Risk', id: 'risk' },
  { icon: MessageSquare, label: 'AI Chat', id: 'ai-chat' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

const Dashboard = () => {
  const location = useLocation();
  const currentPath = location.pathname.split('/').pop();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-gray-900 flex text-white">
      {/* Sidebar */}
      <div className={`${isCollapsed ? 'w-20' : 'w-64'} bg-gray-800 border-r border-gray-700 transition-all duration-300 flex flex-col`}>
        <div className="p-4 border-b border-gray-700">
          <div className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-2'}`}>
            <div className="relative">
              <BarChart2 className="h-8 w-8 text-primary-500 animate-float" />
              <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 rounded-full border-2 border-gray-800"></div>
            </div>
            {!isCollapsed && <span className="text-xl font-bold text-white">TradePro</span>}
          </div>
        </div>

        <nav className="flex-1 py-6">
          <div className="px-4 space-y-2">
            {navigationItems.map((item) => {
              const isActive = currentPath === item.id;
              return (
                <Link
                  key={item.id}
                  to={item.id}
                  className={`flex items-center ${isCollapsed ? 'justify-center' : 'space-x-3'} px-4 py-3 rounded-lg transition-all duration-300 group hover:bg-gray-700 ${
                    isActive
                      ? 'bg-primary-500/20 text-primary-400'
                      : 'text-gray-300 hover:text-white'
                  }`}
                >
                  <div className="relative">
                    <item.icon className={`h-5 w-5 transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`} />
                    {isActive && <div className="absolute -right-1 -top-1 w-2 h-2 bg-primary-500 rounded-full"></div>}
                  </div>
                  {!isCollapsed && <span className="font-medium">{item.label}</span>}
                </Link>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-700">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
          >
            <ChevronLeft className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-gray-800 border-b border-gray-700">
          <div className="h-full px-6 flex items-center justify-between">
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:border-primary-500 transition-colors text-white placeholder-gray-400"
                />
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-300 hover:text-white transition-colors">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-primary-500 rounded-full"></span>
              </button>
              
              <div className="flex items-center space-x-3 pl-4 border-l border-gray-700">
                <div className="flex flex-col items-end">
                  <span className="text-sm font-medium text-white">John Doe</span>
                  <span className="text-xs text-gray-300">Pro Trader</span>
                </div>
                <div className="relative">
                  <User className="h-8 w-8 text-white bg-gray-700 rounded-lg p-1" />
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-gray-800"></div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-auto bg-gray-900">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;