import { Request, Response } from 'express';
import { ICustomer } from '../../../database/models/Customer/customerModel';
import { validationResult } from 'express-validator';
import { Customer } from '../../../database/models/Customer/customer';
import { hashPassword } from '../../../services/password-utils';

export const registration = async (req: Request<Record<string, unknown>, unknown, ICustomer>, res: Response) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(200).json({ message: 'Ошибки при регистрации', errors });
    }
    const user = await Customer.findOne({ where: { firstName: req.body.firstName } });

    if (user) {
      return res.status(400).json('Пользователь с таким логином уже существует');
    }

    const hashedPassword = await hashPassword(req.body.password, 5);

    await Customer.create({
      firstName: req.body.firstName,
      secondName: req.body.secondName,
      email: req.body.email,
      password: hashedPassword,
    });

    return res.status(200).json({ message: 'successful' });
  } catch (e) {
    console.log(e);
    res.status(400).json({ message: 'Registration error' });
  }
};
