import { Pool, createPool } from 'mysql2/promise';
import { config } from 'dotenv';

config();

export const Connection: Pool = createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
});
