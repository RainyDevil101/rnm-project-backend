import { login, refreshToken, validateToken } from '../controllers/index.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

const commonMiddleware = [validateJWT];

export const authRoutes = () => [
  {
    url: '/login',
    method: 'POST',
    handler: login,
  },
  {
    url: '/refresh-token',
    method: 'GET',
    handler: refreshToken,
    preHandler: commonMiddleware
  },
  {
    url: '/validate-token',
    method: 'GET',
    handler: validateToken,
    preHandler: commonMiddleware
  }
];