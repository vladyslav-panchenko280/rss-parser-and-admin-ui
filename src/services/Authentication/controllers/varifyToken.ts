import jwt from 'jsonwebtoken'; // JSON Web Tokens are an open, industry standard method for representing claims securely between two parties.
import dotenv from 'dotenv';
import type { Response } from '../..';

dotenv.config(); // Load variables from file .env.

// Create middleware for authentication
export const verifyToken = (req: any, res: Response, next: any) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res
      .status(403)
      .json({ message: 'A token is required for authentication', data: token });
  }
  try {
    // Verify and pass request
    jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token', data: token });
  }
  return next();
};
