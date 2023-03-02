export function Intercept(interceptor: (req, res, next) => void) {
  return function (_, __, descriptor: PropertyDescriptor) {
    if (!Array.isArray(descriptor.value) || descriptor.value.length !== 3) {
      return;
    }
    if (!Array.isArray(descriptor.value[2])) {
      return;
    }
    descriptor.value = [
      descriptor.value[0],
      descriptor.value[1],
      [interceptor, ...descriptor.value[2]],
    ];
  };
}
