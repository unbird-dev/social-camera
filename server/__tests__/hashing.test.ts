import { createHashedPassword, checkHashedPassword } from "src/utility/authentication";

describe('Hashing test', () => {
  const password = 'testPassword';
  const hashedPassword = createHashedPassword(password);
  test('Return false -- when password and hashedPassed are not the same', () => {
    expect(password).not.toStrictEqual(hashedPassword)
  })

  test('Return true -- when password is correct', () => {
    expect(checkHashedPassword(password, hashedPassword)).toBe(true);
  })

  test('Return false -- when password is wrong', () => {
    expect(checkHashedPassword('wrong', hashedPassword)).toBe(false);
  })
})
