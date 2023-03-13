export function AssertKeySchema(keys: string[] | null | undefined, schema: readonly string[]) {
	const error = new Error(`provided keys '${keys?.join(' ')}' do not match the required '${schema.join(' ')}' schema!`);
	if (!keys || keys.join() !== schema.join()) throw error;
}
