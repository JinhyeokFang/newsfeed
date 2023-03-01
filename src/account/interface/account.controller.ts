import { inject } from 'inversify';
import { Controller } from '../../common/controller';
import { Post } from '../../common/route-function';
import { AccountService } from '../business/account.service';
import { LoginBody } from './login.body';
import { RegisterBody } from './register.body';

@Controller('/account')
export class AccountController {
  constructor(
    @inject('AccountService')
    private readonly accountService: AccountService,
  ) {}

  @Post('/register', RegisterBody)
  public async register(req, res) {
    const { email, password } = req.body;

    await this.accountService.register(email, password);

    res.send({
      email,
      password,
    });
  }

  @Post('/login', LoginBody)
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
