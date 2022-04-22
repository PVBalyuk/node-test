import { hash, compare } from 'bcryptjs';
import { hashPassword, validatePassword } from '../password-utils';

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
  compare: jest.fn(),
}));

describe('password utils', () => {
  test('hashPassword should call bcrypt hash and return value', async () => {
    const hashedPass = 'hashedPass';
    const hashPass = 'hashPass';
    const hashSalt = 1;

    (hash as jest.Mock).mockResolvedValue(hashedPass);

    const result = await hashPassword(hashPass, hashSalt);

    expect(hash).toHaveBeenCalledWith(hashPass, hashSalt);
    expect(result).toBe(hashedPass);
  });

  test('validatePassword should call bcrypt compare and return boolean', async () => {
    const passFromDB = 'adoasdiaod';
    const pass = 'sadada';
    const res = true;

    (compare as jest.Mock).mockResolvedValue(res);

    const comparedPass = await validatePassword(pass, passFromDB);

    expect(compare).toHaveBeenCalledWith(pass, passFromDB);
    expect(comparedPass).toBe(res);
  });
});
