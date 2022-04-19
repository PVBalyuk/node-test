import jwt from 'jsonwebtoken';
import { SECRET_KEY_CONFIG } from '../config/auth-config';
import { ITokens, ITokenPayload, IDecodedToken } from '../modules/auth/types';
import jwt_decode from 'jwt-decode';

export const generateTokens = async (payload: ITokenPayload): Promise<ITokens> => {
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

export const validateAccessToken = async (token: string): Promise<ITokenPayload | null> => {
  try {
    const dataFromToken = jwt.verify(token, process.env.SECRET_KEY);

    return dataFromToken as ITokenPayload;
  } catch (e) {
    return null;
  }
};

export const validateRefreshToken = async (token: string | null | undefined): Promise<ITokenPayload> => {
  const verified = await jwt.verify(token as string, process.env.SECRET_KEY_REFRESH);

  if (typeof verified === 'string') {
    throw new Error();
  }

  return verified as ITokenPayload;
};

export const expiredToken = async (token: string): Promise<Error | void> => {
  const decoded: IDecodedToken = jwt_decode(token);

  const expiresAt = decoded.exp;

  if (!expiresAt) {
    throw new Error('Рефреш токен истёк');
  }
};
