import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';
import { Article } from '@shared';


// This query works for now, but will no longer work if the title is also paraphrased
const query = `
  SELECT name, author, body, fake_category category, source_url, cover_url, retrieved_date, publication_date
  from Article_Raw WHERE name NOT IN (SELECT name FROM Article)
`;

export const getAll: Route = (req, res) => {
  getClient().query<Article>(query, (err, result) => {
    if (err) {
      Error(res, INTERNAL_SERVER_ERROR, {
        message: err.message || 'An unknown error occurred',
        type: 'DatabaseError',
      });
    } else {
      const data = result.rows ?? null;
      Success(res, data);
    }
  });
};
