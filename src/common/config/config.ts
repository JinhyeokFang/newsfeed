import { config } from 'dotenv';

export class Config {
  constructor(public readonly envs: Record<string, string>) {
    config();
  }

  get(key: string): string {
    return process.env[this.envs[key]];
  }
}
