import { Router } from 'express';
import { Controller } from './controller';
import * as express from 'express';

export class Server {
  private expressApp = express();
  private baseRouter: Router;

  private addControllerToRouter(controller: typeof Controller) {
    const router = Router();
    const prototype = controller.prototype;
    Object.getOwnPropertyNames(prototype)
      .filter((property) => Array.isArray(new controller()[property]))
      .forEach((property) => {
        const method = new controller()[property][0];
        const path = new controller()[property][1];
        const handler = new controller()[property][2];
        router[method](path, handler);
      });
    this.baseRouter.use(new controller().basePath, router);
  }

  injectController(controllers: (typeof Controller)[]) {
    this.baseRouter = Router();
    controllers.forEach(this.addControllerToRouter, this);
    this.expressApp.use(this.baseRouter);
  }

  get app() {
    return this.expressApp;
  }

  start(port: number, callback: () => void) {
    this.expressApp.listen(port, callback);
  }
}
