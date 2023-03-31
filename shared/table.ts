import { Result } from "./api";

export type Table = Document | Category;

/**
 * Defines a full article returned from the API
 */
export type Article = {
  id: number;
  name: string;
  author: string;
  category: string;
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
  [category: string]: Article[]; // some collection of arbitrary categories in the database
};
export type ArticleSummaryResult = Result<ArticleSummary>;

/**
 * A user account for the application
 */
export type Category = {
  category: string;
  description: string;
};
export type CategoryResult = Result<Category>;
