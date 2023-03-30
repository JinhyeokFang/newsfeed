import { injectable } from 'inversify';
import { Pool, createPool } from 'mysql2/promise';
import { Config } from '../config/config';
import configData from '../../config';

@injectable()
export class DataSource {
  private static connectionPool: Pool | null = null;
  private config: Config = new Config(configData);

  createPool(): Pool {
    if (DataSource.connectionPool === null) {
      DataSource.connectionPool = createPool({
        host: this.config.get('databaseHost'),
        user: this.config.get('databaseUsername'),
        password: this.config.get('databasePassword'),
        database: this.config.get('databaseName'),
      });
    }
    return DataSource.connectionPool;
  }

  removePool() {
    if (DataSource.connectionPool) {
      DataSource.connectionPool.end();
      DataSource.connectionPool = null;
    }
  }
}
