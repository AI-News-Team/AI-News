import { Result } from "./api";
import { Category, Categories } from "./category";

export type Table = Document | User;

/**
 * Defines a full article returned from the API
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
export type ArticleResult = Result<Article>;

/**
 * Defines a raw article returned in a list of articles
 */
export type ArticleThumbnail = Omit<Article, "body">;
export type ArticleThumbnailResult = Result<Article>;

export type ArticleSummary = {
  top_stories: Article[];
} & {
  [key in Category]: Article[];
};
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
