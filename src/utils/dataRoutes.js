import { expensesRoutes, categoriesRoutes, usersRoutes, authRoutes, rolesRoutes } from '../routes/index.js';

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
    routes: expensesRoutes(),
  },
  {
    prefix: '/api/auth',
    routes: authRoutes(),
  },
  {
    prefix: '/api/roles',
    routes: rolesRoutes(),
  },
];