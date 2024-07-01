import { MarkdownArticleRepository } from '@/infrastructure/fs/markdown-article-repository';

const articleRepository = new MarkdownArticleRepository();

type ArticlePageProps = {
  params: {
    id: string;
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await articleRepository.findById(params.id);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
    </div>
  );
}

export async function generateStaticParams() {
  const articleRepository = new MarkdownArticleRepository();
  const ids = await articleRepository.findAllIds();
  return ids.map((id) => ({ id }));
}
