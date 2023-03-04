import { inject, injectable } from 'inversify';
import { EventEmitter } from '../../common/event/event-emitter';

@injectable()
export class PostService {
  constructor(
    @inject('EventEmitter')
    private readonly eventEmitter: EventEmitter,
  ) {
    this.eventEmitter.on('accountRegistered', this.onAccountRegistered);
  }

  private onAccountRegistered(event: Record<string, unknown>) {
    console.log(`${JSON.stringify(event)}, wow`);
  }
}
