import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, ArrowRight, Play, BarChart2, Brain, Shield, 
  Target, Activity, Zap, Check, Users, Star, ChevronRight,
  TrendingUp, LineChart, PieChart, BarChart, Clock,
  Wallet, BarChart as ChartBar, Lightbulb, Rocket, Globe,
  MessageSquare, Award, TrendingDown, Zap as ZapIcon
} from 'lucide-react';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { BrokersSection } from '@/components/BrokersSection';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section id="hero" className="relative min-h-[90vh] flex items-center">
        {/* Background Effects */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/20 via-transparent to-transparent opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900"></div>
          <div className="absolute inset-0 grid-pattern opacity-[0.15]"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary-500/10 border border-primary-500/20 mb-8 animate-float">
                <Sparkles className="h-4 w-4 text-primary-400 mr-2" />
                <span className="text-sm text-white">Revolutionizing Trading Analytics</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-8 leading-tight text-white">
                Master the Markets with
                <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 via-primary-500 to-secondary-500">
                  Data-Driven Insights
                </span>
              </h1>

              <p className="text-xl text-white mb-12 lg:max-w-xl">
                Transform your trading with AI-powered analytics, real-time performance tracking, and professional-grade risk management tools.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-4 sm:space-y-0 sm:space-x-6">
                <Link 
                  to="/signup" 
                  className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 transform hover:-translate-y-0.5 shadow-lg shadow-primary-500/25 text-white"
                >
                  <span>Start Trading Smarter</span>
                  <ArrowRight className="h-5 w-5" />
                </Link>
                
                <button 
                  className="w-full sm:w-auto px-8 py-4 bg-gray-800/50 hover:bg-gray-700 border border-gray-700 rounded-xl font-medium transition-all duration-300 flex items-center justify-center space-x-2 text-white"
                >
                  <Play className="h-5 w-5" />
                  <span>Watch Demo</span>
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="mt-12 grid grid-cols-3 gap-6">
                <div className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-primary-400" />
                  <span className="text-sm text-gray-400">10K+ Traders</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  <span className="text-sm text-gray-400">4.9/5 Rating</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="text-sm text-gray-400">Bank-grade Security</span>
                </div>
              </div>
            </div>

            {/* Right Image */}
            <div className="relative hidden lg:block">
              <div className="relative w-full aspect-[4/3]">
                {/* Main Image */}
                <div className="absolute inset-0 glass-effect rounded-2xl overflow-hidden transform hover:scale-105 transition-all duration-500">
                  <img
                    src="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=1200&h=900"
                    alt="Trading Dashboard"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/20 to-transparent"></div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute -top-10 -right-10 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-10 -left-10 w-72 h-72 bg-secondary-500/10 rounded-full blur-3xl animate-pulse"></div>
              </div>

              {/* Floating Stats Cards */}
              <div className="absolute -right-8 top-1/4 transform translate-x-1/2 glass-effect p-4 rounded-xl animate-float">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-green-500/20 rounded-lg">
                    <TrendingUp className="h-5 w-5 text-green-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Win Rate</p>
                    <p className="text-lg font-bold text-white">85%</p>
                  </div>
                </div>
              </div>

              <div className="absolute -left-8 bottom-1/4 transform -translate-x-1/2 glass-effect p-4 rounded-xl animate-float delay-150">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary-500/20 rounded-lg">
                    <Activity className="h-5 w-5 text-primary-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Daily Profit</p>
                    <p className="text-lg font-bold text-white">$2.5K</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                Everything You Need to Trade Better
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Comprehensive tools and insights to enhance your trading performance
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: ChartBar,
                title: 'Advanced Analytics',
                description: 'Deep insights into your trading patterns with AI-powered analysis',
                color: 'text-primary-400',
                bg: 'bg-primary-500/10'
              },
              {
                icon: Brain,
                title: 'AI Trading Assistant',
                description: 'Get real-time suggestions and market insights from our AI',
                color: 'text-purple-400',
                bg: 'bg-purple-500/10'
              },
              {
                icon: Target,
                title: 'Risk Management',
                description: 'Professional-grade tools to protect and grow your capital',
                color: 'text-red-400',
                bg: 'bg-red-500/10'
              },
              {
                icon: Clock,
                title: 'Trade Journal',
                description: 'Track and analyze your trades with detailed insights',
                color: 'text-blue-400',
                bg: 'bg-blue-500/10'
              },
              {
                icon: Lightbulb,
                title: 'Strategy Builder',
                description: 'Create and backtest your trading strategies',
                color: 'text-yellow-400',
                bg: 'bg-yellow-500/10'
              },
              {
                icon: Rocket,
                title: 'Performance Goals',
                description: 'Set and track your trading goals with actionable metrics',
                color: 'text-green-400',
                bg: 'bg-green-500/10'
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="glass-effect p-6 rounded-xl hover:transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className={`w-12 h-12 ${feature.bg} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className={`h-6 w-6 ${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-2xl p-8 md:p-12">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  label: 'Active Traders',
                  value: '10,000+',
                  icon: Users,
                  color: 'text-primary-400'
                },
                {
                  label: 'Daily Volume',
                  value: '$25M+',
                  icon: BarChart,
                  color: 'text-green-400'
                },
                {
                  label: 'Success Rate',
                  value: '85%',
                  icon: Target,
                  color: 'text-yellow-400'
                },
                {
                  label: 'Markets',
                  value: '50+',
                  icon: Globe,
                  color: 'text-blue-400'
                }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <stat.icon className={`h-8 w-8 ${stat.color}`} />
                  </div>
                  <p className="text-3xl font-bold text-white mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-20 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-radial from-primary-500/10 via-transparent to-transparent opacity-30"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-800/50 to-gray-900"></div>
          <div className="absolute inset-0 grid-pattern opacity-[0.15]"></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                Simple, Transparent Pricing
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose the plan that best fits your trading needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Basic Plan */}
            <div className="glass-effect rounded-xl p-8 relative overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 bg-gray-900/40">
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 via-transparent to-transparent"></div>
              <div className="relative">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-gray-100 to-gray-300">Basic</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-white">$0</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  <p className="text-gray-400">Perfect for getting started with trading analytics</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Basic Analytics Dashboard',
                    'Manual Trade Tracking',
                    'Limited Market Data',
                    'Basic Risk Calculator',
                    'Community Support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="block w-full py-3 px-6 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg text-center font-medium transition-all duration-300 text-white hover:shadow-lg hover:shadow-gray-900/50"
                >
                  Get Started Free
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="glass-effect rounded-xl p-8 relative overflow-hidden transform scale-105 hover:-translate-y-2 transition-all duration-300 bg-primary-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/20 via-transparent to-transparent"></div>
              <div className="absolute top-0 right-0 bg-gradient-to-r from-primary-500 to-secondary-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg">
                Popular
              </div>
              <div className="relative">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">Pro</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-white">$49</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  <p className="text-gray-400">Advanced features for serious traders</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Everything in Basic',
                    'Advanced Analytics',
                    'Real-time Market Data',
                    'AI Trading Assistant',
                    'Strategy Builder',
                    'Priority Support'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="block w-full py-3 px-6 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 rounded-lg text-center font-medium transition-all duration-300 text-white hover:shadow-lg hover:shadow-primary-500/25"
                >
                  Start Pro Trial
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="glass-effect rounded-xl p-8 relative overflow-hidden hover:transform hover:-translate-y-2 transition-all duration-300 bg-secondary-900/20">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary-500/20 via-transparent to-transparent"></div>
              <div className="relative">
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-secondary-400 to-gray-100">Enterprise</h3>
                  <div className="flex items-baseline mb-4">
                    <span className="text-4xl font-bold text-white">$199</span>
                    <span className="text-gray-400 ml-2">/month</span>
                  </div>
                  <p className="text-gray-400">Custom solutions for trading teams</p>
                </div>
                <ul className="space-y-4 mb-8">
                  {[
                    'Everything in Pro',
                    'Custom Analytics',
                    'Team Collaboration',
                    'API Access',
                    'Custom Integrations',
                    'Dedicated Support',
                    'SLA Guarantee'
                  ].map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="h-5 w-5 text-green-400 mr-2" />
                      <span className="text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className="block w-full py-3 px-6 bg-gray-800/80 hover:bg-gray-700/80 rounded-lg text-center font-medium transition-all duration-300 text-white hover:shadow-lg hover:shadow-gray-900/50"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section id="stories" className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
                Success Stories
              </span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              See how traders are transforming their performance with TradePro
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Day Trader',
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200&h=200',
                quote: 'The AI insights have completely changed how I approach the markets. My win rate has increased by 35% since using TradePro.',
                stats: { label: 'Win Rate Increase', value: '+35%' },
                icon: TrendingUp,
                color: 'text-green-400'
              },
              {
                name: 'Michael Rodriguez',
                role: 'Swing Trader',
                image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200&h=200',
                quote: 'The risk management tools helped me minimize my losses and maximize profits. My portfolio has grown 150% in just 6 months.',
                stats: { label: 'Portfolio Growth', value: '150%' },
                icon: Award,
                color: 'text-yellow-400'
              },
              {
                name: 'Emma Thompson',
                role: 'Options Trader',
                image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200&h=200',
                quote: 'The strategy builder and backtesting features have been game-changing. I can now validate my strategies before risking real money.',
                stats: { label: 'Risk Reduction', value: '-40%' },
                icon: Shield,
                color: 'text-blue-400'
              }
            ].map((story, index) => (
              <div
                key={index}
                className="glass-effect rounded-xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300"
              >
                <div className="flex items-center space-x-4 mb-6">
                  <img
                    src={story.image}
                    alt={story.name}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="font-semibold text-white">{story.name}</h4>
                    <p className="text-gray-400">{story.role}</p>
                  </div>
                </div>
                <blockquote className="text-gray-300 mb-6">
                  "{story.quote}"
                </blockquote>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-400">{story.stats.label}</p>
                    <p className={`text-xl font-bold ${story.color}`}>
                      {story.stats.value}
                    </p>
                  </div>
                  <story.icon className={`h-8 w-8 ${story.color}`} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BrokersSection />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-effect rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              Ready to Transform Your Trading?
            </h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of successful traders who have elevated their performance with our platform.
            </p>
            <Link
              to="/signup"
              className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 rounded-xl font-medium text-white shadow-lg shadow-primary-500/25 transform hover:-translate-y-0.5 transition-all duration-300"
            >
              <span>Get Started Free</span>
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}