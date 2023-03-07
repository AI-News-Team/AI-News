export type Document = {
	id: number;
	name: string;
	body: object; // todo: type me!
	created_at: string;
	updated_at: string;
};
export type DocumentResult = Result<Document>;

export type ResultError = {
	message: string;
	type: string; // todo: type me!
};

export type User = {
	id: number;
	email: string;
	password: string;
	created_at: string;
	updated_at: string;
};
export type UserResult = Result<User>;

export type Result<T extends Table> = {
	data: T[];
	error: ResultError | null;
	success: boolean;
};

export type Table = Document | User;
