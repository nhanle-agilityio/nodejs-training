import { setupAuth } from '../auth/auth.js';

/**
 * Setup authentication middleware and attach to Express app
 * @param {Object} app - Express application instance
 * @param {Object} dataSource - TypeORM DataSource instance
 */
export const setupAuthMiddleware = (app, dataSource) => {
  // Setup Passport authentication
  const auth = setupAuth(app, dataSource);

  // Attach auth functions to app object for use in routes
  app.auth = {
    initialize: auth.initialize,
    authenticate: auth.authenticate,
  };
};
