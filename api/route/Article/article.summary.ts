import { ArticleSummary } from '../../../shared/table';
import { INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';
import { Article } from '@shared';

const ARTICLES_PER_CATEGORY = 3;

// query shows three items from each category ranking from most clicks to least, 
// if no clicks registered for articles, orders by publication date
const groupCategoriesInThrees = `
  select id, name, cover_url, category from (
    select id, name, cover_url, category, row_number() over (partition by category order by clicks desc nulls last, 
    publication_date desc nulls last) as clickRank from (
      select ar.id, a.name, ar.category, ar.cover_url, ar.publication_date,
      sum(av.clicks) clicks
      from Article_Raw ar
      join Article a on ar.id = a.id
      left join Article_Visits av on av.id = a.id
      group by ar.id, a.name) categorized_articles 
    ) ranked_articles
  where clickRank <= ${ARTICLES_PER_CATEGORY}
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
