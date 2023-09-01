import { getRole, createRole, getRoles, deleteRole, updateRole } from '../controllers/roles.controllers.js';

export const rolesRoutes = () => [
  {
    url: '/:id',
    method: 'GET',
    handler: getRole
  },
  {
    url: '/',
    method: 'GET',
    handler: getRoles
  },
  {
    url: '/',
    method: 'POST',
    handler: createRole
  },
  {
    url: '/:id',
    method: 'DELETE',
    handler: deleteRole
  },
  {
    url: '/:id',
    method: 'PATCH',
    handler: updateRole
  },

];