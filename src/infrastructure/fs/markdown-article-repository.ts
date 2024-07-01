import { Article } from '@/domain/entities/article';
import { ArticleRepository } from '@/domain/repositories/article-repository';
import fs from 'fs-extra';
import matter from 'gray-matter';
import path from 'path';
import { remark } from 'remark';
import html from 'remark-html';
import { z } from 'zod';

const frontMatterSchema = z.object({
  title: z.string(),
});

export class MarkdownArticleRepository implements ArticleRepository {
  private articlesDir = path.join(process.cwd(), 'articles');

  async findById(id: string): Promise<Article> {
    const fullPath = path.join(this.articlesDir, `${id}.md`);
    const fileContent = fs.readFileSync(fullPath, 'utf-8');
    const { data, content } = matter(fileContent);

    const frontMatter = this.validateFrontMatter(data);

    const processedContent = await remark().use(html).process(content);
    const contentHtml = processedContent.toString();

    return { id, title: frontMatter.title, contentHtml };
  }

  async findAllIds(): Promise<string[]> {
    const fileNames = fs.readdirSync(this.articlesDir);
    return fileNames.map((fileName) => path.parse(fileName).name);
  }

  private validateFrontMatter(data: any) {
    const result = frontMatterSchema.safeParse(data);
    if (!result.success) {
      throw new Error(`Invalid frontmatter: ${result.error.message}`);
    }
    return result.data;
  }
}
