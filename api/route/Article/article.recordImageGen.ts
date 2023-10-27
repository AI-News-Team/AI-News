import { Route } from '..';
import { Error, Success } from '../router';
import { Article, Category } from 'ai-daily';
import { string } from 'pg-format';
import { getClient } from '../../database';

export const recordImageGen: Route = (req, res) => {
    const { id } = req.params;

  const recordImage = async (article_id: any) => {
    try {
      await getClient().query(
        `UPDATE article
         SET image_gen=true
         WHERE id=$1`,[article_id]
      ); // sends queries
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  recordImage(id).then(result => {
    if (result) {
      console.log('Image recorded');
      Success(res, { 'Image recorded': string });
    }
  });
};
