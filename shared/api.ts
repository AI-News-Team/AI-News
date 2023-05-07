export type Method = "get" | "post" | "put" | "delete";

/**
 * defines the types of errors that can be returned from the query
 * (more to come)
 */
export type ErrorType =
  | "QueryError" // Your query is malformed or invalid
  | "ServerError" // Something went wrong on the server
  | "DatabaseError" // Not your fault
  | "UnhandledError"; // An unknown error occurred

/**
 * Defines an error returned from the query
 */
export type ResultError = {
  message: string;
  type: ErrorType;
};

/**
 * Defines the possible orders of a query
 */
export const orders = ["asc", "desc"] as const;

/**
 * Defines an order
 */
export type Order = (typeof orders)[number];

/**
 * Defines the parameters of some list|get query
 */
export type ListQueryParams = {
  filter?: string;
  for?: string;
  sort?: string;
  order?: Order;
};

/**
 * Defines the result of a query of `T`
 * @param T the unconstrained type of a query
 */
export type Result<T> = {
  data: T | null;
  error: ResultError | null;
  success: boolean;
};
