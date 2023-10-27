import { Route } from '..';
import { Error, Success } from '../router';
import { Article, Category } from 'ai-daily';
import { string } from 'pg-format';
import { getClient } from '../../database';

export const create: Route = (req, res) => {
  const { article } = req.body as { article: Article };

  const insertUser = async (article: Article) => {
    try {
      await getClient().query(
        `INSERT INTO Article ("id", "name", "body")  
             VALUES ($1, $2, $3)`,
        [article.id, article.name, JSON.stringify(article.body)],
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
