import { getUser, createUser, getUsers, deleteUser, updateUser } from '../controllers/users.controllers.js';

const middleware = (req, reply, next) => {
  console.log('Middleware asdasd');
  next();
};

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
    preHandler: [middleware]
  },
  {
    url: '/',
    method: 'POST',
    handler: createUser,
  },
  {
    url: '/:id',
    method: 'DELETE',
    handler: deleteUser
  },
  {
    url: '/:id',
    method: 'PATCH',
    handler: updateUser
  },

];