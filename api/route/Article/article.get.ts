import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';
import { Article } from '@shared';

const query = `
  select ar.id, a.name, ar.author, a.body, ar.category, ar.source_url, ar.cover_url, ar.retrieved_date, ar.publication_date
  from Article_Raw ar
  join Article a on ar.id = a.id
  where ar.id = $1
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
