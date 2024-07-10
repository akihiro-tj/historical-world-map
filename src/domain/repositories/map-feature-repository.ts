import { MapFeature } from '@/domain/entities/map-feature';

export interface MapFeatureRepository {
  getByYearAndFeatureId(year: string, featureId: string): Promise<MapFeature>;
}
