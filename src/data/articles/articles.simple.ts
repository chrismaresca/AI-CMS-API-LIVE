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

/**
 * Update an article by ID.
 * @param {string} articleId - The ID of the article to update.
 * @param {UpdateArticleRequest} updateData - The data to update the article with.
 * @returns {Promise<Article | null>} The updated article if found, otherwise null.
 */
export async function updateArticle(articleId: string, updateData: UpdateArticleRequest): Promise<Article | null> {

  console.log("updateData", updateData);
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
