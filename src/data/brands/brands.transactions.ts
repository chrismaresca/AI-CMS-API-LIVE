// Drizzle
// import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";

// Schema
import * as schema from "@/db/schema";

// Types
import { Brand, CreateBrandWithTagsRequest, Tag } from "@/types";

// Dotenv
import { config } from "dotenv";
config({ path: ".env.local" });

// Neon
import { Pool } from "@neondatabase/serverless";
// import { CreateResourceFailed } from "@/lib/errors";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const db = drizzleServerless({ client: pool });

// =====================================================================================================
// =====================================================================================================

/**
 * Create a new brand along with optional associated tags.
 * This function inserts a new brand into the database and, if provided,
 * associates the brand with the specified tags by inserting entries
 * into the brandTags table.
 *
 * @param {CreateBrandWithTagsRequest} brand - The brand data to be created,
 * which includes the brand details and an optional array of tags to create.
 * @returns {Promise<Brand>} A promise that resolves to the created brand.
 */
export async function createBrandWithTags(brand: CreateBrandWithTagsRequest): Promise<Brand> {
  return await db.transaction(async (tx) => {
    // Extract createdTags from brand object to avoid inserting it into brands table
    const { createdTags, ...brandData } = brand;

    // Create the brand first
    const [brandDoc] = await tx.insert(schema.brands).values(brandData).returning();


    // If createdTags are provided, create the tags and brand-tag associations
    if (createdTags && createdTags.length > 0) {


      // Create the tags first
      const tagDocs: Tag[] = [];
      for (const tag of createdTags) {
        const [tagDoc] = await tx.insert(schema.tags).values(tag).returning();
        tagDocs.push(tagDoc);
      }

      // Create the brand-tag associations
      await tx.insert(schema.brandTags).values(
        tagDocs.map((tag) => ({
          brandId: brandDoc.id,
          tagId: tag.id,
        }))
      );
    }

    return brandDoc;
  });
}
