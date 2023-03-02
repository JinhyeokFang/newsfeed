export interface EventEmitter {
  on(
    eventName: string,
    callback: (eventData: Record<string, unknown>) => void,
  ): void;
  emit(eventName: string, eventData: Record<string, unknown>): void;
}
