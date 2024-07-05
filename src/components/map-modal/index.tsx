'use client';

import { MapProps } from '@/components/map';
import { MapModalContent } from '@/components/map-modal-content';
import { FC, MouseEventHandler, useCallback, useEffect, useState } from 'react';

export const MapModal: FC = () => {
  const [mapProps, setMapProps] = useState<MapProps | null>(null);

  useEffect(() => {
    const handleHashChange = () => {
      const hasHash = window.location.hash.match(/^#.+-.+/);
      if (hasHash) {
        const [year, focusId] = window.location.hash.slice(1).split('-');
        setMapProps({ year, focusId });
      } else {
        setMapProps(null);
      }
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

  return <MapModalContent onClose={handleModalClose} mapProps={mapProps} />;
};
