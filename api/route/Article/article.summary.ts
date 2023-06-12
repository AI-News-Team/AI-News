import { ArticleSummary } from '../../../shared/table';
import { INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';
import { Article } from '@shared';

const ARTICLES_PER_CATEGORY = 4;
const groupCategoriesInThrees = `
  select id, name, author, publication_date, category, source_url, cover_url
  from (
    select ar.id, ar.name, ar.author, a.body, ar.category, ar.source_url, ar.cover_url, ar.retrieved_date, ar.publication_date,
      row_number() over (order by publication_date) index_in_category 
      from Article_Raw ar
      join Article a on ar.id = a.id
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
