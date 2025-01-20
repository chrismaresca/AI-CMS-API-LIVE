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
 * Finds article information by a specific field.
 *
 * @param field - The field of the article to match.
 * @param value - The value to match for the specified field. If `null`, all articles are returned.
 * @param mode - The query mode:
 *   - "all": returns all articles (ignores `field` and `value` if `value` is `null`).
 *   - "first": returns the first matching article.
 *   - "many": returns all matching articles.
 * @returns The requested article(s). Throws a ResourceNotFoundError if none are found.
 */
export async function findArticle(
  field: keyof typeof schema.articles.$inferSelect,
  value: string | null,
  mode: "first" | "many" | "all" = "all"
): Promise<ArticlePayload | ArticlePayload[] | null> {
  const articleRelations = {
    author: {
      columns: {
        firstName: true,
        lastName: true,
        title: true,
        bio: true,
        isHuman: true,
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
  };

  // If value is null or mode is "all", return all articles
  if (value === null || mode === "all") {
    const allArticles = await neonDb.query.articles.findMany({ with: articleRelations });
    // if (!allArticles.length) throw new ResourceNotFoundError("No articles found");
    return allArticles as unknown as ArticlePayload[];
  }

  // Otherwise, we have a specific value, so apply a WHERE clause
  const whereClause = eq(schema.articles[field], value);

  if (mode === "first") {
    const article = await neonDb.query.articles.findFirst({ where: whereClause, with: articleRelations });
    if (!article) throw new ResourceNotFoundError(`Article not found for ${String(field)} = ${value}`);
    return article as unknown as ArticlePayload;
  }

  if (mode === "many") {
    const articles = await neonDb.query.articles.findMany({ where: whereClause, with: articleRelations });
    if (!articles.length) throw new ResourceNotFoundError(`No articles found for ${String(field)} = ${value}`);
    return articles as unknown as ArticlePayload[];
  }

  // If none of the above conditions match, return null
  return null;
}

// =====================================================================================================
// =====================================================================================================
// Main Queries
// =====================================================================================================
// =====================================================================================================

export async function findAllArticles(): Promise<ArticlePayload[]> {
  const result = await findArticle("brandId", null, "many");
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
  const articleInfo = await findArticle("brandId", brandId, "many");
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
  const articleInfo = await findArticle("slug", slug, "first");
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
  const articleInfo = await findArticle("id", id, "first");

  if (!articleInfo) throw new ResourceNotFoundError(`Article for id ${id} not found`);

  return articleInfo as ArticlePayload;
}

// =====================================================================================================
// =====================================================================================================
