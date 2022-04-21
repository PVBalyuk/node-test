import { Customer } from '../../../../database/models/Customer/customer';
import { generateTokens } from '../../../../services/token-utils';
import { validatePassword } from '../../../../services/password-utils';
import { login } from '../login';
import {Request, Response } from "express";
import {ICustomer} from "../../../../database/models/Customer/customerModel";

jest.mock('../../../../database/models/Customer/customer', () => ({
    Customer: {
        findOne: jest.fn(),
        update: jest.fn(),
    }
}));
jest.mock('../../../../services/token-utils', () => ({
    generateTokens: jest.fn(),
}));
jest.mock('../../../../services/password-utils', () => ({
    validatePassword: jest.fn(),
}));

test('login should return 400 when user already exist', async () => {
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
