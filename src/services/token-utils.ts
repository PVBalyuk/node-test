import jwt from 'jsonwebtoken';
import { SECRET_KEY_CONFIG } from '../config/auth-config';
import { ITokens, ITokenPayload, IDecodedToken } from '../modules/auth/types';
import jwt_decode from 'jwt-decode';

export const generateTokens = (payload: ITokenPayload): ITokens => {
  const accessToken = jwt.sign(payload, SECRET_KEY_CONFIG.secretKeyAccess, {
    expiresIn: SECRET_KEY_CONFIG.expiresInAccess,
  });
  const refreshToken = jwt.sign(payload, SECRET_KEY_CONFIG.secretKeyRefresh, {
    expiresIn: SECRET_KEY_CONFIG.expiresInRefresh,
  });

  return {
    accessToken,
    refreshToken,
  };
};

export const validateAccessToken = (token: string | null | undefined): ITokenPayload => {
  if (!token) {
    throw new Error('Ошибка токена');
  }
  const verified = jwt.verify(token, SECRET_KEY_CONFIG.secretKeyAccess);

  if (typeof verified === 'string') {
    throw new Error('Invalid token');
  }

  return verified as ITokenPayload;
};

export const validateRefreshToken = (token: string | null | undefined): ITokenPayload => {
  if (!token) {
    throw new Error('Ошибка токена');
  }
  const verified = jwt.verify(token, SECRET_KEY_CONFIG.secretKeyRefresh);

  if (typeof verified === 'string') {
    throw new Error('Invalid token');
  }

  return verified as ITokenPayload;
};

export const validateExpiredToken = (token: string | null | undefined): Error | void => {
  if (!token) {
    throw new Error('Ошибка токена');
  }

  const { exp: expiresAt }: IDecodedToken = jwt_decode(token);

  if (!expiresAt) {
    throw new Error('Рефреш токен истёк');
  }
};
