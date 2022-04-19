import { Request, Response } from 'express';
import { Customer } from '../../../database/models/Customer/customer';
import { generateTokens } from '../../../services/token-utils';
import { ICustomer } from '../../../database/models/Customer/customerModel';
import { validatePassword } from '../../../services/password-utils';

export const login = async (req: Request<Record<string, unknown>, unknown, ICustomer>, res: Response) => {
  const userEmailCheck = await Customer.findOne({ where: { email: req.body.email } });

  if (!userEmailCheck) {
    return res.status(400).json('Пользователя с таким email не существует');
  }
  const { id, firstName, secondName, email } = userEmailCheck.get();
  const isValidPass = await validatePassword(req.body.password, userEmailCheck.get().password);

  if (!isValidPass) {
    return res.status(400).json('Неверный пароль');
  }
  const token = await generateTokens({ email });

  await Customer.update({ refreshToken: token.refreshToken }, { where: { email: req.body.email } });
  res.status(200).json(`id${id} ${firstName} ${secondName} ${email} Refresh token - ${token.refreshToken}`);
};
