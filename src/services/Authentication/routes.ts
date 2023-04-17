import { authenticationUser } from './controllers/authenticationAdmin';
import { Router } from 'express';

const AuthRouter = Router();

AuthRouter.route('/login').post(authenticationUser);

export default AuthRouter;
