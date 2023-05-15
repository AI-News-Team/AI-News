import { config } from 'dotenv';

config({ path: './.env' });

type Primitive = string | number | boolean | symbol | bigint | undefined | null;
function assertVariable<T extends Primitive = string>(name: string) {
  const variable = process.env[name];
  if (!variable) throw new Error(`\`${name}\` is not defined`);
  return variable as T;
}

// Express
export const EXPRESS_PORT = assertVariable<number>('EXPRESS_PORT');

// Database
export const DB_USER = assertVariable('DB_USER');
export const DB_PORT = assertVariable<number>('DB_PORT');
export const DB_NAME = assertVariable('DB_NAME');
export const DB_HOST = assertVariable('DB_HOST');
export const DB_PASSWORD = assertVariable('DB_PASSWORD');

// Search Engine
export const SEARCH_ENGINE_HOST = assertVariable('SEARCH_ENGINE_HOST');
export const SEARCH_ENGINE_PORT = assertVariable<number>('SEARCH_ENGINE_PORT');
