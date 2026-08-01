import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type ToastType = 'success' | 'error' | 'info' | 'warning';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
}

interface UIState {
  sidebarOpen: boolean;
  toasts: Toast[];
  globalLoading: boolean;
  balancesVisible: boolean;

  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;

  addToast: (message: string, type?: ToastType) => void;
  removeToast: (id: string) => void;

  setGlobalLoading: (loading: boolean) => void;

  toggleBalancesVisible: () => void;
  setBalancesVisible: (visible: boolean) => void;
}

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      toasts: [],
      globalLoading: false,
      balancesVisible: true,

      toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),

      addToast: (message, type = 'info') =>
        set((state) => ({
          toasts: [
            ...state.toasts,
            { id: crypto.randomUUID(), message, type },
          ],
        })),

      removeToast: (id) =>
        set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),

      setGlobalLoading: (loading) => set({ globalLoading: loading }),

      toggleBalancesVisible: () => set((state) => ({ balancesVisible: !state.balancesVisible })),
      setBalancesVisible: (visible) => set({ balancesVisible: visible }),
    }),
    {
      name: 'getidone-ui-storage',
      partialize: (state) => ({ balancesVisible: state.balancesVisible, sidebarOpen: state.sidebarOpen }),
    }
  )
);
