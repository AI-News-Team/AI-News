import { Article } from '@shared';
import { INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';

export const searchDomain: Route = (_, res) => {
  const query = `
        select id, name
        from Article
      `;

  getClient().query<Article>(query, [], (err, result) => {
    if (err)
      return Error(res, INTERNAL_SERVER_ERROR, {
        message: err.message || 'An unknown error occurred',
        type: 'DatabaseError',
      });

    const data = result.rows ?? null;
    return Success(res, data);
  });
};
