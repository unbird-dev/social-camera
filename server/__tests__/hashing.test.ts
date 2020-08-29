import {
  createHashedPassword,
  checkHashedPassword,
  generateAccessToken,
  verifyAccessToken
} from 'src/utility/authentication';

describe('Hashing test', () => {
  const password = 'testPassword';
  const hashedPassword = createHashedPassword(password);

  test('Return false -- when password and hashedPassed are not the same', () => {
    expect(password).not.toStrictEqual(hashedPassword);
  });

  test('Return true -- when password is correct', () => {
    expect(checkHashedPassword(password, hashedPassword)).toBe(true);
  });

  test('Return false -- when password is wrong', () => {
    expect(checkHashedPassword('wrong', hashedPassword)).toBe(false);
  });
});

describe('Token test', () => {
  const token = generateAccessToken({
    id: 1,
    name: 'test',
  });

  test('Create token', () => {
    expect(token.length).toBeGreaterThan(5);
  });

  test('Return email -- when token verified', () => {
    expect(verifyAccessToken(token)).toBe('test');
  });

  test('Return false -- when token is invalid', () => {
    expect(verifyAccessToken('dummy_token')).toBe(false);
  });
});
