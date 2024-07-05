'use client';

import { ClipExtension } from '@deck.gl/extensions';
import { TileLayer } from '@deck.gl/geo-layers';
import { GeoJsonLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import { PMTilesSource } from '@loaders.gl/pmtiles';
import { FC } from 'react';

const INITIAL_VIEW_STATE = {
  longitude: -3.7492,
  latitude: 40.4637,
  zoom: 3,
  pitch: 0,
  bearing: 0,
};

const tileSource = new PMTilesSource({
  // TODO: Replace url
  url: 'http://localhost:2999/ne_110m_land.pmtiles',
});

type BBox = {
  west: number;
  south: number;
  east: number;
  north: number;
};

export const Map: FC = () => {
  const tileLayer = new TileLayer({
    getTileData: tileSource.getTileData,
    minZoom: 0,
    maxZoom: 5,
    renderSubLayers: ({ id, data, tile }) => {
      const bbox = tile.bbox as BBox;
      return new GeoJsonLayer({
        id: `geojson-layer-${id}`,
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

  return (
    <DeckGL
      initialViewState={INITIAL_VIEW_STATE}
      controller
      layers={[tileLayer]}
    />
  );
};
