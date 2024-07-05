'use client';

import { ClipExtension } from '@deck.gl/extensions';
import { TileLayer } from '@deck.gl/geo-layers';
import { GeoJsonLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import { PMTilesSource } from '@loaders.gl/pmtiles';
import { FC, useMemo } from 'react';

const INITIAL_VIEW_STATE = {
  longitude: -3.7492,
  latitude: 40.4637,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

const ZOOM_SETTINGS = {
  minZoom: 0,
  maxZoom: 5,
};

const basemapTileSource = new PMTilesSource({
  // TODO: Replace url
  url: 'http://localhost:2999/ne_110m_land.pmtiles',
});

type BBox = {
  west: number;
  south: number;
  east: number;
  north: number;
};

type GeoJsonFeature = {
  id: string;
};

type FocusedMapFeature = {
  id?: string;
  year: string;
};

export interface MapProps {
  focusedMapFeature?: FocusedMapFeature;
}

export const Map: FC<MapProps> = ({ focusedMapFeature }) => {
  const year = focusedMapFeature?.year;
  const focusedId = focusedMapFeature?.id;

  const basemapLayer = useMemo(() => {
    return new TileLayer({
      id: 'basemap-layer',
      ...ZOOM_SETTINGS,
      getTileData: basemapTileSource.getTileData,
      renderSubLayers: ({ data, tile }) => {
        const bbox = tile.bbox as BBox;
        return new GeoJsonLayer({
          id: `basemap-layer--${tile.id}`,
          data,
          extensions: [new ClipExtension()],
          clipBounds: [bbox.west, bbox.south, bbox.east, bbox.north],
          lineWidthScale: 1,
          lineWidthMinPixels: 2,
          getLineColor: [200, 200, 200],
          filled: false,
        });
      },
    });
  }, []);

  const featureTileSource = useMemo(() => {
    if (!year) return null;
    return new PMTilesSource({
      // TODO: Replace url
      url: `http://localhost:2999/${year}.pmtiles`,
    });
  }, [year]);

  const featureLayer = useMemo(() => {
    if (!featureTileSource) return null;
    return new TileLayer({
      id: 'feature-layer',
      ...ZOOM_SETTINGS,
      getTileData: featureTileSource.getTileData,
      renderSubLayers: ({ data, tile }) => {
        const bbox = tile.bbox as BBox;
        return new GeoJsonLayer<GeoJsonFeature, { clipBounds: number[] }>({
          id: `feature-layer--${tile.id}`,
          data,
          extensions: [new ClipExtension()],
          clipBounds: [bbox.west, bbox.south, bbox.east, bbox.north],
          lineWidthScale: 1,
          lineWidthMinPixels: 2,
          getLineColor: (d) =>
            d.properties.id === focusedId
              ? [200, 100, 100, 200]
              : [200, 100, 100, 50],
          getFillColor: (d) =>
            d.properties.id === focusedId
              ? [200, 100, 100, 100]
              : [200, 100, 100, 25],
        });
      },
    });
  }, [featureTileSource, focusedId]);

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={[basemapLayer, featureLayer]}
    />
  );
};
