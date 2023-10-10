import { getCategory, createCategory, getCategories, deleteCategory, updateCategory } from '../controllers/categories.controllers.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdminOrUserRole } from '../middlewares/validate-role.js';
import { createRoute } from '../utils/createRoute.js';

const commonMiddleware = [validateJWT, validateAdminOrUserRole];

export const categoriesRoutes = () => [
  createRoute('/:id', 'GET', getCategory, commonMiddleware),
  createRoute('/', 'GET', getCategories, commonMiddleware),
  createRoute('/', 'POST', createCategory, commonMiddleware),
  createRoute('/:id', 'DELETE', deleteCategory, commonMiddleware),
  createRoute('/:id', 'PATCH', updateCategory, commonMiddleware),
];