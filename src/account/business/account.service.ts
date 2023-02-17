import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account.repository';

export class AccountService {
  constructor(private readonly accountRepository: AccountRepository) {}

  async register(email: string, password: string) {
    const account = await Account.create(email, password);
    await this.accountRepository.save(account);
  }

  async login(email: string, password: string) {
    const account = await this.accountRepository.findOneByEmail(email);
    return await account.comparePassword(password);
  }
}
