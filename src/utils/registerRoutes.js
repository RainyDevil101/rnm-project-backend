
export const registerRoutes = async (app, routeData) => {
  await app.register((instance, _, done) => {
    routeData.routes.map((route) => {
      instance.route(route);
    });
    done();
  }, { prefix: routeData.prefix });
};