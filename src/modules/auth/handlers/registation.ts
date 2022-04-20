import { Request, Response } from 'express';
import { ICustomer } from '../../../database/models/Customer/customerModel';
import { Customer } from '../../../database/models/Customer/customer';
import { hashPassword } from '../../../services/password-utils';
import { PASS_CONFIG } from '../../../config/auth-config';

export const registration = async (req: Request<Record<string, unknown>, unknown, ICustomer>, res: Response) => {
  const user = await Customer.findOne({ where: { firstName: req.body.firstName } });

  if (user) {
    return res.status(400).json('Пользователь с таким логином уже существует');
  }

  const hashedPassword = await hashPassword(req.body.password, PASS_CONFIG.salt);

  await Customer.create({
    firstName: req.body.firstName,
    secondName: req.body.secondName,
    email: req.body.email,
    password: hashedPassword,
  });

  return res.status(200).json({ message: 'successful' });
};
