import { create } from 'zustand';
import { supabase } from '../lib/supabase';

interface Notification {
  id: string;
  type: 'trade' | 'alert' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
}

interface NotificationStore {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  subscribeToNotifications: () => void;
  unsubscribeFromNotifications: () => void;
}

export const useNotificationStore = create<NotificationStore>((set, get) => ({
  notifications: [],
  unreadCount: 0,
  loading: false,
  error: null,

  fetchNotifications: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('notifications')
        .select('*')
        .order('createdAt', { ascending: false });

      if (error) throw error;
      
      set({
        notifications: data,
        unreadCount: data.filter((n) => !n.read).length,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  markAsRead: async (id) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        notifications: state.notifications.map((n) =>
          n.id === id ? { ...n, read: true } : n
        ),
        unreadCount: state.unreadCount - 1,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  markAllAsRead: async () => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('notifications')
        .update({ read: true })
        .eq('read', false);

      if (error) throw error;

      set((state) => ({
        notifications: state.notifications.map((n) => ({ ...n, read: true })),
        unreadCount: 0,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  deleteNotification: async (id) => {
    try {
      set({ loading: true, error: null });
      const { error } = await supabase
        .from('notifications')
        .delete()
        .eq('id', id);

      if (error) throw error;

      set((state) => ({
        notifications: state.notifications.filter((n) => n.id !== id),
        unreadCount: state.notifications.find((n) => n.id === id)?.read
          ? state.unreadCount
          : state.unreadCount - 1,
        loading: false,
      }));
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  subscribeToNotifications: () => {
    const subscription = supabase
      .channel('notifications')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notifications' },
        (payload) => {
          const { eventType, new: newRecord, old: oldRecord } = payload;
          const { notifications, unreadCount } = get();

          switch (eventType) {
            case 'INSERT':
              set({
                notifications: [newRecord, ...notifications],
                unreadCount: unreadCount + 1,
              });
              break;
            case 'UPDATE':
              set({
                notifications: notifications.map((n) =>
                  n.id === oldRecord.id ? { ...n, ...newRecord } : n
                ),
                unreadCount: newRecord.read
                  ? unreadCount - 1
                  : oldRecord.read
                  ? unreadCount + 1
                  : unreadCount,
              });
              break;
            case 'DELETE':
              set({
                notifications: notifications.filter((n) => n.id !== oldRecord.id),
                unreadCount: oldRecord.read ? unreadCount : unreadCount - 1,
              });
              break;
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  },

  unsubscribeFromNotifications: () => {
    supabase.removeChannel('notifications');
  },
}));