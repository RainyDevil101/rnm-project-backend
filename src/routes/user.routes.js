import { getUser, createUser } from '../controllers/users.controllers.js';

const getUserRoutes = () => {
  const routes = [
    {
      url: '/',
      method: 'GET',
      handler: getUser
    },
    {
      url: '/',
      method: 'POST',
      handler: createUser
    },

  ];
  return { routes };
};

export default getUserRoutes;