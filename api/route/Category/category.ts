import { Category } from 'ai-daily';
import { INTERNAL_SERVER_ERROR } from '../../constant/code';
import { getClient } from '../../database';
import createRouter, { Success } from '../router';
import { Error } from '../router';

const categoryRouter = createRouter('category', {
  list: {
    method: 'get',
    handler: (_, res) => {
      getClient().query<Category>('select * from Category', [], (error, result) => {
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

export default categoryRouter;
