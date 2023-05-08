import axios, { AxiosError } from 'axios';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from '../../constant/code';
import { SEARCH_ENGINE_HOST, SEARCH_ENGINE_PORT } from '../../environment';
import { Route, Error, Success } from '../router';
import { STD_PREFIX } from '../util';

export const search: Route = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query)
      return Error(res, BAD_REQUEST, {
        message: 'A `query` parameter  is required to fulfil the request',
        type: 'QueryError',
      });

    const url = `${STD_PREFIX}${SEARCH_ENGINE_HOST}:${SEARCH_ENGINE_PORT}/search/${query}`;
    const { data } = await axios.get(url);

    return Success(res, data);
  } catch (err) {
    if (err instanceof AxiosError)
      return Error(res, (err.response?.status as any) ?? INTERNAL_SERVER_ERROR, {
        message: err.message || 'An unknown error occurred',
        type: 'ServerError',
      });

    console.error(err);
    return Error(res, INTERNAL_SERVER_ERROR, {
      message: 'An unknown error occurred',
      type: 'ServerError',
    });
  }
};
