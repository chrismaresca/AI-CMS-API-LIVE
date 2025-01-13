// Drizzle
// import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";

// Schema
import * as schema from "@/db/schema";

// Types
import { Article, CreateArticleRequest } from "@/types";

// Dotenv
import { config } from "dotenv";
config({ path: ".env.local" });

// Neon
import { Pool } from "@neondatabase/serverless";
import { CreateResourceFailed } from "@/lib/errors";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzleServerless({ client: pool });

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
  return await db.transaction(async (tx) => {
    // If no article tags are provided, throw an error
    if (!article.tagIds || article.tagIds.length === 0) {
      throw new CreateResourceFailed("Article must include at least one tag");
    }

    const [articleDoc] = await tx.insert(schema.articles).values(article).returning();

    await tx.insert(schema.articleTags).values(
      article.tagIds.map((tagId) => ({
        articleId: articleDoc.id,
        tagId,
        brandId: article.brandId,
      }))
    );

    return articleDoc;
  });
}
