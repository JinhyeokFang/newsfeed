export const Controller = (route: string) => (target: any) => {
  target.prototype.basePath = route;
};
