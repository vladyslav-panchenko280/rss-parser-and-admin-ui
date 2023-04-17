import jwt, { VerifyErrors, VerifyOptions } from 'jsonwebtoken'; // JSON Web Tokens are an open, industry standard method for representing claims securely between two parties.
import dotenv from 'dotenv';

dotenv.config(); // Load variables from file .env.

interface Response {
  json: (data: any) => void;
  status: (code: number) => Response;
}

// Create middleware for authentication
export const verifyToken = (req: any, res: Response, next: any) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res
      .status(403)
      .json({ message: 'A token is required for authentication' });
  }
  try {
    // Verify and pass request
    jwt.verify(token, process.env.JWT_SECRET as string);
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
  return next();
};
