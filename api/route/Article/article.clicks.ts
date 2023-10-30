import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import { Route, Error, Success } from '../router';
import { Article } from 'ai-daily';

const query = `
  select * from Article_Visits
`;

export const clicks: Route = (req, res) => {

  getClient().query<Article>(query, [], (err, result) => {
    if (err) {
      Error(res, INTERNAL_SERVER_ERROR, {
        message: err.message || 'An unknown error occurred',
        type: 'DatabaseError',
      });
    } else {
      Success(res, result.rows);
    }
  });
};
