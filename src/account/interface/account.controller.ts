import { inject } from 'inversify';
import { Controller } from '../../common/framework/controller';
import { Get, Patch, Post } from '../../common/framework/route-function';
import { AccountService } from '../business/account.service';
import { UserId } from '../domain/user-id';
import { LoginBody } from './login.body';
import { RegisterBody } from './register.body';
import { FollowBody } from './follow.body';

@Controller('/account')
export class AccountController {
  constructor(
    @inject('AccountService')
    private readonly accountService: AccountService,
  ) {}

  @Post('/register', RegisterBody)
  public async register(req, res) {
    const { email, password, name } = req.body;

    await this.accountService.register(email, password, name);

    const account = await this.accountService.getAccount(email);

    res.send({
      email,
      password,
      name,
      id: account.id.toString(),
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

  @Get('/:email')
  public async getAccount(req, res) {
    const { email } = req.params;

    res.send(await this.accountService.getAccount(email));
  }

  @Patch('/follow', FollowBody)
  public async follow(req, res) {
    const { follower, following } = req.body;

    try {
      await this.accountService.follow(
        new UserId(follower),
        new UserId(following),
      );
      res.send('OK');
    } catch (err) {
      res.status(403).send('Forbidden');
    }
  }
}
