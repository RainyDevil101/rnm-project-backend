import { login } from '../controllers/auth.controllers.js';

export const authRoutes = () => [
  {
    url: '/login',
    method: 'POST',
    handler: login
  }
];