import { login } from '../controllers/index.js';

export const authRoutes = () => [
  {
    url: '/login',
    method: 'POST',
    handler: login
  }
];