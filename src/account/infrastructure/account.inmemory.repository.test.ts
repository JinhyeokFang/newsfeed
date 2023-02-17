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
  });
});
