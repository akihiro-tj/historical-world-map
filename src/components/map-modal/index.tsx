'use client';

import { MapProps } from '@/components/map';
import { useLocationHash } from '@/components/map-modal/use-location-hash';
import { MapModalContent } from '@/components/map-modal-content';
import { MapFeatureRepositoryImpl } from '@/infrastructure/http/map-feature-repository';
import { FC, MouseEventHandler, useCallback, useMemo } from 'react';
import useSWR from 'swr';

const mapFeatureRepository = new MapFeatureRepositoryImpl();

export const MapModal: FC = () => {
  const { hash } = useLocationHash();
  const { data } = useSWR(hash, fetcher);
  const showModal = useMemo(() => !!data, [data]);

  const handleModalClose: MouseEventHandler<HTMLElement> = useCallback(() => {
    window.location.hash = '';
  }, []);

  return (
    <MapModalContent
      isOpen={showModal}
      onClose={handleModalClose}
      mapProps={data}
    />
  );
};

async function fetcher(
  hash: string | undefined
): Promise<MapProps | undefined> {
  if (!hash) return;
  const [year, focusedFeatureId] = hash.split('-');
  const focusedFeature = await mapFeatureRepository.getByYearAndFeatureId(
    year,
    focusedFeatureId
  );
  const initialViewState = {
    longitude: focusedFeature.longitude,
    latitude: focusedFeature.latitude,
    zoom: focusedFeature.zoom,
  };
  return {
    tileSourceURL: `/data/${year}.pmtiles`,
    focusedFeatureId,
    initialViewState,
  };
}
