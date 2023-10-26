import { Result } from "./api";

export type Table = Article | Category;

/**
 * A full article scrapped from the web
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
export type ArticleResult = Result<Article>;

/**
 * An article returned in a list query
 */
export type ListedArticle = Omit<Article, "body">;
export type ListedArticleResult = Result<ListedArticle>;

/**
 * Summary of the latest articles in each category
 */
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
