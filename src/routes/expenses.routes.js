import { getExpense, createExpense, getExpenses, deleteExpense, updateExpense } from '../controllers/expenses.controllers.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdminOrUserRole } from '../middlewares/validate-role.js';
import { createRoute } from '../utils/createRoute.js';

const commonMiddleware = [validateJWT, validateAdminOrUserRole];

export const expensesRoutes = () => [
  createRoute('/:id', 'GET', getExpense, commonMiddleware),
  createRoute('/', 'GET', getExpenses, commonMiddleware),
  createRoute('/', 'POST', createExpense, commonMiddleware),
  createRoute('/:id', 'DELETE', deleteExpense, commonMiddleware),
  createRoute('/:id', 'PATCH', updateExpense, commonMiddleware),
];