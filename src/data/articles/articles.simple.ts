// =====================================================================================================
// =====================================================================================================
// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { articles } from "@/db/schema";

// Types
import { Article, CreateArticleRequest, UpdateArticleRequest } from "@/types";

// =====================================================================================================
// =====================================================================================================
// Main CRUD Operations
// =====================================================================================================
// =====================================================================================================

/**
 * Create a new article.
 * @param {CreateArticleRequest} articleData - The data of the article to create.
 * @returns {Promise<Article>} The created article.
 */
export async function createArticle(articleData: CreateArticleRequest): Promise<Article> {
  const [newArticle] = await db.insert(articles).values(articleData).returning();
  return newArticle;
}
// =====================================================================================================
// =====================================================================================================

// TODO: update to
// /**
//  * Get an article by ID.
//  * @param {string} articleId - The ID of the article to retrieve.
//  * @returns {Promise<Article | null>} The article if found, otherwise null.
//  */
// export async function findArticleById(articleId: string): Promise<Article | null> {
//   const article = await db.select().from(articles).where(eq(articles.id, articleId));
//   return article[0] || null;
// }
// =====================================================================================================
// =====================================================================================================

// /**
//  * Get all articles, with optional pagination.
//  * @param {number} [page] - The page number (optional; if omitted, all articles are fetched).
//  * @param {number} [limit] - The number of articles per page (optional; if omitted, all articles are fetched).
//  * @returns {Promise<{ docs: Article[], total: number }>} All articles or paginated articles with total count.
//  */
// export async function findAllArticles(page?: number, limit?: number): Promise<{ docs: Article[]; total: number }> {
//   if (page == null || limit == null) {
//     // Fetch all articles without pagination
//     const [articleDocs, total] = await Promise.all([db.select().from(articles), db.$count(articles)]);
//     return { docs: articleDocs, total: total || 0 };
//   }

//   // Fetch paginated articles
//   const offset = (page - 1) * limit;
//   const [articleDocs, total] = await Promise.all([db.select().from(articles).offset(offset).limit(limit), db.$count(articles)]);
//   return { docs: articleDocs, total: total || 0 };
// }

// =====================================================================================================
// =====================================================================================================

/**
 * Update an article by ID.
 * @param {string} articleId - The ID of the article to update.
 * @param {UpdateArticleRequest} updateData - The data to update the article with.
 * @returns {Promise<Article | null>} The updated article if found, otherwise null.
 */
export async function updateArticle(articleId: string, updateData: UpdateArticleRequest): Promise<Article | null> {
  const [updatedArticle] = await db.update(articles).set(updateData).where(eq(articles.id, articleId)).returning();
  return updatedArticle || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Delete an article by ID.
 * @param {string} articleId - The ID of the article to delete.
 * @returns {Promise<boolean>} True if the article was deleted, otherwise false.
 */
export async function deleteArticle(articleId: string): Promise<boolean> {
  const deletedArticle = await db.delete(articles).where(eq(articles.id, articleId)).returning();
  return deletedArticle.length > 0;
}
// =================================================================================
// =================================================================================
// Additional Retrieval Functions
// =================================================================================
// =================================================================================

/**
 * Count the total number of articles.
 * @returns {Promise<number>} The total number of articles.
 */
export async function countArticles(): Promise<number> {
  return db.$count(articles) || 0;
}

// =================================================================================
