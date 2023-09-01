import { describe, expect, it } from 'vitest';
import { usersRoutes } from '../../../src/routes';

describe('server.js', () => {
  it('usersRoutes should return an array of routes', () => {
    const routes = usersRoutes();
    expect(Array.isArray(routes)).toBe(true);
  });
});