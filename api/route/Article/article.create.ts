import { Route } from '..';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../../constant/code';
import { getClient } from '../../database';
import { Error, Success } from '../router';
import { Article, Category } from '@shared';
import format from 'pg-format';
import { AssertKeySchema } from '../../util/schema';

const insertionKeySchema = ['name', 'author', 'publication_date', 'body', 'category', 'source_url', 'cover_url'] as const;

const insertionTemplate = `
  insert into Article (name, author, publication_date, body, category, source_url, cover_url, fake_category) 
  values %L
`;

export const create: Route = (req, res) => {
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

    // todo: remove this fake category generation
    const getFakeCategory = () => {
      const randomIndex = Math.floor(Math.random() * result.rows.length);
      const fakeCategory = result.rows[randomIndex].category;
      return fakeCategory;
    };

    const formattedArticles = articles.map(a => {
      AssertKeySchema(Object.keys(a), insertionKeySchema);
      const tuple = Object.values({ ...a, body: JSON.stringify(a.body) });
      return [...tuple, getFakeCategory()]; // todo: remove fake category
    });

    const insertion = format(insertionTemplate, formattedArticles);

    // todo: remove fake category`
    getClient().query<Article>(insertion, [], (err, results) => {
      if (err)
        return Error(res, INTERNAL_SERVER_ERROR, {
          message: err.message || 'An unknown error occurred',
          type: 'DatabaseError',
        });

      const { rowCount } = results;
      const message = `inserted ${rowCount} article${rowCount !== 1 ? 's' : ''}`;
      Success(res, { message });
    });
  });
};
