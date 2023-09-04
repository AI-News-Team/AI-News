import { Route } from '..';
import { ListedArticle } from '../../../shared/table';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../../constant/code';
import { getClient } from '../../database/index';
import { getListParams } from '../../util/schema';
import { Error, Success } from '../router';
import { Article, Category } from '@shared';

export const list: Route = (req, res) => {
  const {
    filter,
    for: _for,
    sort,
    order,
  } = getListParams<Article>(req.query, ['name', 'publication_date', 'author'], ['name', 'publication_date', 'author']);
  const { category } = req.params;

  // check for valid category
  const getCategory = `
        select category
        from Category
        where category = $1
      `;
  getClient().query<Category>(getCategory, [category], (error, result) => {
    if (error)
      return Error(res, INTERNAL_SERVER_ERROR, {
        message: error.message || 'An unknown error occurred',
        type: 'DatabaseError',
      });

    if (!result.rows.length)
      return Error(res, BAD_REQUEST, {
        message: 'Invalid category',
        type: 'QueryError',
      });

    const projection = `
          select a.id, a.name, author, publication_date, retrieved_date, category, source_url, cover_url 
          from Article a
          join Article_Raw ar on a.id = ar.id
        `;
    let where = ` where category = $1`;

    const parameters = [category];

    if (filter && sort) {
      parameters.push(_for!);
      where += ` and ${filter} = $2 order by ${sort} ${order}`; // pre-validation of `sort` & `order` prevents SQL injection without parameterization
    } else if (filter) {
      parameters.push(_for!);
      where += ` and ${filter} like $2`;
    } else if (sort) {
      where += ` order by ${sort} ${order}`; // pre-validation of `sort` & `order` prevents SQL injection without parameterization
    }

    getClient().query<ListedArticle>(projection + where, parameters, (err, result) => {
      if (err)
        Error(res, INTERNAL_SERVER_ERROR, {
          message: err.message || 'An unknown error occurred',
          type: 'DatabaseError',
        });
      else Success(res, result.rows);
    });
  });
};
