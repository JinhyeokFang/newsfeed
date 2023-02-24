import { AccountInmemoryRepository } from './account/infrastructure/account.inmemory.repository';
import { AccountService } from './account/business/account.service';
import { AccountController } from './account/interface/account.controller';

export default {
  AccountController,
  AccountService,
  AccountRepository: AccountInmemoryRepository,
};
