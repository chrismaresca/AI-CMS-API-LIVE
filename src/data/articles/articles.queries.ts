// Drizzle
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

// Schema
import * as schema from "@/db/schema";

// Types
import { ArticlePayload } from "@/types/articles/article.types";

// Dotenv
import { config } from "dotenv";
config({ path: ".env.local" });

// Neon
import { neon } from "@neondatabase/serverless";
import { ResourceNotFoundError } from "@/lib/errors";

// Client
const client = neon(process.env.DATABASE_URL!);

// Drizzle
const neonDb = drizzle(client, { schema });

// =====================================================================================================
// =====================================================================================================
// Helper Queries
// =====================================================================================================
// =====================================================================================================

/**
 * Find article information by a specific field.
 * @param {keyof typeof schema.articles & keyof typeof schema.articles.$inferSelect} field - The field to search by.
 * @param {string} value - The value to search for.
 * @param {'first' | 'many'} mode - The query mode: 'first' for findFirst, 'many' for findMany.
 * @returns {Promise<ArticlePayload | ArticlePayload[] | null>} The article information if found, otherwise null.
 */
export async function findArticleInfo(
  field: keyof typeof schema.articles & keyof typeof schema.articles.$inferSelect,
  value: string,
  mode: "first" | "many" | "all" = "all"
): Promise<ArticlePayload | ArticlePayload[] | null> {
  if (mode === "first") {
    const result = await neonDb.query.articles.findFirst({
      where: eq(schema.articles[field], value),
      with: {
        author: {
          columns: {
            firstName: true,
            lastName: true,
            title: true,
            bio: true,
            location: true,
            dateCreated: true,
          },
        },
        tags: {
          with: {
            tag: {
              columns: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!result) throw new ResourceNotFoundError(`Article for ${field} ${value} not found`);

    return result;
  } else if (mode === "many") {
    const result = await neonDb.query.articles.findMany({
      where: eq(schema.articles[field], value),
      with: {
        author: {
          columns: {
            firstName: true,
            lastName: true,
            title: true,
            bio: true,
            location: true,
            dateCreated: true,
          },
        },
        tags: {
          with: {
            tag: {
              columns: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!result) throw new ResourceNotFoundError(`Articles for ${field} ${value} not found`);

    return result;
  } else {
    const result = await neonDb.query.articles.findMany({
      with: {
        author: {
          columns: {
            firstName: true,
            lastName: true,
            title: true,
            bio: true,
            location: true,
            dateCreated: true,
          },
        },
        tags: {
          with: {
            tag: {
              columns: {
                name: true,
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!result) throw new ResourceNotFoundError(`Articles for ${field} ${value} not found`);

    return result;
  }
}

// =====================================================================================================
// =====================================================================================================
// Main Queries
// =====================================================================================================
// =====================================================================================================

export async function findAllArticles(): Promise<ArticlePayload[]> {
  const result = await findArticleInfo("brandId", "all", "many");
  if (!result) throw new ResourceNotFoundError(`Articles not found`);

  return result as ArticlePayload[];
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get all articles by brand ID.
 * @param {string} brandId - The ID of the brand to filter articles by.
 * @returns {Promise<Article[]>} A list of articles associated with the specified brand ID.
 */
export async function findAllArticlesByBrandId(brandId: string): Promise<ArticlePayload[]> {
  const articleInfo = await findArticleInfo("brandId", brandId, "many");

  if (!articleInfo) throw new ResourceNotFoundError(`Articles for brand ${brandId} not found`);
  return articleInfo as ArticlePayload[];
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get article information by slug.
 * @param {string} slug - The slug of the article to retrieve.
 * @returns {Promise<ArticlePayload>} The article information.
 */
export async function findArticleBySlug(slug: string): Promise<ArticlePayload> {
  const articleInfo = await findArticleInfo("slug", slug, "first");
  if (!articleInfo) throw new ResourceNotFoundError(`Article for slug ${slug} not found`);

  return articleInfo as ArticlePayload;
}

// =====================================================================================================
// =====================================================================================================

/**
 * Get article information by ID.
 * @param {string} id - The ID of the article to retrieve.
 * @returns {Promise<ArticlePayload>} The article information.
 */
export async function findArticleById(id: string): Promise<ArticlePayload> {
  const articleInfo = await findArticleInfo("id", id, "first");

  if (!articleInfo) throw new ResourceNotFoundError(`Article for id ${id} not found`);

  return articleInfo as ArticlePayload;
}

// =====================================================================================================
// =====================================================================================================
