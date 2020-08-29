import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import { sign, verify } from 'jsonwebtoken';
import { RequestHandler } from 'express';
import { UserInstance } from 'src/database/models/user';

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

export const generateAccessToken = (payload: {
  name: string;
  id: number;
}): string => {
  return sign(payload , process.env.JWT_TOKEN_SECRET! as string, {
    expiresIn: '1200s'
  });
};

export const verifyAccessToken = (token: string): string | boolean => {
  try {
    const payload = verify(token, process.env.JWT_TOKEN_SECRET!);
    return (payload as { id: string }).id;
  } catch (error) {
    return false;
  }
};

export const authenticationMiddleware: RequestHandler = (
  request,
  response,
  next
) => {
  const header = request.headers['authorization'];
  const token = header && header.split(' ')[1];

  if (!token) return response.sendStatus(401);

  const id = verifyAccessToken(token);

  if (!id) return response.sendStatus(403);

  response.locals.id = id;
  next();
};
