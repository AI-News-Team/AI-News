import { Router, Request, Response, NextFunction } from 'express';
import { getClient } from '../database';
import { Error, Success } from '../route';
import { FORBIDDEN, UNAUTHORIZED } from '../constant/code';

export default async function authRoute(req: Request, res: Response, next: NextFunction) {
  const requestedRoute = req.url;

  // Check if tokens exist in the database
  const tokensQuery = {
    text: 'SELECT * FROM Tokens',
  };
  const Tokens = await getClient().query(tokensQuery);

  if (!Tokens.rows.length) {
    return Error(res, UNAUTHORIZED, { message: 'Tokens do not exist in DB. You must set the tokens before accessing the routes', type: 'TokenError' });
  }

  // Query the database to check if route is in the database
  const permissionsQuery = {
    text: 'SELECT * FROM Permissions p INNER JOIN Routes r ON p.route_id = r.route_id WHERE r.route_name = $1',
    values: [requestedRoute],
  };
  const Permissions = await getClient().query(permissionsQuery);

  if (!Permissions.rows.length) {
    return next();
  }

  // Checks if a token is provided
  const appToken = req.headers.authorization;
  if (!appToken) {
    return Error(res, UNAUTHORIZED, { message: 'Token not provided', type: 'TokenError' });
  }

  // Checks if the token exists in the database
  const tokenQuery = {
    text: 'SELECT * FROM Tokens WHERE token = $1',
    values: [appToken],
  };
  const tokenQueryResult = await getClient().query(tokenQuery);
  const token = tokenQueryResult.rows[0];

  if (!token) {
    return Error(res, UNAUTHORIZED, { message: 'Token is not valid', type: 'TokenError' });
  }

  // Query the database to check if the token has permission for the requested route
  const permissionQuery = {
    text: 'SELECT * FROM Permissions p INNER JOIN Routes r ON p.route_id = r.route_id WHERE p.token_id = $1 AND r.route_name = $2',
    values: [token.token_id, requestedRoute],
  };
  const permissionQueryResult = await getClient().query(permissionQuery);

  const hasPermission = permissionQueryResult.rows.length > 0;

  if (!hasPermission) {
    return Error(res, FORBIDDEN, { message: 'Insufficient permissions', type: 'TokenError' });
  }

  next();
}