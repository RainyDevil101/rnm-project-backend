export const createRoute = ({ url, method, handler, preHandler = null }) => ({
  url,
  method,
  handler,
  preHandler: [...(preHandler || [])],
});