import { SECRET_KEY_CONFIG } from '../config/auth-config';

jest.mock('../config/auth-config', () => {
  return {
    secretKeyAccess: 'secretKeyAccess',
    secretKeyRefresh: 'secretKeyRefresh',
    expiresInAccess: 'expiresInAccess',
    expiresInRefresh: 'expiresInRefresh',
    salt: 'salt',
  };
});
