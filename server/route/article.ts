import { client } from '../database';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '../constant/code';
import createRouter, { Error, Success } from './router';
import { Article } from '@shared';

export const articleRouter = createRouter('article', {
	list: {
		method: 'get',
		handler: (_, res) => {
			client.query<Article>('select * from Article', (err, result) => {
				if (err)
					Error(res, INTERNAL_SERVER_ERROR, {
						message: err.message || 'An unknown error occurred',
						type: 'QueryError',
					});
				else Success(res, result.rows);
			});
		},
	},
	create: {
		method: 'post',
		handler: (req, res) => {
			const { name, body } = req.body;

			if (!name) {
				Error(res, BAD_REQUEST, {
					message: 'Document name is required',
					type: 'QueryError',
				});
				return;
			}

			if (!body) {
				Error(res, BAD_REQUEST, {
					message: 'Document body is required',
					type: 'QueryError',
				});
				return;
			}

			// todo: guard against injection?
			client.query<Article>('insert into Article (name, body) values ($1, $2)', [name, body], (err, result) => {
				if (err) {
					Error(res, INTERNAL_SERVER_ERROR, {
						message: err.message || 'An unknown error occurred',
						type: 'QueryError',
					});
				} else {
					console.log(result);
					Success(res, result);
				}
			});
		},
	},
});
