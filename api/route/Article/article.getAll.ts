import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';
import { Article } from 'ai-daily';

// This query works for now, but will no longer work if the title is also paraphrased
const query = `
  SELECT id, name, body
  FROM Article_Raw 
  WHERE id NOT IN (
    SELECT id FROM Article
  )
`;

export const getAll: Route = (req, res) => {
  getClient().query<Article>(query, (err, result) => {
    if (err) {
      Error(res, INTERNAL_SERVER_ERROR, {
        message: err.message || 'An unknown error occurred',
        type: 'DatabaseError',
      });
    } else {
      const data = result.rows ?? [];
      Success(res, data);
    }
  });
};
