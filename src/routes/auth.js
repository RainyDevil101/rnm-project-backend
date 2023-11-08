import { login, refreshToken } from '../controllers/index.js';
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
    method: 'POST',
    handler: refreshToken,
    preHandler: commonMiddleware
  }
];