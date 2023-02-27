import 'reflect-metadata';
import { json, urlencoded } from 'express';
import { AccountController } from './account/interface/account.controller';
import { Server } from './common/server';

const server = new Server([json(), urlencoded({ extended: true })]);
const port = 8080;
server.injectController([AccountController]);
server.start(port, () => {
  console.log(`Run application at ${port} port`);
});
