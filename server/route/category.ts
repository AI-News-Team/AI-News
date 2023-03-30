import { Category } from '@shared';
import { INTERNAL_SERVER_ERROR } from '../constant/code';
import { client } from '../database';
import createRouter, { Success } from './router';
import { Error } from './router';

export const categoryRouter = createRouter('category', {
  list: {
    method: 'get',
    handler: (req, res) => {
      client.query<Category>('select * from Category', [], (error, result) => {
        if (error)
          return Error(res, INTERNAL_SERVER_ERROR, {
            message: error.message || 'An unknown error occurred',
            type: 'DatabaseError',
          });

        Success(res, result.rows);
      });
    },
  },
});
