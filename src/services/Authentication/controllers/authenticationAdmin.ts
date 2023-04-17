import jwt from 'jsonwebtoken'; // JSON Web Tokens are an open, industry standard method for representing claims securely between two parties.
import dotenv from 'dotenv';
import AdminModel from '../model';
import bcryptjs from 'bcryptjs';

dotenv.config(); // Load variables from file .env.

interface AuthRequest {
  body: {
    username: string;
    password: string;
  };
}

interface Response {
  json: (data?: any) => void;
  status: (code: number) => Response;
}

type Admin = {
  username: string;
  password: string;
};

export const authenticationUser = async (req: AuthRequest, res: Response) => {
  // Get username and password from request body
  const { username, password } = req.body;

  // Validate user input
  if (!username || !password) {
    return res.status(400).json({ message: 'All input is required' });
  }

  // Validate if user exist in our database
  const admin: Admin | null = await AdminModel.findOne({ username });

  if (admin && (await bcryptjs.compare(password, admin.password))) {
    // Create token
    const token = jwt.sign(
      { username: username, password: password },
      process.env.JWT_SECRET as string,
      {
        expiresIn: '7d', // Lifetime of token - 7 days from creating time
      }
    );

    // Send token to user
    return res.status(200).json(token);
  }
  // Return an error response if the username or password is invalid
  return res.status(401).json({ message: 'Invalid username or password' });
};
