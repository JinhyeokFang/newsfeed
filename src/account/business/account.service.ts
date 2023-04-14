import { inject, injectable } from 'inversify';
import { EventEmitter } from '../../common/event/event-emitter';
import { Account } from '../domain/account';
import { AccountRepository } from '../domain/account.repository';
import { UserId } from '../domain/user-id';

@injectable()
export class AccountService {
  constructor(
    @inject('AccountRepository')
    private readonly accountRepository: AccountRepository,
    @inject('EventEmitter')
    private readonly eventEmitter: EventEmitter,
  ) {}

  async register(email: string, password: string, name: string) {
    const account = await Account.create({
      email,
      password,
      name,
    });
    await this.accountRepository.save(account);
    this.eventEmitter.emit('accountRegistered', {
      email: account.email,
    });
  }

  async login(email: string, password: string) {
    const account = await this.accountRepository.findOneByEmail(email);
    return await account.comparePassword(password);
  }

  async follow(follower: UserId, following: UserId) {
    const account = await this.accountRepository.findOneById(follower);
    account.follow(following);
    await this.accountRepository.save(account);
  }

  async unfollow(follower: UserId, following: UserId) {
    const account = await this.accountRepository.findOneById(follower);
    account.unfollow(following);
    await this.accountRepository.save(account);
  }
}
