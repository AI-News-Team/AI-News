import { Result } from "./api";

/**
 * A table in the database
 * 
 * @type {("Article" | "Category")} Table
 * @property {Object} Article The article table
 * @property {Object} Category The category table
 */
export type Table = Article | Category;

/**
 * A full article scrapped from the web
 * 
 * @type {Object} Article
 */
export type Article = {
  id: number;
  name: string | null;
  author: string;
  category: string;
  body: string[];
  source_url: string;
  cover_url: string | null;
  retrieved_date: string;
  publication_date: string | null;
  image_gen: boolean;
};

/**
 * A type that represents the result of a full article query
 * @type {Object} Category
 */
export type ArticleResult = Result<Article>;

/**
 * A type that defines an article returned in a list query, omitting the body property
 */
export type ListedArticle = Omit<Article, "body">;

/**
 * A type that represents the result of a listed article query
 */
export type ListedArticleResult = Result<ListedArticle>;

/**
 *  Summary of the latest articles in each category
 * 
 *  @type {Object} ArticleSummary
 */
export type ArticleSummary = {
  [category: string]: Article[]; // some collection of arbitrary categories in the database
};

/**
 * A type that represents the result of an article summary query
 * 
 * @type {Object} ArticleSummaryResult
 */
export type ArticleSummaryResult = Result<ArticleSummary>;

/**
 *  A type that defines a category of articles
 */
export type Category = {
  category: string;
  description: string;
};

/**
 * A type that represents the result of a category query
 */
export type CategoryResult = Result<Category>;
