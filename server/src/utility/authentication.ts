import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { sign } from "jsonwebtoken";

export const createHashedPassword = (password: string): string => {
  const salt = genSaltSync(parseInt(process.env.SALT_ROUNDS!));
  return hashSync(password, salt);
};

export const checkHashedPassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return compareSync(password, hashedPassword);
};

export const generateAccessToken = (email: string): string => {
  return sign(email, process.env.JWT_TOKEN_SECRET!, { expiresIn: '3600s' })
}
