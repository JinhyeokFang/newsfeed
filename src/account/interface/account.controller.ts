import { inject } from 'inversify';
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
    const { email, password } = req.body;

    await this.accountService.register('email', 'password');

    res.send({
      email,
      password,
    });
  }
}
