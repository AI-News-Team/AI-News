import { Route } from '..';
import { INTERNAL_SERVER_ERROR, BAD_REQUEST } from '../../constant/code';
import { getClient } from '../../database';
import { Error, Success } from '../router';
import { Article, Category } from '@shared';
import format from 'pg-format';
import { AssertKeySchema } from '../../util/schema';
import { Client } from 'pg';

const insertionKeySchema = ['name', 'author', 'publication_date', 'body', 'category', 'source_url', 'cover_url'] as const;

const insertionTemplate = `
  insert into Article (name, author, publication_date, body, category, source_url, cover_url, fake_category) 
  values %L
`;

export const create: Route = (req, res) => {
  const { article } = req.body as { article: Article };

  console.log(article)

  const client = new Client({
    host: '0.0.0.0',
    user: 'greg',
    database: 'news_outlet_dev',
    password: 'greg',
    port: 5432,
  });

  const insertUser = async (article: Article) => {
    try {
        await client.connect();           // gets connection
        await client.query(
            `INSERT INTO Article ("name", "author", "publication_date", "body", "category", "source_url", "cover_url", "fake_category")  
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)`, [article.name, article.author, article.publication_date ,JSON.stringify(article.body) ,article.category ,article.source_url ,article.cover_url, article.category]); // sends queries
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
    }
});














  // // if (!articles || !Array.isArray(articles))
  // //   return Error(res, BAD_REQUEST, { message: 'Body must be an array', type: 'QueryError' });



  // getClient().query<Category>('select category from Category', [], (error, result) => {
  //   if (error)
  //     return Error(res, INTERNAL_SERVER_ERROR, {
  //       message: error.message || 'An unknown error occurred',
  //       type: 'DatabaseError',
  //     });

  //   if (!result.rows.length)
  //     return Error(res, BAD_REQUEST, {
  //       message: 'Invalid category',
  //       type: 'QueryError',
  //     });

  //   // todo: remove this fake category generation
  //   const getFakeCategory = () => {
  //     const randomIndex = Math.floor(Math.random() * result.rows.length);
  //     const fakeCategory = result.rows[randomIndex].category;
  //     return fakeCategory;
  //   };

  //   const formattedArticles = (article: Article) => {
  //     AssertKeySchema(Object.keys(article), insertionKeySchema);
  //     const tuple = Object.values({ ...article, body: JSON.stringify(article.body) });
  //     return [...tuple, getFakeCategory()]; // todo: remove fake category
  //   };

  //   const insertion = format(insertionTemplate, formattedArticles);

  //   // todo: remove fake category`
  //   getClient().query<Article>(insertion, [], (err, results) => {
  //     if (err)
  //       return Error(res, INTERNAL_SERVER_ERROR, {
  //         message: err.message || 'An unknown error occurred',
  //         type: 'DatabaseError',
  //       });

  //     const { rowCount } = results;
  //     const message = `inserted ${rowCount} article${rowCount !== 1 ? 's' : ''}`;
  //     Success(res, { message });
  //   });
  // });
};
