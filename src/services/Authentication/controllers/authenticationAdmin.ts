import jwt from 'jsonwebtoken'; // JSON Web Tokens are an open, industry standard method for representing claims securely between two parties.
import dotenv from 'dotenv';
import AdminModel from '../model';

import type { Response } from '../..';
import { checkAuthBody } from '../validators/checkAuthBody';
import { varifyEncryptedPassword } from '../validators/varifyEncryptedPassword';

dotenv.config(); // Load variables from file .env.

export interface Admin {
  username: string;
  password: string;
}

export interface AuthRequest {
  body: {
    username: string;
    password: string;
  };
}

export const authenticationUser = async (req: AuthRequest, res: Response) => {
  // Get username and password from request body
  const { username } = req.body;

  // Validate user input
  if (!(await checkAuthBody(req.body))) {
    return res
      .status(400)
      .json({ message: 'All input is required', data: req.body });
  }

  // Validate if user exist in our database
  const admin: Admin | null = await AdminModel.findOne({ username });

  if (
    admin &&
    (await varifyEncryptedPassword(req.body.password, admin.password))
  ) {
    // Create token
    const token = jwt.sign(req.body, process.env.JWT_SECRET as string, {
      expiresIn: '1d', // Lifetime of token - 1 day from creating time
    });

    // Send token to user
    return res
      .status(200)
      .json({ message: 'Token has been successfully gotten', data: token });
  }
  // Return an error response if the username or password is invalid
  return res
    .status(401)
    .json({ message: 'Invalid username or password', data: req.body });
};
