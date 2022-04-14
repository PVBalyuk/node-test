import jwt, { JwtPayload } from 'jsonwebtoken';
import path from 'path';
import dotenv from 'dotenv';
import { Interface } from 'readline';
const envpath = path.basename('../../.env.local');

/* ФАЙЛ СОЗДАН, НО ПОКА НЕ ПЕРЕНОСИЛ СЮДА ЛОГИКУ ИЗ AuthController   */

dotenv.config({ path: envpath });

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
    const accessToken = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '15m' });
    const refreshToken = jwt.sign(payload, process.env.SECRET_KEY_REFRESH, { expiresIn: '30d' });
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
