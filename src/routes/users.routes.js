import { getUser, createUser, getUsers, deleteUser, updateUser } from '../controllers/users.controllers.js';
import { validateJWT } from '../middlewares/validate-jwt.js';

export const usersRoutes = () => [
  {
    url: '/:id',
    method: 'GET',
    handler: getUser
  },
  {
    url: '/',
    method: 'GET',
    handler: getUsers,
    preHandler: [validateJWT]
  },
  {
    url: '/',
    method: 'POST',
    handler: createUser,
  },
  {
    url: '/:id',
    method: 'DELETE',
    handler: deleteUser,
    preHandler: [validateJWT]
  },
  {
    url: '/:id',
    method: 'PATCH',
    handler: updateUser
  },

];