import context from '../context';
import { Container as InversifyContainer } from 'inversify';

class _Container {
  private container = new InversifyContainer();

  constructor() {
    this.register(context);
  }

  register(context: Record<string, any>) {
    Object.keys(context).forEach((key) => {
      this.bind(key, context[key]);
    }, this);
  }

  private bind<T>(
    identifier: string,
    implementation: new (...args: never[]) => T,
  ) {
    this.container.bind<T>(identifier).to(implementation);
  }

  get<T>(identifier: string): T {
    return this.container.get<T>(identifier);
  }
}

export const Container = new _Container();
