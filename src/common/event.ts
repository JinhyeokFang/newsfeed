import EventEmitter2 from 'eventemitter2';

export const Event = new EventEmitter2({
  wildcard: false,
  delimiter: '.',
  newListener: false,
  removeListener: false,
  maxListeners: 10,
  verboseMemoryLeak: false,
  ignoreErrors: false,
});
