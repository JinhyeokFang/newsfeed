import { config } from 'dotenv';
import configData from '../config';

class _Config {
  constructor(public readonly envs: Record<string, string>) {
    config();
  }

  get(key: string): string {
    return process.env[this.envs[key]];
  }
}

export const Config = new _Config(configData);
