import { Route } from '..';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST, CONFLICT, Code } from '../../constant/code';
import { getClient } from '../../database';
import { Error, Success } from '../router';
import { Article, Category } from '@shared';
import format from 'pg-format';
import { AssertKeySchema } from '../../util/schema';

const insertionKeySchema = ['name', 'author', 'publication_date', 'body', 'category', 'source_url', 'cover_url'] as const;

const insertionTemplate = `
  insert into Article_Raw (name, author, publication_date, body, category, source_url, cover_url) 
  values %L
`;

export const create_raw: Route = (req, res) => {
  const { articles } = req.body as { articles: Article[] };

  if (!articles || !Array.isArray(articles))
    return Error(res, BAD_REQUEST, { message: 'Body must be an array', type: 'QueryError' });

  getClient().query<Category>('select category from Category', [], (error, result) => {
    if (error)
      return Error(res, INTERNAL_SERVER_ERROR, {
        message: error.message || 'An unknown error occurred',
        type: 'DatabaseError',
      });

    if (!result.rows.length)
      return Error(res, BAD_REQUEST, {
        message: 'Invalid category',
        type: 'QueryError',
      });

    const formattedArticles = articles.map(a => {
      AssertKeySchema(Object.keys(a), insertionKeySchema);
      const tuple = Object.values({ ...a, body: JSON.stringify(a.body) });
      return [...tuple];
    });

    const insertion = format(insertionTemplate, formattedArticles);
    getClient().query<Article>(insertion, [], (err, results) => {
      if (err) {
        console.error(err);
        return Error(res, (err as any).code === '23505' ? CONFLICT : INTERNAL_SERVER_ERROR, {
          message: err.message || 'An unknown error occurred',
          type: 'DatabaseError',
        });
      }

      const { rowCount } = results;
      const message = `inserted ${rowCount} article${rowCount !== 1 ? 's' : ''}`;
      Success(res, { message });
    });
  });
};
