import { Pool } from 'pg';

export const pool = new Pool({
  connectionString: process.env.NEXT_PUBLIC_DATABASE_URL,
  ssl: true
});