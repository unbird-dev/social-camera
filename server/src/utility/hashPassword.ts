import { genSaltSync, hashSync, compareSync } from 'bcrypt';

const createHashedPassword = (password: string): string => {
  const salt = genSaltSync(parseInt(process.env.SALT_ROUNDS!));
  return hashSync(password, salt);
};

const checkHashedPassword = (
  password: string,
  hashedPassword: string
): boolean => {
  return compareSync(password, hashedPassword);
};
