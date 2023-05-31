import { Route } from '..';
import { Error, Success } from '../router';
import { Article, Category } from '@shared';
import { string } from 'pg-format';
import { Client } from 'pg';
import { DATABASE_HOST, DATABASE_NAME, DATABASE_PASSWORD, DATABASE_PORT, DATABASE_USER } from '../../environment';

export const create: Route = (req, res) => {
  const { article } = req.body as { article: Article };

  const client = new Client({
    host: DATABASE_HOST,
    user: DATABASE_USER,
    database: DATABASE_NAME,
    password: DATABASE_PASSWORD,
    port: DATABASE_PORT,
  });

  const insertUser = async (article: Article) => {
    try {
        await client.connect();           // gets connection
        await client.query(
            `INSERT INTO Article ("name", "author", "publication_date", "body", "category", "source_url", "cover_url", "fake_category")  
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, 
             [article.name, 
              article.author, 
              article.publication_date,
              JSON.stringify(article.body),
              article.category,
              article.source_url,
              article.cover_url, 
              article.category]); // sends queries
        return true;
    } catch (error) {
        console.error(error);
        return false;
    } finally {
        await client.end();  // closes connection
    }
  };

  insertUser(article).then(result => {
    if (result) {
      console.log('Article inserted');
      Success(res, { 'Article inserted': string });
    }
  });
};
