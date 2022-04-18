import { Request, Response } from 'express';
import { Customer } from '../../../database/models/Customer/customer';
import { IDecodedToken } from '../types';
import jwt_decode from 'jwt-decode';
import { generateTokens, validateRefreshToken } from '../../../services/token-utils';
import { ICustomer } from '../../../database/models/Customer/customerModel';

export const refreshToken = async (req: Request<Record<string, unknown>, unknown, ICustomer>, res: Response) => {
  try {
    const { refreshToken } = req.body;

    const userData = await validateRefreshToken(refreshToken);

    if (!userData) {
      return res.status(400).json('Неверный рефреш токен');
    }
    const user = await Customer.findOne({ where: { email: userData.email } });

    if (!user) {
      return res.status(400).json('Нет пользователя');
    }
    const refreshTokenFromDB = user.get().refreshToken;

    if (!refreshTokenFromDB) {
      return res.status(400).json('Нет рефреш токена');
    }
    const decoded: IDecodedToken = jwt_decode(refreshTokenFromDB);

    if (refreshToken !== refreshTokenFromDB) {
      return res.status(400).json('Данные не соответствуют имеющимся в БД');
    }
    const expiresAt = decoded.exp;

    if (!expiresAt) {
      return res.status(400).json('Рефреш токен закончился');
    }
    const email = user.get().email;
    const newTokens = await generateTokens({ email });

    await Customer.update({ refreshToken: newTokens.refreshToken }, { where: { email: userData.email } });

    return res.status(200).json(newTokens);
  } catch (e) {
    console.log(e);
  }
};
