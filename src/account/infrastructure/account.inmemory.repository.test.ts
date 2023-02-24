import 'reflect-metadata';
import { Account } from '../domain/account';
import { AccountInmemoryRepository } from './account.inmemory.repository';

describe('AccountInmemoryRepository', () => {
  let accountRepository: AccountInmemoryRepository;

  beforeEach(() => {
    accountRepository = new AccountInmemoryRepository();
  });

  describe('AccountInmemoryRepository.save()', () => {
    it('when account had not been saved', async () => {
      // given
      const account = await Account.create('id', 'password');

      // when
      accountRepository.save(account);

      // then
      expect(await accountRepository.findOneByEmail(account.email)).not.toBe(
        null,
      );
    });
    it('when account already saved', async () => {
      // given
      const account = await Account.create('id', 'password');
      const fixedAccount = await Account.create('id', 'differentPassword');
      accountRepository.save(account);

      // when
      accountRepository.save(fixedAccount);

      // then
      const accountFromRepository = await accountRepository.findOneByEmail(
        account.email,
      );
      expect(
        await accountFromRepository.comparePassword('differentPassword'),
      ).toBe(true);
    });
  });
});
