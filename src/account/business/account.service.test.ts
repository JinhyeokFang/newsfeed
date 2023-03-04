import 'reflect-metadata';
import { Event } from '../../common/event/event';
import { AccountInmemoryRepository } from '../infrastructure/account.inmemory.repository';
import { AccountService } from './account.service';

describe('AccountService', () => {
  let accountService: AccountService;

  beforeEach(() => {
    const accountRepository = new AccountInmemoryRepository();
    accountService = new AccountService(accountRepository, new Event());
  });

  it('AccountService.register()', async () => {
    // given
    const email = 'email';
    const password = 'password';

    // when
    await accountService.register(email, password);

    // then
    expect(await accountService.login(email, password)).toBe(true);
    expect(await accountService.login(email, 'wrong password')).toBe(false);
  });
});
