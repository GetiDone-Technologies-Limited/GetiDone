import { create } from 'zustand';

export interface AppNotification {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  type: 'system' | 'payment' | 'project';
}

interface NotificationState {
  notifications: AppNotification[];
  markAsRead: (id: string) => void;
  markAsUnread: (id: string) => void;
  markAllAsRead: () => void;
}

const mockNotifications: AppNotification[] = [
  {
    id: 'notif_1',
    title: 'Payment Released',
    description: 'TechNova Inc. has released $500.00 from escrow.',
    time: '2 hours ago',
    read: false,
    type: 'payment',
  },
  {
    id: 'notif_2',
    title: 'Milestone Approved',
    description: 'Your design milestone was approved.',
    time: '5 hours ago',
    read: false,
    type: 'project',
  },
  {
    id: 'notif_3',
    title: 'Welcome to GetiDone!',
    description: 'Your account has been successfully verified.',
    time: '1 day ago',
    read: true,
    type: 'system',
  },
];

export const useNotificationStore = create<NotificationState>((set) => ({
  notifications: mockNotifications,

  markAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  markAsUnread: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: false } : n
      ),
    })),

  markAllAsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),
}));
