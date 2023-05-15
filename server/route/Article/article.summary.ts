import { ArticleSummary } from '../../../shared/table';
import { INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';
import { Article } from '@shared';

const ARTICLES_PER_CATEGORY = 4;
const groupCategoriesInThrees = `
  select id, name, author, publication_date, fake_category category, source_url, cover_url
  from (
    select 
      *,
      row_number() over (partition by fake_category order by publication_date) index_in_category 
    from Article 
  ) categorized_articles 
  where index_in_category < ${ARTICLES_PER_CATEGORY}
`;

const baseSummary: ArticleSummary = {};

// reduce articles to categories
const categorizeArticles = (articles: Article[]) =>
  articles.reduce(
    (summaryAcc, article) => ({
      ...summaryAcc,
      [article.category]: [...(summaryAcc[article.category] ?? []), article],
    }),
    baseSummary,
  );

export const summary: Route = (_, res) => {
  // todo: remove fake category and use real category
  getClient().query<Article>(groupCategoriesInThrees, (err, result) => {
    if (err)
      return Error(res, INTERNAL_SERVER_ERROR, {
        message: err.message || 'An unknown error occurred',
        type: 'DatabaseError',
      });

    const summary = categorizeArticles(result.rows);
    return Success(res, summary);
  });
};
