import 'reflect-metadata';
import { DataSource } from '../../common/database/database';
import { Account } from '../domain/account';
import { AccountMysqlRepository } from './account.mysql.repository';

describe('AccountMysqlRepository', () => {
  let dataSource: DataSource;
  let accountRepository: AccountMysqlRepository;

  beforeEach(() => {
    dataSource = new DataSource();
    accountRepository = new AccountMysqlRepository(dataSource);
  });

  afterAll(() => {
    dataSource.removePool();
  });

  describe('AccountMysqlRepository.save()', () => {
    it('when account had not been saved', async () => {
      // given
      const account = await Account.create({
        email: 'email@email.com',
        password: 'password',
        name: 'name',
      });

      // when
      await accountRepository.save(account);

      // then
      expect(await accountRepository.findOneByEmail(account.email)).not.toBe(
        null,
      );
    });
    it('when account already saved', async () => {
      // given
      const account = await Account.create({
        email: 'email@email.com',
        password: 'password',
        name: 'name',
      });
      const fixedAccount = await Account.create({
        email: 'email@email.com',
        password: 'differentPassword',
        name: 'name',
      });
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
