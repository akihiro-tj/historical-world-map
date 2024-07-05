'use client';

import { MapModalContent } from '@/components/map-modal-content';
import { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';

export const MapModal: FC = () => {
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const showModal = window.location.hash.startsWith('#');
      setShowModal(showModal);
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  const handleModalClose: MouseEventHandler<HTMLElement> = useCallback(() => {
    window.location.hash = '';
  }, []);

  return <MapModalContent isOpen={showModal} onClose={handleModalClose} />;
};
