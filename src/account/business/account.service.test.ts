import 'reflect-metadata';
import { Event } from '../../common/event/event';
import { UserId } from '../../account/domain/user-id';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account.repository';
import { AccountMysqlRepository } from '../infrastructure/account.mysql.repository';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let accountRepository: AccountRepository;
  let accountService: AccountService;

  const email = 'email';
  const password = 'password';
  const name = 'name';
  const userId = new UserId('userid');
  const account = Account.create({
    email,
    password,
    name,
    id: userId,
  });

  beforeEach(() => {
    accountRepository = new AccountMysqlRepository(null);
    accountService = new AccountService(accountRepository, new Event());

    jest
      .spyOn(accountRepository, 'findOneById')
      .mockImplementation(async (id) => {
        return id === userId ? account : null;
      });
    jest
      .spyOn(accountRepository, 'findOneByEmail')
      .mockImplementation(async (userEmail) => {
        return userEmail === email ? account : null;
      });
    jest.spyOn(accountRepository, 'save').mockImplementation(async () => {
      return null;
    });
  });

  it('AccountService.register()', async () => {
    // when
    await accountService.register(email, password, name);

    // then
    expect(await accountService.login(email, password)).toBe(true);
    expect(await accountService.login(email, 'wrong password')).toBe(false);
  });
});
