// Drizzle
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";

// Schema
import * as schema from "@/db/schema";

// Types
import { Tag } from "@/types/tags/tag.types";

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
 * Get all tags for a specific brand.
 * @param {string} brandId - The ID of the brand to get tags for
 * @returns {Promise<{ docs: Tag[]; total: number }>} Tags associated with the brand and total count
 * @throws {ResourceNotFoundError} When no tags are found for the brand
 */
export async function findAllTagsByBrandId(brandId: string): Promise<{ docs: Tag[]; total: number }> {
  const [brandTags, total] = await Promise.all([
    neonDb.query.brandTags.findMany({
      where: eq(schema.brandTags.brandId, brandId),
      with: {
        tag: true
      }
    }),
    neonDb.$count(schema.brandTags)
  ]);

  if (!brandTags.length) {
    throw new ResourceNotFoundError(`No tags found for brand ${brandId}`);
  }

  const tags = brandTags.map(bt => bt.tag);
  return { docs: tags, total: total || 0 };
}
