import { AccountService } from './account/business/account.service';
import { AccountController } from './account/interface/account.controller';
import { AccountMysqlRepository } from './account/infrastructure/account.mysql.repository';

import { Event } from './common/event/event';
import { PostController } from './post/interface/post.controller';
import { PostService } from './post/business/post.service';
import { DataSource } from './common/database/database';

export default {
  AccountController,
  AccountService,
  AccountRepository: AccountMysqlRepository,

  EventEmitter: Event,

  PostController,
  PostService,

  DataSource,
};
