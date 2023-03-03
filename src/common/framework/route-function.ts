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

export function Get(path: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
      key,
      {
        method: HttpMethod.GET,
        path,
        handlers: [descriptor.value],
      },
      target.constructor,
    );
  };
}

export function Post(path: string, body?: ClassConstructor<object>) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
      key,
      {
        method: HttpMethod.POST,
        path,
        handlers: body
          ? [validate(body), descriptor.value]
          : [descriptor.value],
      },
      target.constructor,
    );
  };
}

export function Put(path: string, body?: ClassConstructor<object>) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
      key,
      {
        method: HttpMethod.PUT,
        path,
        handlers: body
          ? [validate(body), descriptor.value]
          : [descriptor.value],
      },
      target.constructor,
    );
  };
}

export function Patch(path: string, body?: ClassConstructor<object>) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
      key,
      {
        method: HttpMethod.PATCH,
        path,
        handlers: body
          ? [validate(body), descriptor.value]
          : [descriptor.value],
      },
      target.constructor,
    );
  };
}

export function Delete(path: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    Reflect.defineMetadata(
      key,
      {
        method: HttpMethod.DELETE,
        path,
        handlers: [descriptor.value],
      },
      target.constructor,
    );
  };
}
