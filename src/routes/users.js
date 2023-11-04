import { UserController } from "../controllers/index.js";
import { validateAdminRole, validateJWT, validateIfEmailExists } from "../middlewares/index.js";
import { createRoute } from "../utils/createRoute.js";

const commonMiddleware = [validateJWT, validateAdminRole];
const validateEmail = [validateIfEmailExists]

export const createUserRouter = ({ model, schema }) => {
    const userController = new UserController({ model, schema });

    const usersRoutes = [
        createRoute({
            url: "/:id",
            method: "GET",
            handler: userController.getUser,
            // preHandler: commonMiddleware,
        }),
        createRoute({
            url: "/",
            method: "GET",
            handler: userController.getUsers,
            // preHandler: commonMiddleware,
        }),
        createRoute({
            url: "/",
            method: "POST",
            handler: userController.createUser,
            preHandler: validateEmail,

        }),
        createRoute({
            url: "/:id",
            method: "DELETE",
            handler: userController.deleteUser,
            // preHandler: commonMiddleware,
        }),
        createRoute({
            url: "/:id",
            method: "PATCH",
            handler: userController.updateUser,
            // preHandler: commonMiddleware,
        }),
    ];

    return usersRoutes;
};
