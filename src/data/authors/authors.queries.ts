// Drizzle
import { drizzle } from "drizzle-orm/neon-http";

// Schema
import * as schema from "@/db/schema";

// Types
import { Author } from "@/types/authors/author.types";

// Errors
import { ResourceNotFoundError } from "@/lib/errors";

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
// Main Queries
// =====================================================================================================
// =====================================================================================================

/**
 * Get all authors, with optional pagination.
 * @param {number} [page] - The page number (optional; if omitted, all authors are fetched).
 * @param {number} [limit] - The number of authors per page (optional; if omitted, all authors are fetched).
 * @returns {Promise<{ docs: Author[], total: number }>} All authors or paginated authors with total count.
 * @throws {ResourceNotFoundError} When no authors are found
 */
export async function findAllAuthors(page?: number, limit?: number): Promise<{ docs: Author[]; total: number }> {
  if (page == null || limit == null) {
    // Fetch all authors without pagination
    const [authorDocs, total] = await Promise.all([neonDb.select().from(schema.authors), neonDb.$count(schema.authors)]);
    
    if (!authorDocs.length) {
      throw new ResourceNotFoundError("No authors found");
    }
    
    return { docs: authorDocs, total: total || 0 };
  }

  // Fetch paginated authors
  const offset = (page - 1) * limit;
  const [authorDocs, total] = await Promise.all([
    neonDb.select().from(schema.authors).offset(offset).limit(limit),
    neonDb.$count(schema.authors)
  ]);

  if (!authorDocs.length) {
    throw new ResourceNotFoundError("No authors found for the specified page");
  }

  return { docs: authorDocs, total: total || 0 };
}
