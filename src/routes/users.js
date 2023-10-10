import { UserController } from '../controllers/index.js';
import { validateJWT } from '../middlewares/validate-jwt.js';
import { validateAdminRole } from '../middlewares/validate-role.js';
import { createRoute } from '../utils/createRoute.js';

const commonMiddleware = [validateJWT, validateAdminRole];

export const createUserRouter = ({ model, schema }) => {

  const userController = new UserController({ model, schema });

  const usersRoutes = [
    createRoute({ url: '/:id', method: 'GET', handler: userController.getUser, commonMiddleware }),
    createRoute({ url: '/', method: 'GET', handler: userController.getUsers, commonMiddleware }),
    createRoute({ url: '/', method: 'POST', handler: userController.createUser, commonMiddleware }),
    createRoute({ url: '/:id', method: 'DELETE', handler: userController.deleteUser, commonMiddleware }),
    createRoute({ url: '/:id', method: 'PATCH', handler: userController.updateUser, commonMiddleware }),
  ];

  return usersRoutes;
};