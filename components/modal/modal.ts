export type ModalResolve = 'confirm' | 'cancel' | 'backdrop' | 'dismiss';

export type ModalShowOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  onConfirm?: () => Promise<void>;
  cancelText?: string;
  onCancel?: () => Promise<void>;
  closeOnBackdropPress?: boolean;
  /** 커스텀 내용: AppModal의 children으로 들어감 */
  children?: React.ReactNode;
};

type Listener = (opts: (ModalShowOptions & { id: number }) | null) => void;

type QueueItem = {
  id: number;
  opts: ModalShowOptions;
  resolve: (v: ModalResolve) => void;
};

class ModalService {
  private listener: Listener | null = null;
  private seq = 0;
  private current: QueueItem | null = null;
  private queue: QueueItem[] = [];

  subscribe(fn: Listener) {
    this.listener = fn;
    return () => {
      if (this.listener === fn) this.listener = null;
    };
  }

  /** 어디서든 호출: modal.show({ title, description, confirmText }) */
  show(opts: ModalShowOptions) {
    const id = ++this.seq;
    return new Promise<ModalResolve>((resolve) => {
      const item: QueueItem = { id, opts, resolve };
      if (!this.current) {
        this.current = item;
        this.listener?.({ id, ...opts });
      } else {
        this.queue.push(item); // 간단 큐잉
      }
    });
  }

  /** Host에서 confirm/cancel/backdrop/dismiss 호출 */
  private close(reason: ModalResolve) {
    if (!this.current) return;
    const { resolve } = this.current;
    this.listener?.(null);
    this.current = null;
    resolve(reason);

    // 다음 아이템 있으면 표시
    const next = this.queue.shift();
    if (next) {
      this.current = next;
      this.listener?.({ id: next.id, ...next.opts });
    }
  }

  confirm() {
    this.close('confirm');
  }
  cancel() {
    this.close('cancel');
  }
  backdrop() {
    this.close('backdrop');
  }
  dismiss() {
    this.close('dismiss');
  }

  /** 편의 API */
  async alert(message: string, title = '알림', confirmText = '확인') {
    await this.show({ title, description: message, confirmText });
  }
  async confirmBox(
    options: Omit<ModalShowOptions, 'cancelText'> & { cancelText?: string },
  ) {
    const res = await this.show({ cancelText: '취소', ...options });
    return res === 'confirm';
  }
}

export const modal = new ModalService();
