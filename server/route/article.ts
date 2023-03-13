import { client } from '../database';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR, OK } from '../constant/code';
import createRouter, { Error, Success } from './router';
import format from 'pg-format';
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
	get: {
		method: 'get',
		handler: (req, res) => {
			const { id } = req.body;

			if (!id) {
				return Error(res, BAD_REQUEST, {
					message: 'Document id is required',
					type: 'QueryError',
				});
			}

			client.query<Article>('select * from Article where id = $1', [id], (err, result) => {
				if (err) {
					Error(res, INTERNAL_SERVER_ERROR, {
						message: err.message || 'An unknown error occurred',
						type: 'QueryError',
					});
				} else {
					const data = result.rows.at(0) ?? null;
					Success(res, data);
				}
			});
		},
	},
	create: {
		method: 'post',
		handler: (req, res) => {
			const { articles } = req.body;

			if (!articles || !Array.isArray(articles)) return Error(res, BAD_REQUEST, { message: 'Body must be an array', type: 'QueryError' });

			const insertion = format('insert Article (name, author, category, body, source_url, cover_url, publication_date) %L', [articles])
			client.query<Article>(insertion, [], (err, result) => {
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
