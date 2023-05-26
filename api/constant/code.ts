/**
 * Useful codes for the server
 * Cause enums are evil... in Typescript ;-)
 */

// Process
export const EXIT_SUCCESS = 0;
export const EXIT_ERROR = 1;

// REST
export const OK = 200;
export const CREATED = 201;
export const NO_CONTENT = 204;
export const BAD_REQUEST = 400;
export const UNAUTHORIZED = 401;
export const FORBIDDEN = 403;
export const NOT_FOUND = 404;
export const CONFLICT = 409;
export const IM_A_TEAPOT = 418;
export const INTERNAL_SERVER_ERROR = 500;

// Index
export const Codes = [
  OK,
  CREATED,
  NO_CONTENT,
  BAD_REQUEST,
  UNAUTHORIZED,
  FORBIDDEN,
  NOT_FOUND,
  CONFLICT,
  IM_A_TEAPOT,
  INTERNAL_SERVER_ERROR,
] as const;
export type Code = (typeof Codes)[number];
