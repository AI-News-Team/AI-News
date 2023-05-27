import { Route } from '..';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../../constant/code';
import { getClient } from '../../database';
import { Error, Success } from '../router';
import { Article, Category } from '@shared';
import format, { string } from 'pg-format';
import { AssertKeySchema } from '../../util/schema';
import { Client } from 'pg';

const insertionKeySchema = ['name', 'author', 'publication_date', 'body', 'category', 'source_url', 'cover_url'] as const;

const insertionTemplate = `
  insert into Article (name, author, publication_date, body, category, source_url, cover_url, fake_category) 
  values %L
`;

export const create: Route = (req, res) => {
  const { article } = req.body as { article: Article };

  const client = new Client({
    host: '0.0.0.0',
    user: 'greg',
    database: 'news_outlet_dev',
    password: 'p@ssw0rd',
    port: 5432,
  });

  const insertUser = async (article: Article) => {
    console.log(article)
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
        await client.end();               // closes connection
    }
  };

  insertUser(article).then(result => {
    if (result) {
      console.log('Article inserted');
      Success(res, { 'Article inserted': string });
    }
  });
};
