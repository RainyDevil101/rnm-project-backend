import {
    categorySchema,
    roleSchema,
    userSchema,
    expenseSchema,
} from "../schemas/index.js";
import { Category, Role, User, Expense } from "../models/index.js";
import {
    authRoutes,
    createElementRouter,
    createUserRouter,
} from "../routes/index.js";

export const routesData = [
    {
        prefix: "/v1/users",
        routes: createUserRouter({ model: User, schema: userSchema }),
    },
    {
        prefix: "/v1/categories",
        routes: createElementRouter({
            model: Category,
            schema: categorySchema,
        }),
    },
    {
        prefix: "/v1/expenses",
        routes: createElementRouter({ model: Expense, schema: expenseSchema }),
    },
    {
        prefix: "/v1/auth",
        routes: authRoutes(),
    },
    {
        prefix: "/v1/roles",
        routes: createElementRouter({ model: Role, schema: roleSchema }),
    },
];
