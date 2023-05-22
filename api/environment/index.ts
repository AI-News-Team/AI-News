import { config } from 'dotenv';

config({ path: './.env' });

type Primitive = string | number | boolean | symbol | bigint | undefined | null;
function assertVariable<T extends Primitive = string>(name: string) {
  const variable = process.env[name];
  if (!variable) throw new Error(`\`${name}\` is not defined`);
  return variable as T;
}

export const API_PORT = assertVariable<number>('API_PORT');

export const DATABASE_USER = assertVariable('DATABASE_USER');
export const DATABASE_PORT = assertVariable<number>('DATABASE_PORT');
export const DATABASE_NAME = assertVariable('DATABASE_NAME');
export const DATABASE_HOST = assertVariable('DATABASE_HOST');
export const DATABASE_PASSWORD = assertVariable('DATABASE_PASSWORD');

export const SEARCH_ENGINE_HOST = assertVariable('SEARCH_ENGINE_HOST');
export const SEARCH_ENGINE_PORT = assertVariable<number>('SEARCH_ENGINE_PORT');
