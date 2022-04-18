import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY_CONFIG } from '../config/auth-config';
import { ITokens, ITokenPayload, IRefreshToken } from '../modules/auth/types';

export const generateTokens = async (payload: ITokenPayload): Promise<ITokens> => {
  const accessToken = jwt.sign(payload, SECRET_KEY_CONFIG.secretKeyAccess, { expiresIn: '15m' });
  const refreshToken = jwt.sign(payload, SECRET_KEY_CONFIG.secretKeyRefresh, { expiresIn: '30d' });

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
