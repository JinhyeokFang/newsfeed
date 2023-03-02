import { Pool, createPool } from 'mysql2/promise';
import { Config } from '../config/config';

export const Connection: Pool = createPool({
  host: Config.get('databaseHost'),
  user: Config.get('databaseUsername'),
  password: Config.get('databasePassword'),
  database: Config.get('databaseName'),
});
