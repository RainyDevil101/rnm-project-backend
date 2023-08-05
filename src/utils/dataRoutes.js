import { billsRoutes, categoriesRoutes, usersRoutes } from '../routes/index.js';

export const routesData = [
  {
    prefix: '/api/users',
    routes: usersRoutes(),
  },
  {
    prefix: '/api/categories',
    routes: categoriesRoutes(),
  },
  {
    prefix: '/api/bills',
    routes: billsRoutes(),
  },
];