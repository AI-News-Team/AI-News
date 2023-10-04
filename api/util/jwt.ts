import jwt from 'jsonwebtoken';

/**
 * Checks if a JWT is valid.
 * @param token 
 * @param jwtSecret
 * @returns
*/

export function isTokenValid(token: string, jwtSecret: string): boolean {
  try {
    jwt.verify(token, jwtSecret);
    return true;
  } catch (error) {
    return false;
  }
}