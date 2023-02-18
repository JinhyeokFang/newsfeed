import { HttpMethod } from './http-method';

export function Get(route: string) {
  return function (_, __, descriptor: PropertyDescriptor) {
    descriptor.value = [HttpMethod.GET, route, descriptor.value];
  };
}

export function Post(route: string) {
  return function (_, __, descriptor: PropertyDescriptor) {
    descriptor.value = [HttpMethod.POST, route, descriptor.value];
  };
}

export function Put(route: string) {
  return function (_, __, descriptor: PropertyDescriptor) {
    descriptor.value = [HttpMethod.PUT, route, descriptor.value];
  };
}

export function Patch(route: string) {
  return function (_, __, descriptor: PropertyDescriptor) {
    descriptor.value = [HttpMethod.PATCH, route, descriptor.value];
  };
}

export function Delete(route: string) {
  return function (_, __, descriptor: PropertyDescriptor) {
    descriptor.value = [HttpMethod.DELETE, route, descriptor.value];
  };
}
