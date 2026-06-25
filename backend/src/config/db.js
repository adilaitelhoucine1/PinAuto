import pg from 'pg';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const { Pool } = pg;

const pool = new Pool({
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT, 10) || 5432,
  user: process.env.POSTGRES_USER || 'postgres',
  password: process.env.POSTGRES_PASSWORD || 'postgres',
  database: process.env.POSTGRES_DB || 'pinterest_manager',
});

/**
 * Execute an arbitrary SQL query against the connection pool.
 * @param {string} text  - SQL statement (may include $1, $2… placeholders).
 * @param {any[]}  params - Positional parameter values.
 * @returns {Promise<import('pg').QueryResult>}
 */
export function query(text, params) {
  return pool.query(text, params);
}

/**
 * Reads the schema.sql file and executes it to bootstrap the database tables.
 * Called once at application startup.
 */
export async function initializeDatabase() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const schemaPath = path.join(__dirname, '..', 'models', 'schema.sql');
    const schema = await fs.readFile(schemaPath, 'utf-8');

    await pool.query(schema);
    console.log('[DB] Database schema initialized successfully.');
  } catch (err) {
    console.error('[DB] Failed to initialize database:', err.message);
    throw err;
  }
}
