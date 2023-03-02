import { HttpMethod } from './http-method';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';

const validate =
  (bodyClass: ClassConstructor<object>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    const body = plainToInstance(bodyClass, req.body);
    try {
      await validateOrReject(body);
      next();
    } catch (err) {
      res.status(400).send(err);
    }
  };

export function Get(route: string) {
  return (_, __, descriptor: PropertyDescriptor) => {
    descriptor.value = [HttpMethod.GET, route, [descriptor.value]];
  };
}

export function Post(route: string, body?: ClassConstructor<object>) {
  return (_, __, descriptor: PropertyDescriptor) => {
    descriptor.value = [
      HttpMethod.POST,
      route,
      body ? [validate(body), descriptor.value] : [descriptor.value],
    ];
  };
}

export function Put(route: string, body?: ClassConstructor<object>) {
  return (_, __, descriptor: PropertyDescriptor) => {
    descriptor.value = [
      HttpMethod.POST,
      route,
      body ? [validate(body), descriptor.value] : [descriptor.value],
    ];
  };
}

export function Patch(route: string, body?: ClassConstructor<object>) {
  return (_, __, descriptor: PropertyDescriptor) => {
    descriptor.value = [
      HttpMethod.POST,
      route,
      body ? [validate(body), descriptor.value] : [descriptor.value],
    ];
  };
}

export function Delete(route: string) {
  return (_, __, descriptor: PropertyDescriptor) => {
    descriptor.value = [HttpMethod.DELETE, route, [descriptor.value]];
  };
}
