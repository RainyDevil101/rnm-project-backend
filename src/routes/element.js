import { ElementController } from "../controllers/index.js";
import { createRoute } from "../utils/createRoute.js";

export const createElementRouter = ({ model, schema }) => {

  const elementController = new ElementController({ model, schema });

  const elementRoutes = [
    createRoute({ url: '/:id', method: 'GET', handler: elementController.getElement }),
    createRoute({ url: '/', method: 'GET', handler: elementController.getElements }),
    createRoute({ url: '/', method: 'POST', handler: elementController.createElement }),
    createRoute({ url: '/:id', method: 'DELETE', handler: elementController.deleteElement }),
    createRoute({ url: '/:id', method: 'PATCH', handler: elementController.updateElement }),
  ];

  return elementRoutes;
};