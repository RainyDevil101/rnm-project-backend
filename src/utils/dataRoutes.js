export const routesData = [
  {
    prefix: this.usersPath,
    routes: usersRoutes(),
  },
  {
    prefix: this.categoriesPath,
    routes: categoriesRoutes(),
  },
  {
    prefix: this.billsPath,
    routes: billsRoutes(),
  },
];