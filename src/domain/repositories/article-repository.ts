import { Article } from '@/domain/entities/article';

export interface ArticleRepository {
  getById(id: string): Promise<Article>;
  getAllIds(): Promise<string[]>;
}
