import { injectable } from 'inversify';
import { Pool, createPool } from 'mysql2/promise';
import { Config } from '../config/config';

@injectable()
export class DataSource {
  private static connectionPool: Pool | null = null;

  createPool(): Pool {
    if (DataSource.connectionPool === null) {
      DataSource.connectionPool = createPool({
        host: Config.get('databaseHost'),
        user: Config.get('databaseUsername'),
        password: Config.get('databasePassword'),
        database: Config.get('databaseName'),
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
