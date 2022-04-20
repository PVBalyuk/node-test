import { Request, Response } from 'express';
import { Customer } from '../../../database/models/Customer/customer';
import { validateExpiredToken, generateTokens, validateRefreshToken } from '../../../services/token-utils';
import { ICustomer } from '../../../database/models/Customer/customerModel';

export const refreshToken = async (req: Request<Record<string, unknown>, unknown, ICustomer>, res: Response) => {
  const { refreshToken } = req.body;

  const userTokenPayload = await validateRefreshToken(refreshToken);

  const user = await Customer.findOne({ where: { email: userTokenPayload.email } });

  if (!user) {
    return res.status(400).json('Нет пользователя');
  }
  const refreshTokenFromDB = user.get().refreshToken;

  if (refreshToken !== refreshTokenFromDB) {
    return res.status(400).json('Данные не соответствуют имеющимся в БД');
  }
  await validateExpiredToken(refreshTokenFromDB);

  const { email } = user.get();

  const newTokens = await generateTokens({ email });

  await Customer.update({ refreshToken: newTokens.refreshToken }, { where: { email: userTokenPayload.email } });

  return res.status(200).json(newTokens);
};
