import { Router, Request, Response } from 'express';
import { Method, Result, Table, timestamp, ResultError } from '../../shared';
import { Code, OK, INTERNAL_SERVER_ERROR } from '../constant/code';

import Core from 'express';
type ExpressInstance = Core.Express;

type Operation = {
  method: Method;
  handler: (req: Request, res: Response) => void;
  pathParams?: string[];
  queryParams?: string[];
};
type Operations = Record<string, Operation>;

/**
 * Creates a router with the operations to be used by the server
 * @param namespace for the routes
 * @param operations within the router
 * @returns an express router
 */
export default function createRouter(namespace: string = '', operations: Operations) {
  return Object.entries(operations).reduce((router, [operation, { method, handler, pathParams }]) => {
    router[method](`/${namespace}.${operation}${pathParams ? '/:' + pathParams.join('/:') : ''}`, (req, res) => {
      try {
        handler(req, res);
      } catch (error) {
        // handle the unhandled errors
        return Error(res, INTERNAL_SERVER_ERROR, {
          message: (error as any).message || 'An unknown error occurred',
          type: 'UnhandledError',
        });
      }
    });
    return router;
  }, Router());
}
export function useRouter(instance: ExpressInstance, namespace: string = '/', router: Router) {
  instance.use('/', router);
}

function createResponse<T>(res: Response, code: Code, result: Result<T>) {
  res.status(code).json(result);
}

/**
 * Binds a successful result of `T` to some response
 * @param res response to bind
 * @param data data to respond with
 */
export function Success<T>(res: Response, data: T | null = null) {
  const result: Result<T> = {
    data,
    error: null,
    success: true,
  };
  createResponse(res, OK, result);
}

/**
 * Binds an error to some response of `unknown`
 * @param res response to bind
 * @param code status code to respond with
 * @param error error to respond with
 */
export function Error(res: Response, code: Code, error: ResultError) {
  console.error(`[${timestamp()}] ${error.message}`);
  const result: Result<unknown> = {
    data: null,
    error,
    success: false,
  };
  createResponse(res, code, result);
}
