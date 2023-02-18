import { Controller } from '../../common/controller';
import { Get } from '../../common/route-function';

export class AccountController extends Controller {
  public basePath = '*';

  @Get('/')
  public async registerNewAccount(req, res) {
    res.send('Hello World!');
  }
}
