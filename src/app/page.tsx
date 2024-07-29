import { ArticleRepositoryImpl } from '@/infrastructure/file-system/article-repository';

const articleRepository = new ArticleRepositoryImpl();

export default async function Home() {
  const articles = await articleRepository.getAll();

  return (
    <main>
      <div className="px-4 py-8 mx-auto prose prose-invert lg:prose-lg">
        <ul>
          {articles.map(({ id, title }) => (
            <li key={id}>
              <a href={`/article/${id}`}>{title}</a>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}
