import { client } from '../database';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '../constant/code';
import createRouter, { Error, Success } from './router';
import format from 'pg-format';
import { AssertKeySchema, getListParams } from '../util/schema';
import { Article, ArticleSummary, Categories } from '../../shared';

export const insertionKeySchema = [
  'name',
  'author',
  'publication_date',
  'body',
  'category',
  'source_url',
  'cover_url',
] as const;

export const articleRouter = createRouter('article', {
  list: {
    method: 'get',
    pathParams: ['category'],
    queryParams: ['filter', 'for', 'sort', 'order'],
    handler: (req, res) => {
      const {
        filter,
        for: _for,
        sort,
        order,
      } = getListParams<Article>(req.query, ['name', 'publication_date', 'author'], ['name', 'publication_date', 'author']);
      const { category } = req.params;

      if (!Categories.includes(category as any))
        return Error(res, BAD_REQUEST, {
          message: 'Invalid category',
          type: 'QueryError',
        });

      const projection = 'select id, name, author, publication_date, category, source_url, cover_url from Article';
      let where = ` where category = $1`;

      const parameters = [category];

      if (filter && sort) {
        parameters.push(_for!);
        where += ` and ${filter} = $2 order by ${sort} ${order}`; // pre-validation of `sort` & `order` prevents SQL injection without parameterization
      } else if (filter) {
        parameters.push(_for!);
        where += ` and ${filter} like $2`;
      } else if (sort) {
        where += ` order by ${sort} ${order}`; // pre-validation of `sort` & `order` prevents SQL injection without parameterization
      }

      client.query<Article>(projection + where, parameters, (err, result) => {
        if (err)
          Error(res, INTERNAL_SERVER_ERROR, {
            message: err.message || 'An unknown error occurred',
            type: 'DatabaseError',
          });
        else Success(res, result.rows);
      });
    },
  },
  get: {
    method: 'get',
    pathParams: ['id'],
    handler: (req, res) => {
      const { id } = req.params;

      if (!id) {
        return Error(res, BAD_REQUEST, {
          message: 'Document id is required',
          type: 'QueryError',
        });
      }

      client.query<Article>('select * from Article where id = $1', [id], (err, result) => {
        if (err) {
          Error(res, INTERNAL_SERVER_ERROR, {
            message: err.message || 'An unknown error occurred',
            type: 'DatabaseError',
          });
        } else {
          const data = result.rows ?? null;
          Success(res, data[0]);
        }
      });
    },
  },
  create: {
    method: 'post',
    handler: (req, res) => {
      const { articles } = req.body as { articles: Article[] };

      if (!articles || !Array.isArray(articles))
        return Error(res, BAD_REQUEST, { message: 'Body must be an array', type: 'QueryError' });

      const formattedArticles = articles.map(a => {
        AssertKeySchema(Object.keys(a), insertionKeySchema);
        const tuple = Object.values({ ...a, body: JSON.stringify(a.body) });
        return [...tuple];
      });

      const insertion = format(
        'insert into Article (name, author, publication_date, body, category, source_url, cover_url) values %L',
        formattedArticles,
      );

      client.query<Article>(insertion, [], (err, results) => {
        if (err)
          Error(res, INTERNAL_SERVER_ERROR, {
            message: err.message || 'An unknown error occurred',
            type: 'DatabaseError',
          });
        else {
          const { rowCount } = results;
          Success(res, {
            message: `inserted ${rowCount} article${rowCount !== 1 ? 's' : ''}`,
          });
        }
      });
    },
  },
  summary: {
    method: 'get',
    handler: (_, res) => {
      client.query<Article>(
        "select * from Article where category = 'news' order by publication_date limit 3",
        (err, result) => {
          if (err)
            return Error(res, INTERNAL_SERVER_ERROR, {
              message: err.message || 'An unknown error occurred',
              type: 'DatabaseError',
            });

          const summary: ArticleSummary = {
            top_stories: [],
            news: result.rows,
          };

          return Success(res, summary);
        },
      );
    },
  },
});
