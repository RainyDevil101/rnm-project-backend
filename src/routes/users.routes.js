import { getUser, createUser, getUsers, deleteUser, updateUser } from '../controllers/users.controllers.js';

const usersRoutes = () => [
  {
    url: '/:id',
    method: 'GET',
    handler: getUser
  },
  {
    url: '/',
    method: 'GET',
    handler: getUsers
  },
  {
    url: '/',
    method: 'POST',
    handler: createUser
  },
  {
    url: '/:id',
    method: 'DELETE',
    handler: deleteUser
  },
  {
    url: '/:id',
    method: 'PUT',
    handler: updateUser
  },

];

export { usersRoutes };