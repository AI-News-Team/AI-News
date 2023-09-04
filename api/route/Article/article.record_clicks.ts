import { Route } from '..';
import { getClient } from '../../database';
import { Error, Success } from '../router';


export const record_clicks: Route = (req, res) => {
  const { id } = req.body as { id: Number };

  const insertUser = async (id: Number) => {
    try {
      await getClient().query(
        `INSERT INTO Article ("id", "name", "body")  
             VALUES ($1, $2, $3)`,
      ); // sends queries
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  insertUser(id).then(result => {
    if (result) {
      console.log('Visit recorded');
      Success(res,  'Visit recorded' );
    }
  });
};
