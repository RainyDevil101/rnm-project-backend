import { getCategory, createCategory, getCategories, deleteCategory, updateCategory } from '../controllers/categories.controllers.js';

const categoriesRoutes = () => [
  {
    url: '/:id',
    method: 'GET',
    handler: getCategory
  },
  {
    url: '/',
    method: 'GET',
    handler: getCategories
  },
  {
    url: '/',
    method: 'POST',
    handler: createCategory
  },
  {
    url: '/:id',
    method: 'DELETE',
    handler: deleteCategory
  },
  {
    url: '/:id',
    method: 'PUT',
    handler: updateCategory
  },

];

export { categoriesRoutes };