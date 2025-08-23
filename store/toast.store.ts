import { create } from 'zustand';

export type ToastType = 'default' | 'success' | 'error';
export type ToastItem = {
  id: number;
  message: string;
  type: ToastType;
  duration: number; // ms
  iconName?: string; // 필요 시 아이콘 변경
};

type ToastState = {
  queue: ToastItem[];
  current: ToastItem | null;
  enqueue: (item: Omit<ToastItem, 'id'>) => void;
  shift: () => void;
  setCurrent: (t: ToastItem | null) => void;
};

let _id = 0;

export const useToastStore = create<ToastState>((set, get) => ({
  queue: [],
  current: null,
  enqueue: (item) =>
    set((s) => ({ queue: [...s.queue, { ...item, id: ++_id }] })),
  shift: () => {
    const [, ...rest] = get().queue;
    set({ queue: rest });
  },
  setCurrent: (t) => set({ current: t }),
}));

export const toast = {
  show: (
    message: string,
    opts?: { type?: ToastType; duration?: number; iconName?: string },
  ) => {
    const { enqueue } = useToastStore.getState();
    enqueue({
      message,
      type: opts?.type ?? 'default',
      duration: opts?.duration ?? 2000,
      iconName: opts?.iconName,
    });
  },
};
