import createRouter from '../router';
import { list } from './article.list';
import { create } from './article.create';
import { searchDomain } from './article.search.domain';
import { search } from './article.search';
import { get } from './article.get';
import { summary } from './article.summary';

const articleRouter = createRouter('article', {
  list: {
    method: 'get',
    pathParams: ['category'],
    queryParams: ['filter', 'for', 'sort', 'order'],
    handler: list,
  },
  get: {
    method: 'get',
    pathParams: ['id'],
    handler: get,
  },
  create: {
    method: 'post',
    handler: create,
  },
  'search.domain': {
    method: 'get',
    handler: searchDomain,
  },
  search: {
    method: 'get',
    queryParams: ['query'],
    handler: search,
  },
  summary: {
    method: 'get',
    handler: summary,
  },
});

export default articleRouter;
