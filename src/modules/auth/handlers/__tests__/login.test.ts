import { Customer } from '../../../../database/models/Customer/customer';
import { generateTokens } from '../../../../services/token-utils';
import { validatePassword } from '../../../../services/password-utils';
import { login } from '../login';
import { Request, Response } from 'express';
import { ICustomer } from '../../../../database/models/Customer/customerModel';

jest.mock('../../../../database/models/Customer/customer', () => ({
  Customer: {
    findOne: jest.fn(),
    update: jest.fn(),
  },
}));
jest.mock('../../../../services/token-utils', () => ({
  generateTokens: jest.fn(),
}));
jest.mock('../../../../services/password-utils', () => ({
  validatePassword: jest.fn(),
}));

test('login should return 400 when user does not exist', async () => {
  const mockReq = {
    body: { email: 'mockEmail' },
  } as Request<Record<string, unknown>, unknown, ICustomer>;
  const mockStatusRes = { json: jest.fn((s) => s) };
  const mockRes = {
    status: jest.fn().mockReturnValue(mockStatusRes),
  } as unknown as Response;

  (Customer.findOne as jest.Mock).mockResolvedValue(null);

  const result = await login(mockReq, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(400);
  expect(mockStatusRes.json).toHaveBeenCalledWith('Пользователя с таким email не существует');
  expect(result).toBe('Пользователя с таким email не существует');
});

test('login should return 400 when password is invalid', async () => {
  const mockReq = {
    body: { email: 'test@test.com', password: 'nfaofsa' },
  } as Request<Record<string, unknown>, unknown, ICustomer>;
  const mockStatusRes = { json: jest.fn((s) => s) };
  const mockRes = {
    status: jest.fn().mockReturnValue(mockStatusRes),
  } as unknown as Response;
  const user = {
    get: jest.fn().mockReturnValue({
      email: 'test@test.com',
      firstName: 'asda',
      secondName: 'adasdas',
      password: '12312313',
      id: 1,
    }),
  };

  (Customer.findOne as jest.Mock).mockResolvedValue(user);
  (validatePassword as jest.Mock).mockResolvedValue(false);

  const result = await login(mockReq, mockRes);

  expect(mockRes.status).toHaveBeenCalledWith(400);
  expect(mockStatusRes.json).toHaveBeenCalledWith('Неверный пароль');
  expect(result).toBe('Неверный пароль');
});

test('login should return 200 and return user data', async () => {
  const mockReq = {
    body: { email: 'test@test.com', password: '12312313' },
  } as Request<Record<string, unknown>, unknown, ICustomer>;
  const mockStatusRes = { json: jest.fn((s) => s) };
  const mockRes = {
    status: jest.fn().mockReturnValue(mockStatusRes),
  } as unknown as Response;
  const user = {
    get: jest.fn().mockReturnValue({
      id: 1,
      firstName: 'asda',
      secondName: 'adasdas',
      email: 'test@test.com',
      password: '12312313',
    }),
  };
  const tokens = {
    refreshToken: 'asdasdasdsd',
    accessToken: 'aodasmpfmgpa',
  };

  (Customer.findOne as jest.Mock).mockResolvedValue(user);
  (validatePassword as jest.Mock).mockResolvedValue(true);
  (generateTokens as jest.Mock).mockResolvedValue(tokens);
  (Customer.update as jest.Mock).mockResolvedValue(tokens.refreshToken);

  const result = await login(mockReq, mockRes);

  const expectedResult = {
    id: 1,
    firstName: 'asda',
    secondName: 'adasdas',
    email: 'test@test.com',
    refreshToken: 'asdasdasdsd',
  };

  expect(mockRes.status).toHaveBeenCalledWith(200);
  expect(mockStatusRes.json).toHaveBeenCalledWith(expectedResult);
  expect(result).toEqual(expectedResult);
});
