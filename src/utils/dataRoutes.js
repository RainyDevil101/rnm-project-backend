import {
  roleSchema,
  userSchema,
  expenseSchema,
  accountSchema,
} from "../schemas/index.js";
import { Role, User, Expense, Account } from "../models/index.js";
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
  {
    prefix: "/v1/accounts",
    routes: createElementRouter({ model: Account, schema: accountSchema }),
  },

];
