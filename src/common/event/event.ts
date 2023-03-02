import EventEmitter2 from 'eventemitter2';
import { injectable } from 'inversify';

@injectable()
export class Event {
  private static emitter = new EventEmitter2({
    wildcard: false,
    delimiter: '.',
    newListener: false,
    removeListener: false,
    maxListeners: 10,
    verboseMemoryLeak: false,
    ignoreErrors: false,
  });

  on(
    eventName: string,
    callback: (eventData: Record<string, unknown>) => void,
  ): void {
    Event.emitter.on(eventName, callback);
  }

  emit(eventName: string, eventData: Record<string, unknown>) {
    Event.emitter.emit(eventName, eventData);
  }
}
