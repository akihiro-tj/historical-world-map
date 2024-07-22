import { MapModal } from '@/components/map-modal';
import { ArticleRepositoryImpl } from '@/infrastructure/file-system/article-repository';

const articleRepository = new ArticleRepositoryImpl();

type ArticlePageProps = {
  params: {
    id: string;
  };
};

export default async function ArticlePage({ params }: ArticlePageProps) {
  const article = await articleRepository.getById(params.id);

  return (
    <div>
      <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      <MapModal />
    </div>
  );
}

export async function generateStaticParams() {
  const ids = await articleRepository.getAllIds();
  return ids.map((id) => ({ id }));
}
