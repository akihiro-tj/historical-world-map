'use client';

import { Tooltip, TooltipProps } from '@/components/tooltip';
import { MapViewState } from '@deck.gl/core';
import { ClipExtension } from '@deck.gl/extensions';
import { TileLayer } from '@deck.gl/geo-layers';
import { GeoJsonLayer } from '@deck.gl/layers';
import DeckGL from '@deck.gl/react';
import { PMTilesSource } from '@loaders.gl/pmtiles';
import { FC, useMemo, useState } from 'react';
import { z } from 'zod';

const INITIAL_VIEW_STATE: MapViewState = {
  longitude: 139.6917,
  latitude: 35.6895,
  zoom: 2,
};

const ZOOM_SETTINGS = {
  minZoom: 0,
  maxZoom: 5,
};

const geoJsonFeatureSchema = z.object({
  NAME: z.string().optional(),
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

export interface MapProps {
  tileSourceURL: string;
  focusedFeatureId?: string;
  initialViewState?: MapViewState;
}

export const Map: FC<MapProps> = ({
  tileSourceURL,
  focusedFeatureId,
  initialViewState = INITIAL_VIEW_STATE,
}) => {
  const [tooltipProps, setTooltipProps] = useState<TooltipProps | null>(null);

  const tileSource = useMemo(() => {
    return new PMTilesSource({ url: tileSourceURL });
  }, [tileSourceURL]);

  const tileLayer = useMemo(() => {
    return new TileLayer({
      id: 'feature-layer',
      ...ZOOM_SETTINGS,
      getTileData: tileSource.getTileData,
      pickable: true,
      onHover: (info) => {
        if (info.object) {
          const properties = validateGeoJsonFeature(info.object.properties);
          const tooltipProps = properties.NAME
            ? {
                x: info.x,
                y: info.y,
                content: properties.NAME,
              }
            : null;
          setTooltipProps(tooltipProps);
        } else {
          setTooltipProps(null);
        }
      },
      onDrag: () => {
        setTooltipProps(null);
      },
      renderSubLayers: ({ data, tile }) => {
        const bbox = tile.bbox as BBox;
        return new GeoJsonLayer<GeoJsonFeature, { clipBounds: number[] }>({
          id: `feature-layer--${tile.id}`,
          data,
          pickable: true,
          extensions: [new ClipExtension()],
          clipBounds: [bbox.west, bbox.south, bbox.east, bbox.north],
          lineWidthScale: 1,
          lineWidthMinPixels: 2,
          getLineColor: (d) => {
            const properties = validateGeoJsonFeature(d.properties);
            return properties.NAME?.toLowerCase() === focusedFeatureId ||
              !focusedFeatureId
              ? [34, 211, 238, 255]
              : [100, 116, 139, 150];
          },
          getFillColor: (d) => {
            const properties = validateGeoJsonFeature(d.properties);
            return properties.NAME?.toLowerCase() === focusedFeatureId ||
              !focusedFeatureId
              ? [34, 211, 238, 150]
              : [100, 116, 139, 100];
          },
        });
      },
    });
  }, [tileSource, focusedFeatureId]);

  return (
    <>
      <DeckGL
        initialViewState={initialViewState}
        controller
        layers={[tileLayer]}
      />
      {tooltipProps && <Tooltip {...tooltipProps} />}
    </>
  );
};

function validateGeoJsonFeature(data: any) {
  const result = geoJsonFeatureSchema.safeParse(data);
  if (!result.success) {
    throw new Error(`Invalid GeoJSON feature: ${result.error.message}`);
  }
  return result.data;
}
