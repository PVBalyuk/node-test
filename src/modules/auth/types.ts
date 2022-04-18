import { JwtPayload } from 'jsonwebtoken';

export interface IDecodedToken {
  email: string;
  exp: string;
  iat: string;
}

export interface ITokens {
  accessToken: string;
  refreshToken: string;
}
export interface IRefreshToken {
  refreshToken: string;
}
export interface ITokenPayload extends JwtPayload {
  email: string;
}
