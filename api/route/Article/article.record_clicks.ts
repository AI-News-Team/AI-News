import { Route } from '..';
import { Error, Success } from '../router';
import { Article, Category } from '@shared';
import { string } from 'pg-format';
import { getClient } from '../../database';

export const recordVisit: Route = (req, res) => {
  const { id } = req.body;
  const date = new Date()
  const today = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}}`
  
  const addRecord = async (id: Number) => {
    try {
      await getClient().query(`call record_visit($1, $2)`, [id, today]); // sends queries
      return true;
    } catch (error) {
      console.error(error);
      return false;
    }
  };

  addRecord(id).then(result => {
    if (result) {
      console.log('Visit recorded');
      Success(res, 'Visit recorded');
    }
  });
};
