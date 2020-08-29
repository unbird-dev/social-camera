import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { RequestHandler } from 'express';

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

export const authenticateToken: RequestHandler = (
  request,
  response,
  next
) => {};
