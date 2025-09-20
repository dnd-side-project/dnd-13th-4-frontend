import AppModal from '@/components/modal/AppModal';
import React, { useEffect, useState } from 'react';
import { modal, ModalShowOptions } from './modal';

type Active = (ModalShowOptions & { id: number }) | null;

export default function GlobalModalHost() {
  const [active, setActive] = useState<Active>(null);

  useEffect(() => modal.subscribe(setActive), []);

  return (
    <AppModal
      visible={!!active}
      title={active?.title}
      description={active?.description}
      confirmText={active?.confirmText ?? '확인'}
      cancelText={active?.cancelText}
      closeOnBackdropPress={active?.closeOnBackdropPress ?? true}
      onConfirm={() => modal.confirm()}
      onCancel={() => modal.cancel()}
    >
      {active?.children}
    </AppModal>
  );
}
