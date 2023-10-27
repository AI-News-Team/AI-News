import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';
import { Article } from 'ai-daily';

// This query works for now, but will no longer work if the title is also paraphrased
const query = `
  SELECT id, name from
  (select ar.id, ar.name, image_gen FROM Article_Raw ar join Article a on ar.id=a.id)
  WHERE image_gen = false
`;

export const getAllImageGen: Route = (req, res) => {
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
