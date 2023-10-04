import { Router } from 'express';
import { isTokenValid } from '../util/jwt';
import { getClient } from '../database';

const protectedRouter = Router();

protectedRouter.use(async (req, res, next) => {
  // Checks if a token is provided and if it starts with 'Bearer'
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader || !authorizationHeader.startsWith('Bearer')) {
    return res.status(401).json({ error: 'Token not provided' });
  }

  // Extracts only token
  const appToken = authorizationHeader.split(' ')[1];

  if (!appToken || !isTokenValid(appToken, process.env.JWT_SECRET as string)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Checks if the token exists in the database
  const tokenQueryResult = await getClient().query('SELECT * FROM Tokens WHERE token = $1', [appToken]);
  const token = tokenQueryResult.rows[0];

  if (!token) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  const requestedRoute = req.url;

  // Query the database to check if the token has permission for the requested route
  const permissionQueryResult = await getClient().query(
    'SELECT * FROM Permissions p ' +
    'INNER JOIN Routes r ON p.route_id = r.route_id ' +
    'WHERE p.token_id = $1 AND r.route = $2',
    [token.token_id, requestedRoute]
  );

  const hasPermission = permissionQueryResult.rows.length > 0;

  if (!hasPermission) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  next();
});

export default protectedRouter;
