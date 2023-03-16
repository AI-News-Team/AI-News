import { Result } from "./api";
import { Category, Categories } from './category';

export type Table = Document | User;

/**
 * Defines a raw document scrapped from news outlets
 */
export type Article = {
  id: number;
  name: string;
  author: string;
  category: Category;
  body: string[];
  source_url: string;
  cover_url?: string;
  publication_date?: string | null;
};
export type DocumentResult = Result<Document>;

export type ArticleSummary = {
  top_stories: Article[];
} & {
  [key in Category]: Article[];
}
export type ArticleSummaryResult = Result<ArticleSummary>;

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
