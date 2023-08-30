// protectedRoutes.js
const { Router } = require('express');
const { verifyAppToken } = require('../utils/jwtUtils');
const db = require('../services/db'); // Your PostgreSQL database connection

const protectedRouter = Router();

protectedRouter.get('/protected-route', async (req, res) => {
  const appToken = req.headers.authorization?.split(' ')[1];

  if (!appToken || !verifyAppToken(appToken)) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // Query the database to check if the token's permissions allow access to the route
  const tokenQueryResult = await db.query('SELECT * FROM Token WHERE key = $1', [appToken]);
  const token = tokenQueryResult.rows[0];

  if (!token) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // Query the database to check if the token has permission for the route
  const permissionQueryResult = await db.query('SELECT * FROM Permission WHERE token_id = $1 AND route = $2', [
    token.id,
    '/protected-route',
  ]);
  const hasPermission = permissionQueryResult.rows.length > 0;

  if (!hasPermission) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  res.json({ message: 'Access granted to protected route' });
});

module.exports = protectedRouter;
