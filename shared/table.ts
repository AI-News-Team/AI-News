import { Result } from "./api";

export type Table = Document | Category;

/**
 * Defines a full article
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
 * Defines an article returned in a list query
 */
export type ListedArticle = Omit<Article, "body">;
export type ListedArticleResult = Result<ListedArticle>;

/**
 * Defines a raw article returned in a list of articles
 */
export type ArticleThumbnail = Omit<Article, "body">;
export type ArticleThumbnailResult = Result<Article>;

export type ArticleSummary = {
  [category: string]: Article[]; // some collection of arbitrary categories in the database
};
export type ArticleSummaryResult = Result<ArticleSummary>;

/**
 * A Category of article
 */
export type Category = {
  category: string;
  description: string;
};
export type CategoryResult = Result<Category>;
