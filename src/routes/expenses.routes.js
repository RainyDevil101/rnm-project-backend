import { getExpense, createExpense, getExpenses, deleteExpense, updateExpense } from '../controllers/expenses.controllers.js';

export const expensesRoutes = () => [
  {
    url: '/:id',
    method: 'GET',
    handler: getExpense
  },
  {
    url: '/',
    method: 'GET',
    handler: getExpenses
  },
  {
    url: '/',
    method: 'POST',
    handler: createExpense
  },
  {
    url: '/:id',
    method: 'DELETE',
    handler: deleteExpense
  },
  {
    url: '/:id',
    method: 'PATCH',
    handler: updateExpense
  },

];