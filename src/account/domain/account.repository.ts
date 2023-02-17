import { Account } from './account';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  findOneByEmail(email: string): Promise<Account>;
}
