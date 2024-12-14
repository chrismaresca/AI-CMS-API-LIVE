// Drizzle
import { drizzle } from "drizzle-orm/neon-http";

// Schema
import * as schema from "@/db/schema";

// Types
import { Article, CreateArticleRequest } from "@/types";

// Dotenv
import { config } from "dotenv";
config({ path: ".env.local" });

// Neon
import { neon } from "@neondatabase/serverless";

// Client
const client = neon(process.env.DATABASE_URL!);

// Drizzle
const neonDb = drizzle(client, { schema });

// =====================================================================================================
// =====================================================================================================
/**
 * Create a new article along with associated tags.
 * This function inserts a new article into the database and, if provided, 
 * associates the article with the specified tags by inserting entries 
 * into the articleTags table.
 *
 * @param {CreateArticleRequest} article - The article data to be created, 
 * which includes the article details and an array of tag IDs.
 * @returns {Promise<Article>} A promise that resolves to the created article.
 */
export async function createArticleWithTags(article: CreateArticleRequest): Promise<Article> {
  return await neonDb.transaction(async (tx) => {
    const [articleDoc] = await tx.insert(schema.articles).values(article).returning();

    if (article.tagIds.length > 0) {
      await tx.insert(schema.articleTags).values(article.tagIds.map((tagId) => ({ articleId: articleDoc.id, tagId })));
    }

    return articleDoc;
  });
}
