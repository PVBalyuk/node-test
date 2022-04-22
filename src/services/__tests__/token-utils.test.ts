import jwt, { sign, verify } from 'jsonwebtoken';
import { SECRET_KEY_CONFIG } from '../../config/auth-config';
import jwt_decode from 'jwt-decode';
import { generateTokens, validateAccessToken, validateRefreshToken, validateExpiredToken } from '../token-utils';

jest.mock('jsonwebtoken', () => ({
  sign: jest.fn(),
  verify: jest.fn(),
}));

jest.mock('jwt-decode', () => ({
  jwt_decode: jest.fn(),
}));

describe('token-utils', () => {
  test('generateTokens should call jwt sign and return value', () => {
    const payload = {
      email: 'test@test.com',
    };
    const accessToken = 'asdasdsaddsdadadas';
    const refreshToken = 'adsamdaisdaodsaidmaid';

    (sign as jest.Mock).mockReturnValueOnce(accessToken).mockReturnValueOnce(refreshToken);
    const result = generateTokens(payload);

    const expectedResult = {
      accessToken,
      refreshToken,
    };

    expect(sign).toHaveBeenNthCalledWith(1, payload, SECRET_KEY_CONFIG.secretKeyAccess, {
      expiresIn: SECRET_KEY_CONFIG.expiresInAccess,
    });
    expect(sign).toHaveBeenNthCalledWith(2, payload, SECRET_KEY_CONFIG.secretKeyRefresh, {
      expiresIn: SECRET_KEY_CONFIG.expiresInRefresh,
    });
    expect(result).toEqual(expectedResult);
  });

  test('validateAccessToken should call jwt verify and return value', () => {
    const token = 'dfsmsdofmosdsofm';
    const res = {
      email: 'test@test.com',
    };

    (verify as jest.Mock).mockReturnValue(res);

    const result = validateAccessToken(token);

    expect(verify).toHaveBeenCalledWith(token, SECRET_KEY_CONFIG.secretKeyAccess);
    expect(result).toEqual(res);
  });

  test('validateAccessToken should call jwt verify and throw Error - Token Error', () => {
    const token = null;
    const error = 'Ошибка токена';

    expect(() => validateAccessToken(token)).toThrow(error);
  });

  test('validateAccessToken should call jwt verify and throw Error - Invalid token', () => {
    const token = 'sadadasdas';
    const result = 'Не валидный токен';

    (verify as jest.Mock).mockReturnValue(result);

    const expectedResult = 'Invalid token';

    expect(() => validateAccessToken(token)).toThrowError(expectedResult);
  });

  test('validateRefreshToken should call jwt verify and return value', () => {
    const token = 'dfsmsdofmosdsofm';
    const res = {
      email: 'test@test.com',
    };

    (verify as jest.Mock).mockReturnValue(res);

    const result = validateRefreshToken(token);

    expect(verify).toHaveBeenCalledWith(token, SECRET_KEY_CONFIG.secretKeyRefresh);
    expect(result).toEqual(res);
  });

  test('validateRefreshToken should throw Error - Token Error', () => {
    const token = null;
    const error = 'Ошибка токена';

    expect(() => validateRefreshToken(token)).toThrow(error);
  });

  test('validateRefreshToken should call jwt verify and throw Error - Invalid token', () => {
    const token = 'sadadasdas';
    const result = 'Не валидный токен';

    (verify as jest.Mock).mockReturnValue(result);

    const expectedResult = 'Invalid token';

    expect(() => validateRefreshToken(token)).toThrowError(expectedResult);
  });

  test('validateExpiredToken should throw Error - Token error', () => {
    const token = null;
    const result = 'Ошибка токена';

    expect(() => validateExpiredToken(token)).toThrow(result);
  });

  test('validateExpiredToken should throw Error - Token error', () => {
    const token = 'asdasddsadd';
    const error = 'Рефреш токен истёк';

    (jwt_decode as jest.Mock).mockReturnValue(null);

    expect(jwt_decode).toHaveBeenCalledWith(token);
    expect(() => validateExpiredToken(token)).toThrow(error);
  });

  test('validateExpiredToken should do nothing', () => {
    const token = 'asdasddsadd';
    // const result = {
    //   exp: '123123231',
    // };

    (jwt_decode as jest.Mock).mockReturnValue('asdasda');

    expect(jwt_decode).toHaveBeenCalledWith(token);
    expect(() => validateExpiredToken(token)).not.toThrow();
  });
});
