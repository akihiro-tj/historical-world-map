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
    <main>
      <article className="px-4 py-8 mx-auto prose lg:prose-lg">
        <h1>{article.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
      </article>
      <MapModal />
    </main>
  );
}

export async function generateStaticParams() {
  const ids = await articleRepository.getAllIds();
  return ids.map((id) => ({ id }));
}
