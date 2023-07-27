import { config } from 'dotenv';

config({ path: '../local.env' }); // todo: refactor this to check for containerized builds, in which case we should use the `virtual.env` file

type Primitive = string | number | boolean | symbol | bigint | undefined | null;
function assertVariable<T extends Primitive = string>(name: string) {
  const variable = process.env[name];
  if (!variable) throw new Error(`\`${name}\` is not defined`);
  return variable as T;
}

export const DATABASE_HOST = assertVariable('DATABASE_HOST');
export const DATABASE_PORT = assertVariable<number>('DATABASE_PORT');

export const DATABASE_NAME = assertVariable('POSTGRES_DB');
export const DATABASE_USER = assertVariable('POSTGRES_USER');
export const DATABASE_PASSWORD = assertVariable('POSTGRES_PASSWORD');

export const API_PORT = assertVariable<number>('API_PORT');

export const SEARCH_ENGINE_HOST = assertVariable('SEARCH_HOST');
export const SEARCH_ENGINE_PORT = assertVariable<number>('SEARCH_PORT');
