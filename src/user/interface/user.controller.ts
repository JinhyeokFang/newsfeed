import { inject } from 'inversify';
import { Controller } from '../../common/framework/controller';
import { UserService } from '../business/user.service';

@Controller('/user')
export class UserController {
  constructor(
    @inject('UserService')
    private readonly userService: UserService,
  ) {}
}
