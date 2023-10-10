import { categorySchema, roleSchema, userSchema } from '../schemas/index.js';
import { Category, Role, User } from '../models/index.js';
import { authRoutes, createElementRouter, createUserRouter } from '../routes/index.js';

export const routesData = [
  {
    prefix: '/api/users',
    routes: createUserRouter({ model: User, schema: userSchema }),
  },
  {
    prefix: '/api/categories',
    routes: createElementRouter({ model: Category, schema: categorySchema }),
  },
  // {
  //   prefix: '/api/bills',
  //   routes: createElementRouter({  }),
  // },
  {
    prefix: '/api/auth',
    routes: authRoutes(),
  },
  {
    prefix: '/api/roles',
    routes: createElementRouter({ model: Role, schema: roleSchema }),
  },
];