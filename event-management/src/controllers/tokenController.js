import jwt from 'jwt-simple';
import { config } from '../config/config.js';
import { UserRepository } from '../repositories/userRepository.js';

/**
 * Generate JWT token for authenticated user
 */
export const generateTokenHandler = async (req, res, next) => {
  try {
    // Validate email and password are provided
    if (!req.body.email || !req.body.password) {
      return res.sendStatus(401);
    }

    const { email, password } = req.body;
    const user = await req.userRepository.findUserByEmail(email);

    if (!user || !UserRepository.isPassword(user.password, password)) {
      return res.sendStatus(401);
    }

    // Create JWT payload with only user ID
    const payload = { id: user.id };

    // Encode token using jwt-simple
    const token = jwt.encode(payload, config.jwtSecret);

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error generating token:', error);
    res.sendStatus(401);
  }
};
