import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';
import { Article } from '@shared';

const query = `
  select id, name, author, body, fake_category category, source_url, cover_url, retrieved_date, publication_date
  from Article 
  where id = $1
`;

export const get: Route = (req, res) => {
  const { id } = req.params;
  if (!id) {
    return Error(res, BAD_REQUEST, {
      message: 'Document id is required',
      type: 'QueryError',
    });
  }

  getClient().query<Article>(query, [id], (err, result) => {
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
};
