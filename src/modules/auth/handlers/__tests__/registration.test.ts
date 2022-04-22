import { Request, Response } from 'express';
import { Customer } from '../../../../database/models/Customer/customer';
import { hashPassword } from '../../../../services/password-utils';
import { ICustomer } from '../../../../database/models/Customer/customerModel';
import { registration } from '../registation';

jest.mock('../../../../database/models/Customer/customer', () => ({
  Customer: {
    findOne: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('../../../../services/password-utils', () => ({
  hashPassword: jest.fn(),
}));

test('registration should return status 400 when user already exists', async () => {
  const mockReq = {
    body: { firstName: 'alex' },
  } as Request<Record<string, unknown>, unknown, ICustomer>;
  const mockStatusRes = { json: jest.fn((s) => s) };
  const mockRes = {
    status: jest.fn().mockReturnValue(mockStatusRes),
  } as unknown as Response;
  const user = {
    firstName: 'alex',
  };
  const jsonMessage = 'Пользователь с таким логином уже существует';

  (Customer.findOne as jest.Mock).mockResolvedValue(user);

  const result = await registration(mockReq, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(400);
  expect(mockStatusRes.json).toHaveBeenCalledWith(jsonMessage);
  expect(result).toBe(jsonMessage);
});

test('registration should return status 200 and message successful', async () => {
  const mockReq = {
    body: { email: 'test@test.com', firstName: 'alex', secondName: 'ivanov', password: 'adimsadadi' },
  } as Request<Record<string, unknown>, unknown, ICustomer>;
  const mockStatusRes = { json: jest.fn((s) => s) };
  const mockRes = {
    status: jest.fn().mockReturnValue(mockStatusRes),
  } as unknown as Response;
  const hashedPass = 'asd1213131as';
  const user = {
    email: 'test@test.com',
    firstName: 'alex',
    secondName: 'ivanov',
    password: hashedPass,
  };

  const jsonMessage = { message: 'successful' };

  (Customer.findOne as jest.Mock).mockResolvedValue(null);

  (hashPassword as jest.Mock).mockResolvedValue(hashedPass);
  (Customer.create as jest.Mock).mockResolvedValue(user);

  const result = await registration(mockReq, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockStatusRes.json).toHaveBeenCalledWith(jsonMessage);
  expect(result).toEqual(jsonMessage);
});
