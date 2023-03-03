import { injectable } from 'inversify';
import { EventEmitter } from '../../common/event/event-emitter';

@injectable()
export class PostService {
  constructor(private readonly eventEmitter: EventEmitter) {
    this.eventEmitter.on('accountRegistered', (account) => {
      console.log('wow');
      console.dir(account);
    });
  }
}
