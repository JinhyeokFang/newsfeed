import { Account } from './account';
import { UserId } from './user-id';

export interface AccountRepository {
  save(account: Account): Promise<void>;
  findOneByEmail(email: string): Promise<Account>;
  findOneById(id: UserId): Promise<Account>;
}
