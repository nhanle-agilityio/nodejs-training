import passport from 'passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AppDataSource } from '../config/data-source.js';
import { User } from '../entities/User.js';
import { config } from '../config/config.js';

/**
 * Configure Passport JWT authentication strategy
 * @param {Object} app - Express application instance
 */
export const setupAuth = (app) => {
  // Get User repository from TypeORM
  const userRepository = AppDataSource.getRepository(User);

  // Configure JWT strategy parameters
  const params = {
    secretOrKey: config.jwtSecret,
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  };

  // Create JWT strategy
  const strategy = new Strategy(params, async (payload, done) => {
    try {
      // Find user by ID from JWT payload
      const user = await userRepository.findOne({
        where: { id: payload.id },
      });

      if (user) {
        return done(null, { id: user.id, email: user.email });
      }

      // User not found
      return done(null, false);
    } catch (error) {
      // Error occurred during user lookup
      return done(error, null);
    }
  });

  // Register the strategy with Passport
  passport.use(strategy);

  // Return authentication functions
  return {
    initialize: () => {
      return passport.initialize();
    },
    authenticate: () => {
      return passport.authenticate('jwt', config.jwtSession);
    },
  };
};
