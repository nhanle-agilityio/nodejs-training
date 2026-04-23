import { verifyToken } from '@clerk/backend';

type FakeClerkUser = { sub: string; metadata?: { role?: string } };
const TOKEN_TO_USER: Record<string, FakeClerkUser> = {
  'admin-token': { sub: 'user_admin_1', metadata: { role: 'admin' } },
  'user-token': { sub: 'user_normal_1', metadata: { role: 'user' } },
};

export const setupClerkMock = () => {
  (verifyToken as jest.Mock).mockImplementation((token: string) => {
    const user = TOKEN_TO_USER[token];
    if (!user) return Promise.reject(new Error('invalid token'));
    return Promise.resolve(user);
  });
};

export const asAdmin = () => ({ Authorization: 'Bearer admin-token' });
export const asUser = () => ({ Authorization: 'Bearer user-token' });
export const withInvalidToken = () => ({
  Authorization: 'Bearer not-a-real-token',
});
