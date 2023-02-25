import { config } from 'dotenv';

class _Config {
  constructor(public readonly envs: Record<string, string>) {
    config();
  }

  get(key: string): string {
    return process.env[this.envs[key]];
  }
}

export const Config = new _Config({
  databaseHost: 'DATABASE_HOST',
  databasePassword: 'DATABASE_PASSWORD',
  databaseUsername: 'DATABASE_USER',
  databaseName: 'DATABASE_NAME',
});
