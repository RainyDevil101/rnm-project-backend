import { ElementController } from "../controllers/index.js";
import { validateJWT } from "../middlewares/validate-jwt.js";
import { validateAdminOrUserRole, validateAdminRole } from "../middlewares/validate-role.js";
import { createRoute } from "../utils/createRoute.js";

export const createElementRouter = ({ model, schema }) => {
  const commonMiddleware = [validateJWT, validateAdminOrUserRole];

  const elementController = new ElementController({ model, schema });

  const elementRoutes = [
    createRoute({
      url: "/:id",
      method: "GET",
      handler: elementController.getElement,
      preHandler: commonMiddleware,
    }),
    createRoute({
      url: "/",
      method: "GET",
      handler: elementController.getElements,
      preHandler: commonMiddleware,
    }),
    createRoute({
      url: "/",
      method: "POST",
      handler: elementController.createElement,
      preHandler: commonMiddleware,
    }),
    createRoute({
      url: "/:id",
      method: "DELETE",
      handler: elementController.deleteElement,
      preHandler: commonMiddleware,
    }),
    createRoute({
      url: "/:id",
      method: "PATCH",
      handler: elementController.updateElement,
      preHandler: commonMiddleware,
    }),
  ];

  return elementRoutes;
};
