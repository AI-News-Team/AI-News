import { Route } from '..';
import { Error, Success } from '../router';
import { Article, Category } from '@shared';
import { string } from 'pg-format';
import { getClient } from '../../database';

export const create: Route = (req, res) => {
  const { article } = req.body as { article: Article };

  const insertUser = async (article: Article) => {
    try {
      await getClient().query(
        `INSERT INTO Article ("name", "author", "publication_date", "body", "category", "source_url", "cover_url", "fake_category")  
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`,
        [
          article.name,
          article.author,
          article.publication_date,
          JSON.stringify(article.body),
          article.category,
          article.source_url,
          article.cover_url,
          article.category,
        ],
      ); // sends queries
      return true;
    } catch (error) {
      console.error(error);
      return false;
    } 
  };

  insertUser(article).then(result => {
    if (result) {
      console.log('Article inserted');
      Success(res, { 'Article inserted': string });
    }
  });
};
