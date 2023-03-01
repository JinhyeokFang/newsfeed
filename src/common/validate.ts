import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateOrReject } from 'class-validator';
import { NextFunction, Request, Response } from 'express';
import { Intercept } from './intercept-function';

export const Validate = (bodyClass: ClassConstructor<object>) =>
  Intercept(async (req: Request, res: Response, next: NextFunction) => {
    const body = plainToInstance(bodyClass, req.body);
    try {
      await validateOrReject(body);
      next();
    } catch (err) {
      res.status(400).send(err);
    }
  });
