import { injectable } from 'inversify';

export const Controller = (route: string) => (target: any) => {
  target.prototype.basePath = route;
  injectable()(target);
};
