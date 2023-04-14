export function Intercept(interceptor: (req, res, next) => void) {
  return (target: any, key: string) => {
    const metadata = Reflect.getMetadata(key, target.constructor);
    if (metadata === undefined) {
      return;
    }

    metadata.handlers.unshift(interceptor);

    Reflect.defineMetadata(key, metadata, target.constructor);
  };
}
