import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface AnalyticsMetrics {
  totalTrades: number;
  winRate: number;
  profitFactor: number;
  averageWin: number;
  averageLoss: number;
  largestWin: number;
  largestLoss: number;
  maxDrawdown: number;
  sharpeRatio: number;
  dailyPnL: { date: string; pnl: number }[];
  monthlyPnL: { month: string; pnl: number }[];
}

interface AnalyticsStore {
  metrics: AnalyticsMetrics | null;
  loading: boolean;
  error: string | null;
  fetchMetrics: () => Promise<void>;
  subscribeToMetrics: () => void;
  unsubscribeFromMetrics: () => void;
}

export const useAnalyticsStore = create<AnalyticsStore>((set) => ({
  metrics: null,
  loading: false,
  error: null,

  fetchMetrics: async () => {
    try {
      set({ loading: true, error: null });
      
      // Fetch all required metrics in parallel
      const [
        { data: trades, error: tradesError },
        { data: dailyPnL, error: dailyError },
        { data: monthlyPnL, error: monthlyError },
      ] = await Promise.all([
        supabase.from('trades').select('*'),
        supabase.rpc('get_daily_pnl'),
        supabase.rpc('get_monthly_pnl'),
      ]);

      if (tradesError || dailyError || monthlyError) {
        throw tradesError || dailyError || monthlyError;
      }

      // Calculate metrics
      const winningTrades = trades.filter((t) => t.pnl > 0);
      const losingTrades = trades.filter((t) => t.pnl < 0);

      const metrics: AnalyticsMetrics = {
        totalTrades: trades.length,
        winRate: (winningTrades.length / trades.length) * 100,
        profitFactor:
          Math.abs(
            winningTrades.reduce((sum, t) => sum + t.pnl, 0) /
              losingTrades.reduce((sum, t) => sum + t.pnl, 0)
          ),
        averageWin:
          winningTrades.reduce((sum, t) => sum + t.pnl, 0) / winningTrades.length,
        averageLoss:
          losingTrades.reduce((sum, t) => sum + t.pnl, 0) / losingTrades.length,
        largestWin: Math.max(...winningTrades.map((t) => t.pnl)),
        largestLoss: Math.min(...losingTrades.map((t) => t.pnl)),
        maxDrawdown: calculateMaxDrawdown(dailyPnL),
        sharpeRatio: calculateSharpeRatio(dailyPnL),
        dailyPnL,
        monthlyPnL,
      };

      set({ metrics, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  subscribeToMetrics: () => {
    const subscription = supabase
      .channel('metrics')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trades' },
        () => {
          // Refetch metrics when trades change
          get().fetchMetrics();
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  },

  unsubscribeFromMetrics: () => {
    supabase.removeChannel('metrics');
  },
}));

// Helper functions
function calculateMaxDrawdown(dailyPnL: { date: string; pnl: number }[]): number {
  let maxDrawdown = 0;
  let peak = -Infinity;
  let equity = 0;

  dailyPnL.forEach(({ pnl }) => {
    equity += pnl;
    peak = Math.max(peak, equity);
    maxDrawdown = Math.min(maxDrawdown, equity - peak);
  });

  return maxDrawdown;
}

function calculateSharpeRatio(dailyPnL: { date: string; pnl: number }[]): number {
  const returns = dailyPnL.map(({ pnl }) => pnl);
  const avgReturn = returns.reduce((a, b) => a + b, 0) / returns.length;
  const stdDev = Math.sqrt(
    returns.reduce((sum, r) => sum + Math.pow(r - avgReturn, 2), 0) /
      returns.length
  );
  const riskFreeRate = 0.02 / 252; // Assuming 2% annual risk-free rate

  return (avgReturn - riskFreeRate) / stdDev * Math.sqrt(252);
}