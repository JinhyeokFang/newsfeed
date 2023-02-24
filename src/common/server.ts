import { Router } from 'express';
import * as express from 'express';
import { Container } from './container';

export class Server {
  private expressApp = express();
  private baseRouter: Router;

  constructor() {
    this.expressApp.use(express.urlencoded({ extended: false }));
    this.expressApp.use(express.json());
  }

  private addControllerToRouter(controller: any) {
    const router = Router();
    const prototype = controller.prototype;
    const controllerInstance = Container.get(controller.name) as {
      basePath?: string;
    };

    if (controllerInstance.basePath === undefined) {
      throw new Error(`${controller.name} is not a Controller`);
    }

    Object.getOwnPropertyNames(prototype)
      .filter((property) => Array.isArray(controllerInstance[property]))
      .forEach((property) => {
        const method = controllerInstance[property][0];
        const path = controllerInstance[property][1];
        const handler = controllerInstance[property][2];
        router[method](path, handler.bind(controllerInstance));
      });
    this.baseRouter.use(controllerInstance.basePath, router);
  }

  injectController(controllers: any[]) {
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
