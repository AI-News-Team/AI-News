import { Result } from "./api";

export type Table = Document | User;

/**
 * Defines a raw document scrapped from news outlets
 */
export type Article = {
  id: number;
  name: string;
  author: string;
  body: string[];
  source_url: string;
  cover_url?: string;
  publication_date?: string | null;
};
export type DocumentResult = Result<Document>;

/**
 * A user account for the application
 */
export type User = {
  id: number;
  email: string;
  password: string;
  created_at: string;
  updated_at: string;
};
export type UserResult = Result<User>;
