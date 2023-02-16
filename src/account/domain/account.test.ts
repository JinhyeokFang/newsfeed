import { Account } from './account';

describe('Account', () => {
  it('Account.comparePassword(plainPassword)', async () => {
    const account = await Account.create('', 'password');

    expect(await account.comparePassword('password')).toBe(true);
    expect(await account.comparePassword('pass!word')).toBe(false);
  });
});
