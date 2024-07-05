'use client';

import { MapProps } from '@/components/map';
import { MapModalContent } from '@/components/map-modal-content';
import {
  FC,
  MouseEventHandler,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

export const MapModal: FC = () => {
  const [focusedMapFeature, setFocusedMapFeature] =
    useState<MapProps['focusedMapFeature']>();
  const showModal = useMemo(() => !!focusedMapFeature, [focusedMapFeature]);

  useEffect(() => {
    const handleHashChange = () => {
      const hasHash = window.location.hash.match(/^#.+-.+/);
      if (hasHash) {
        const [year, id] = window.location.hash.slice(1).split('-');
        setFocusedMapFeature({ year, id });
      } else {
        setFocusedMapFeature(undefined);
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

  return (
    <MapModalContent
      isOpen={showModal}
      onClose={handleModalClose}
      focusedMapFeature={focusedMapFeature}
    />
  );
};
