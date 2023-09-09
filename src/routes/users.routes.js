import { getUser, createUser, getUsers, deleteUser, updateUser } from '../controllers/users.controllers.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdminRole } from '../middlewares/validate-role.js';

export const usersRoutes = () => [
  {
    url: '/:id',
    method: 'GET',
    handler: getUser,
    preHandler: [
      validateJWT,
      validateAdminRole,
    ]
  },
  {
    url: '/',
    method: 'GET',
    handler: getUsers,
    preHandler: [
      validateJWT,
      validateAdminRole
    ]
  },
  {
    url: '/',
    method: 'POST',
    handler: createUser,
    preHandler: [
      validateJWT,
      validateAdminRole
    ]
  },
  {
    url: '/:id',
    method: 'DELETE',
    handler: deleteUser,
    preHandler: [
      validateJWT,
      validateAdminRole,
    ]
  },
  {
    url: '/:id',
    method: 'PATCH',
    handler: updateUser,
    preHandler: [
      validateJWT,
      validateAdminRole
    ]
  },

];