import { MapFeature } from '@/domain/entities/map-feature';

export interface MapFeatureRepository {
  getByYearAndCountryId(year: string, countryId: string): Promise<MapFeature>;
}
