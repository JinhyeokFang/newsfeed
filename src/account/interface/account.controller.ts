import { inject, injectable } from 'inversify';
import { Post } from '../../common/route-function';
import { AccountService } from '../business/account.service';

@injectable()
export class AccountController {
  public basePath = '/account';

  constructor(
    @inject('AccountService')
    private readonly accountService: AccountService,
  ) {}

  @Post('/register')
  public async register(req, res) {
    await this.accountService.register('email', 'password');

    res.send('Hello World!');
  }
}
