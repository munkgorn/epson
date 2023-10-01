import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import _ from 'lodash';

// Load environment-specific configuration
dotenv.config({ path: process.env.CONFIG_ENV });

export async function connectDb() {
  const config = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'root',
    database: process.env.DB_NAME || 'epson_db',
  };

  const connection = await mysql.createConnection(config);

  return connection;
}
