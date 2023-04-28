import { object, string } from 'yup';
import { Admin } from '../controllers/authenticationAdmin';

export const authSchema = object({
  username: string().required().max(100),
  password: string().required().max(100),
});

export const checkAuthBody = (body: Admin) => {
  return authSchema.isValid(body);
};
