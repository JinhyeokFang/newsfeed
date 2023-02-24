import { inject, injectable } from 'inversify';
import { Controller } from '../../common/controller';
import { Post } from '../../common/route-function';
import { AccountService } from '../business/account.service';

@Controller('/account')
export class AccountController {
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
