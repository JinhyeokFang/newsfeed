import { injectable } from 'inversify';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account.repository';

@injectable()
export class AccountInmemoryRepository implements AccountRepository {
  private static accounts: Account[] = [];

  async save(account: Account): Promise<void> {
    this.removeAccountIfExist(account.email);
    AccountInmemoryRepository.accounts.push(account);
    return;
  }

  private isExist(email: string) {
    return this.getIndexOfAccount(email) !== -1;
  }

  private getIndexOfAccount(email: string) {
    return AccountInmemoryRepository.accounts.findIndex(
      (account) => account.email === email,
    );
  }

  private removeAccountIfExist(email: string) {
    if (!this.isExist(email)) {
      return;
    }
    const index = this.getIndexOfAccount(email);
    AccountInmemoryRepository.accounts.splice(index, 1);
  }

  async findOneByEmail(email: string): Promise<Account> {
    if (!this.isExist(email)) {
      throw new Error('account does not exist');
    }
    const index = this.getIndexOfAccount(email);
    return AccountInmemoryRepository.accounts[index];
  }
}
