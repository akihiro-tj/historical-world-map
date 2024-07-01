import { Article } from '@/domain/entities/article';

export interface ArticleRepository {
  findById(id: string): Promise<Article>;
  findAllIds(): Promise<string[]>;
}
