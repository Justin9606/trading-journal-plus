'use client'

import { useState } from 'react'
import {
  TrendingUp, TrendingDown, BarChart2, Calendar,
  Filter, Download, Brain, Shield, Wallet, Globe, Users, Activity,
  RefreshCw
} from 'lucide-react'
import { StatCard } from '@/components/common/StatCard'
import { AreaChartComponent } from '@/components/charts/AreaChartComponent'
import { BarChartComponent } from '@/components/charts/BarChartComponent'
import { AiChatAssistant } from '@/components/ai/AiChatAssistant'
import { TradingViewWidget } from '@/components/tradingview/TradingViewWidget'
import TradingCalendar from '@/components/TradingCalendar'

// Rest of the Analytics component code remains the same

export default TradingCalendar