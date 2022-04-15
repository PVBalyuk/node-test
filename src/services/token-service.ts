import jwt, { JwtPayload } from 'jsonwebtoken';
import { SECRET_KEY_CONFIG } from '../config/auth-config';

interface ITokens {
  accessToken: string;
  refreshToken: string;
}
interface IRefreshToken {
  refreshToken: string;
}
interface ITokenPayload {
  email: string;
}

class TokenService {
  async generateTokens(payload: ITokenPayload): Promise<ITokens> {
    const accessToken = jwt.sign(payload, SECRET_KEY_CONFIG.secretKeyAccess, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, SECRET_KEY_CONFIG.secretKeyRefresh, { expiresIn: '30d' });
    return {
      accessToken,
      refreshToken,
    };
  }

  async validateAccessToken(token: string): Promise<ITokenPayload | null> {
    try {
      const dataFromToken = jwt.verify(token, process.env.SECRET_KEY);
      return dataFromToken as ITokenPayload;
    } catch (e) {
      return null;
    }
  }

  async validateRefreshToken(token: string): Promise<ITokenPayload | null> {
    try {
      const dataFromToken = jwt.verify(token, process.env.SECRET_KEY_REFRESH);
      return dataFromToken as ITokenPayload;
    } catch {
      return null;
    }
  }

  async refreshToken(refreshToken: string) {
    // if (!refreshToken) {
    //   throw new Error('Unauthorized user');
    // }
    // const data = await this.validateRefreshToken(refreshToken);
  }
}

export default new TokenService();
