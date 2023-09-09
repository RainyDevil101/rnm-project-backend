import { getRole, createRole, getRoles, deleteRole, updateRole } from '../controllers/roles.controllers.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdminRole } from '../middlewares/validate-role.js';

const createRoute = (url, method, handler, preHandler) => ({
  url,
  method,
  handler,
  preHandler: [validateJWT, validateAdminRole, ...(preHandler || [])],
});

export const rolesRoutes = () => [
  createRoute('/:id', 'GET', getRole),
  createRoute('/', 'GET', getRoles),
  createRoute('/', 'POST', createRole),
  createRoute('/:id', 'DELETE', deleteRole),
  createRoute('/:id', 'PATCH', updateRole),
];