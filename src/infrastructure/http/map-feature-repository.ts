import { MapFeature } from '@/domain/entities/map-feature';
import { MapFeatureRepository } from '@/domain/repositories/map-feature-repository';
import { tsv } from 'd3-fetch';
import { z } from 'zod';

const mapFeatureSchema = z.object({
  id: z.string(),
  longitude: z.string(),
  latitude: z.string(),
  zoom: z.string(),
});
const mapFeatureListSchema = z.array(mapFeatureSchema);

export class MapFeatureRepositoryImpl implements MapFeatureRepository {
  async getByYearAndCountryId(
    year: string,
    countryId: string
  ): Promise<MapFeature> {
    const rawData = await tsv(`/data/${year}.tsv`);
    const data = this.validateMapFeatureList(rawData);
    const mapFeatureList: MapFeature[] = data.map((d) => ({
      id: d.id,
      longitude: +d.longitude,
      latitude: +d.latitude,
      zoom: +d.zoom,
    }));
    const mapFeature = mapFeatureList.find(
      (feature) => feature.id === countryId
    );
    if (!mapFeature) {
      throw new Error(`Map feature not found: ${countryId}`);
    }
    return mapFeature;
  }

  private validateMapFeatureList(data: any) {
    const result = mapFeatureListSchema.safeParse(data);
    if (!result.success) {
      throw new Error(`Invalid map feature: ${result.error.message}`);
    }
    return result.data;
  }
}
