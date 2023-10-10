import { getRole, createRole, getRoles, deleteRole, updateRole } from '../controllers/roles.controllers.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdminRole } from '../middlewares/validate-role.js';
import { createRoute } from '../utils/createRoute.js';

const commonMiddleware = [validateJWT, validateAdminRole];

export const rolesRoutes = () => [
  createRoute('/:id', 'GET', getRole, commonMiddleware),
  createRoute('/', 'GET', getRoles, commonMiddleware),
  createRoute('/', 'POST', createRole, commonMiddleware),
  createRoute('/:id', 'DELETE', deleteRole, commonMiddleware),
  createRoute('/:id', 'PATCH', updateRole, commonMiddleware),
];