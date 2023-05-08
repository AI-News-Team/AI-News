import { ListQueryParams, Order, orders } from '../../shared';

/**
 * Assert object keys have been provided in an expected order
 * @param keys keys that the user has provided to the server
 * @param schema ordered keys the server expects to process
 */
export function AssertKeySchema(keys: string[] | null | undefined, schema: readonly string[]) {
  const error = new Error(`provided keys '${keys?.join(' ')}' do not match the required '${schema.join(' ')}' schema!`);
  if (!keys || keys.join() !== schema.join()) throw error;
}

/**
 * Error thrown when a value is not of the expected type
 */
export class InvalidType extends Error {
  constructor(field: string, value: unknown, typename: string) {
    super(`Invalid \`${field}\`; \`${value}\` is not of type \`${typename}\``);
  }
}

const DEFAULT_ORDER = 'asc';

/**
 *
 * @param params params to extract
 * @param filterable values that can be filtered by
 * @param sortable values that can be sorted by
 * @returns typed and validated query params
 */
export function getListParams<T extends Record<string, unknown>>(
  params: Record<string, unknown>,
  filterable: (keyof T)[],
  sortable: (keyof T)[],
) {
  const query: ListQueryParams = {};
  const { filter, for: _for, sort } = params;

  if (filter) {
    if (typeof filter !== 'string') throw new InvalidType('filter', filter, 'string');
    if (!filterable.includes(filter)) throw new Error(`Cannot filter by \`${filter}\``);
    if (typeof _for !== 'string') throw new InvalidType('for', _for, 'string');

    query.filter = filter;
    query.for = _for;
  }

  if (sort) {
    if (typeof sort !== 'string') throw new InvalidType('filter', sort, 'string');
    if (!sortable.includes(sort)) throw new Error(`Cannot sort by \`${sort}\``);

    if (typeof params.order === 'string' && !orders.includes(params.order as Order))
      throw new InvalidType('order', params.order, 'asc | desc');
    const order = (params.order as Order) ?? DEFAULT_ORDER;

    query.sort = sort;
    query.order = order;
  }
  return query;
}
