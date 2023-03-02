import { AccountService } from './account/business/account.service';
import { AccountController } from './account/interface/account.controller';
import { AccountMysqlRepository } from './account/infrastructure/account.mysql.repository';

import { Event } from './common/event/event';

export default {
  AccountController,
  AccountService,
  AccountRepository: AccountMysqlRepository,

  EventEmitter: Event,
};
