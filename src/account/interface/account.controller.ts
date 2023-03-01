import { inject } from 'inversify';
import { Controller } from '../../common/controller';
import { Post } from '../../common/route-function';
import { Validate } from '../../common/validate';
import { AccountService } from '../business/account.service';
import { RegisterBody } from './register.body';

@Controller('/account')
export class AccountController {
  constructor(
    @inject('AccountService')
    private readonly accountService: AccountService,
  ) {}

  @Validate(RegisterBody)
  @Post('/register')
  public async register(req, res) {
    const { email, password } = req.body;

    await this.accountService.register(email, password);

    res.send({
      email,
      password,
    });
  }

  @Post('/login')
  public async login(req, res) {
    const { email, password } = req.body;

    const isLoggedIn = await this.accountService.login(email, password);

    if (isLoggedIn) {
      res.send('OK');
    } else {
      res.status(404).send('NO');
    }
  }
}
