import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Trade {
  id: string;
  symbol: string;
  type: 'long' | 'short';
  entry: number;
  exit: number | null;
  quantity: number;
  status: 'open' | 'closed';
  pnl: number | null;
  notes: string;
  tags: string[];
  screenshots: string[];
  createdAt: string;
  updatedAt: string;
}

interface TradeStore {
  trades: Trade[];
  loading: boolean;
  error: string | null;
  addTrade: (trade: Omit<Trade, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateTrade: (id: string, updates: Partial<Trade>) => Promise<void>;
  deleteTrade: (id: string) => Promise<void>;
  fetchTrades: () => Promise<void>;
  subscribeToTrades: () => void;
  unsubscribeFromTrades: () => void;
}

export const useTradeStore = create<TradeStore>((set, get) => ({
  trades: [],
  loading: false,
  error: null,

  addTrade: async (trade) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('trades')
        .insert([trade])
        .select()
        .single();

      if (error) throw error;
      set((state) => ({ trades: [...state.trades, data], loading: false }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  updateTrade: async (id, updates) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('trades')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      set((state) => ({
        trades: state.trades.map((t) => (t.id === id ? { ...t, ...data } : t)),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteTrade: async (id) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase.from('trades').delete().eq('id', id);

      if (error) throw error;
      set((state) => ({
        trades: state.trades.filter((t) => t.id !== id),
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchTrades: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('trades')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      set({ trades: data, loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  subscribeToTrades: () => {
    const subscription = supabase
      .channel('trades')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'trades' },
        (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;
          const { trades } = get();

          switch (eventType) {
            case 'INSERT':
              set({ trades: [newRecord, ...trades] });
              break;
            case 'UPDATE':
              set({
                trades: trades.map((t) =>
                  t.id === oldRecord.id ? { ...t, ...newRecord } : t
                ),
              });
              break;
            case 'DELETE':
              set({ trades: trades.filter((t) => t.id !== oldRecord.id) });
              break;
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  },

  unsubscribeFromTrades: () => {
    supabase.removeChannel('trades');
  },
}));