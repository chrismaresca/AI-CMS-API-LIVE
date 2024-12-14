// =====================================================================================================
// =====================================================================================================
// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { brands } from "@/db/schema";

// Types
import { Brand, CreateBrandRequest, UpdateBrandRequest } from "@/types";

// =====================================================================================================
// =====================================================================================================
// Main CRUD Operations
// =====================================================================================================
// =====================================================================================================

/**
 * Create a new brand.
 * @param {CreateBrandRequest} brandData - The data of the brand to create.
 * @returns {Promise<Brand>} The created brand.
 */
export async function createBrand(brandData: CreateBrandRequest): Promise<Brand> {
  const [newBrand] = await db.insert(brands).values(brandData).returning();
  return newBrand;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get a brand by ID.
 * @param {string} brandId - The ID of the brand to retrieve.
 * @returns {Promise<Brand | null>} The brand if found, otherwise null.
 */
export async function findBrandById(brandId: string): Promise<Brand | null> {
  const brand = await db.select().from(brands).where(eq(brands.id, brandId));
  return brand[0] || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get all brands, with optional pagination.
 * @param {number} [page] - The page number (optional; if omitted, all brands are fetched).
 * @param {number} [limit] - The number of brands per page (optional; if omitted, all brands are fetched).
 * @returns {Promise<{ docs: Brand[], total: number }>} All brands or paginated brands with total count.
 */
export async function findAllBrands(page?: number, limit?: number): Promise<{ docs: Brand[]; total: number }> {
  if (page == null || limit == null) {
    // Fetch all brands without pagination
    const [brandDocs, total] = await Promise.all([db.select().from(brands), db.$count(brands)]);
    return { docs: brandDocs, total: total || 0 };
  }

  // Fetch paginated brands
  const offset = (page - 1) * limit;
  const [brandDocs, total] = await Promise.all([db.select().from(brands).offset(offset).limit(limit), db.$count(brands)]);
  return { docs: brandDocs, total: total || 0 };
}
// =====================================================================================================
// =====================================================================================================

/**
 * Update a brand by ID.
 * @param {string} brandId - The ID of the brand to update.
 * @param {UpdateBrandRequest} updateData - The data to update the brand with.
 * @returns {Promise<Brand | null>} The updated brand if found, otherwise null.
 */
export async function updateBrand(brandId: string, updateData: UpdateBrandRequest): Promise<Brand | null> {
  const [updatedBrand] = await db.update(brands).set(updateData).where(eq(brands.id, brandId)).returning();
  return updatedBrand || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Delete a brand by ID.
 * @param {string} brandId - The ID of the brand to delete.
 * @returns {Promise<boolean>} True if the brand was deleted, otherwise false.
 */
export async function deleteBrand(brandId: string): Promise<boolean> {
  const deletedBrand = await db.delete(brands).where(eq(brands.id, brandId)).returning();
  return deletedBrand.length > 0;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Count the total number of brands.
 * @returns {Promise<number>} The total number of brands.
 */
export async function countBrands(): Promise<number> {
  return db.$count(brands) || 0;
}
// =====================================================================================================
// =====================================================================================================