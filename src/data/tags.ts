// =====================================================================================================
// =====================================================================================================
// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { tags } from "@/db/schema";

// Types
import { Tag, CreateTagRequest, UpdateTagRequest } from "@/types";

// =====================================================================================================
// =====================================================================================================
// Main CRUD Operations
// =====================================================================================================
// =====================================================================================================

/**
 * Create a new tag.
 * @param {CreateTagRequest} tagData - The data of the tag to create.
 * @returns {Promise<Tag>} The created tag.
 */
export async function createTag(tagData: CreateTagRequest): Promise<Tag> {
  const [newTag] = await db.insert(tags).values(tagData).returning();
  return newTag;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get a tag by ID.
 * @param {string} tagId - The ID of the tag to retrieve.
 * @returns {Promise<Tag | null>} The tag if found, otherwise null.
 */
export async function findTagById(tagId: string): Promise<Tag | null> {
  const tag = await db.select().from(tags).where(eq(tags.id, tagId));
  return tag[0] || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get all tags, with optional pagination.
 * @param {number} [page] - The page number (optional; if omitted, all tags are fetched).
 * @param {number} [limit] - The number of tags per page (optional; if omitted, all tags are fetched).
 * @returns {Promise<{ docs: Tag[], total: number }>} All tags or paginated tags with total count.
 */
export async function findAllTags(page?: number, limit?: number): Promise<{ docs: Tag[]; total: number }> {
  if (page == null || limit == null) {
    // Fetch all tags without pagination
    const [tagDocs, total] = await Promise.all([db.select().from(tags), db.$count(tags)]);
    return { docs: tagDocs, total: total || 0 };
  }

  // Fetch paginated tags
  const offset = (page - 1) * limit;
  const [tagDocs, total] = await Promise.all([db.select().from(tags).offset(offset).limit(limit), db.$count(tags)]);
  return { docs: tagDocs, total: total || 0 };
}
// =====================================================================================================
// =====================================================================================================

/**
 * Update a tag by ID.
 * @param {string} tagId - The ID of the tag to update.
 * @param {UpdateTagRequest} updateData - The data to update the tag with.
 * @returns {Promise<Tag | null>} The updated tag if found, otherwise null.
 */
export async function updateTag(tagId: string, updateData: UpdateTagRequest): Promise<Tag | null> {
  const [updatedTag] = await db.update(tags).set(updateData).where(eq(tags.id, tagId)).returning();
  return updatedTag || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Delete a tag by ID.
 * @param {string} tagId - The ID of the tag to delete.
 * @returns {Promise<boolean>} True if the tag was deleted, otherwise false.
 */
export async function deleteTag(tagId: string): Promise<boolean> {
  const deletedTag = await db.delete(tags).where(eq(tags.id, tagId)).returning();
  return deletedTag.length > 0;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Count the total number of tags.
 * @returns {Promise<number>} The total number of tags.
 */
export async function countTags(): Promise<number> {
  return db.$count(tags) || 0;
}
// =====================================================================================================
// =====================================================================================================