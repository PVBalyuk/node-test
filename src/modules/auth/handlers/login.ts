import { Request, Response } from 'express';
import { Customer } from '../../../database/models/Customer/customer';
import { generateTokens } from '../../../services/token-utils';
import { ICustomer } from '../../../database/models/Customer/customerModel';
import { validatePassword } from '../../../services/password-utils';

export const login = async (req: Request<Record<string, unknown>, unknown, ICustomer>, res: Response) => {
  const { email: requestEmail, password: requestPassword } = req.body;

  const userEmailCheck = await Customer.findOne({ where: { email: requestEmail } });

  if (!userEmailCheck) {
    return res.status(400).json('Пользователя с таким email не существует');
  }
  const { id, firstName, secondName, password, email } = userEmailCheck.get();
  const isValidPass = await validatePassword(requestPassword, password);

  if (!isValidPass) {
    return res.status(400).json('Неверный пароль');
  }
  const tokens = await generateTokens({ email });

  await Customer.update({ refreshToken: tokens.refreshToken }, { where: { email: requestEmail } });

  return res.status(200).json({ id, firstName, secondName, email, refreshToken: tokens.refreshToken });
};
