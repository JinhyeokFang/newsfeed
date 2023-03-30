import { injectable } from 'inversify';
import { EventEmitter } from './event-emitter';

@injectable()
export class Event implements EventEmitter {
  private static listeners: Record<string, ((...unknown) => void)[]> = {};

  on(
    eventName: string,
    callback: (eventData: Record<string, unknown>) => void,
  ): void {
    if (Event.listeners[eventName] === undefined) {
      Event.listeners[eventName] = [];
    }

    Event.listeners[eventName].push(callback);
  }

  emit(eventName: string, eventData: Record<string, unknown>) {
    if (Event.listeners[eventName] !== undefined) {
      Event.listeners[eventName].forEach((listener) => listener(eventData));
    }
  }
}
