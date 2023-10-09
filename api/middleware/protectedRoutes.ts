import { Router, Request, Response, NextFunction } from 'express';
import { getClient } from '../database';
import { Error, Success } from '../route';
import { FORBIDDEN, UNAUTHORIZED } from '../constant/code';

export default async function authRoute(req: Request, res: Response, next: NextFunction) {
  const requestedRoute = req.url;

  // Query the database to check if route is in the
  const Permissions = await getClient().query(
    'SELECT * FROM Permissions p ' + 'INNER JOIN Routes r ON p.route_id = r.route_id where r.route_name = $1',
    [requestedRoute],
  );

  if (!Permissions.rows.length) {
    return next();
  }

  // Checks if a token is provided and if it starts with 'Bearer'
  const appToken = req.headers.authorization;
  if (!appToken) {
    return Error(res, UNAUTHORIZED, { message: 'Token not provided', type: 'TokenError' });
  }

  // Checks if the token exists in the database
  const tokenQueryResult = await getClient().query('SELECT * FROM Tokens WHERE token = $1', [appToken]);
  const token = tokenQueryResult.rows[0];

  if (!token) {
    return Error(res, UNAUTHORIZED, { message: 'Token not provided', type: 'TokenError' });
  }

  // Query the database to check if the token has permission for the requested route
  const permissionQueryResult = await getClient().query(
    'SELECT * FROM Permissions p ' +
      'INNER JOIN Routes r ON p.route_id = r.route_id ' +
      'WHERE p.token_id = $1 AND r.route_name = $2',
    [token.token_id, requestedRoute],
  );

  const hasPermission = permissionQueryResult.rows.length > 0;

  if (!hasPermission) {
    return Error(res, FORBIDDEN, { message: 'Insufficient permissions', type: 'TokenError' });
  }

  next();
}
