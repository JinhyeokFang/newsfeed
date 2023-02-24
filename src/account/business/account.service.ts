import { inject, injectable } from 'inversify';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account.repository';

@injectable()
export class AccountService {
  constructor(
    @inject('AccountRepository')
    private readonly accountRepository: AccountRepository,
  ) {}

  async register(email: string, password: string) {
    const account = await Account.create(email, password);
    await this.accountRepository.save(account);
  }

  async login(email: string, password: string) {
    const account = await this.accountRepository.findOneByEmail(email);
    return await account.comparePassword(password);
  }
}
