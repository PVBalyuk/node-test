import { hash, compare } from 'bcryptjs';
import { validatePassword, hashPassword } from './password-utils';

jest.mock('bcryptjs', () => ({
    hash: jest.fn(),
    compare: jest.fn(),
}));

test('hashPassword should call bcrypt hash and return its result', async () => {
    const mockPassword = 'mockPassword';
    const mockPass = 'mockPass';
    const mockSalt = 1;
    (hash as jest.Mock).mockResolvedValue(mockPassword);
    
    const result = await hashPassword(mockPass, mockSalt);
    
    expect(hash).toHaveBeenCalledWith(mockPass, mockSalt);
    expect(result).toBe(mockPassword)
});
