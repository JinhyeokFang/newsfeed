import 'reflect-metadata';
import { Connection } from '../../common/database';
import { Account } from '../domain/account';
import { AccountMysqlRepository } from './account.mysql.repository';

describe('AccountMysqlRepository', () => {
  let accountRepository: AccountMysqlRepository;

  beforeEach(() => {
    accountRepository = new AccountMysqlRepository();
  });

  afterAll(() => {
    Connection.end();
  });

  describe('AccountMysqlRepository.save()', () => {
    it('when account had not been saved', async () => {
      // given
      const account = await Account.create('id', 'password');

      // when
      await accountRepository.save(account);

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
      await accountRepository.save(fixedAccount);

      // then
      const accountFromRepository = await accountRepository.findOneByEmail(
        account.email,
      );
      expect(accountFromRepository).not.toBe(null);
      expect(
        await accountFromRepository.comparePassword('differentPassword'),
      ).toBe(true);
    });
  });
});
