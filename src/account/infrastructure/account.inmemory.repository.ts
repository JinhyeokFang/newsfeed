import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account.repository';

export class AccountInmemoryRepository implements AccountRepository {
  private static accounts: Account[] = [];

  async save(account: Account): Promise<void> {
    AccountInmemoryRepository.accounts.push(account);
    return;
  }

  async findOneByEmail(email: string): Promise<Account> {
    return AccountInmemoryRepository.accounts.find(
      (account) => account.email === email,
    );
  }
}
