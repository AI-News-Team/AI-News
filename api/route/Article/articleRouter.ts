import createRouter from '../router';
import { list } from './article.list';
import { create } from './article.create';
import { searchDomain } from './article.search.domain';
import { search } from './article.search';
import { get } from './article.get';
import { summary } from './article.summary';
import { getAll } from './article.getAll';
import { create_raw } from './article.create_raw';
import { record_clicks } from './article.record_clicks';


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
  create_raw: {
    method: 'post',
    handler: create_raw,
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
  getAll: {
    method: 'get',
    handler: getAll,
  },
  record_clicks: {
    method: 'post',
    pathParams: ['id'],
    handler: record_clicks,
  },
});

export default articleRouter;
