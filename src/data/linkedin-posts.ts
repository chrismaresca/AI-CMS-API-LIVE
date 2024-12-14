// =====================================================================================================
// =====================================================================================================
// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { linkedInPosts } from "@/db/schema";

// Types
import { LinkedInPost, CreateLinkedInPostRequest, UpdateLinkedInPostRequest } from "@/types";

// =====================================================================================================
// =====================================================================================================
// Main CRUD Operations
// =====================================================================================================
// =====================================================================================================

/**
 * Create a new LinkedIn post.
 * @param {CreateLinkedInPostRequest} postData - The data of the LinkedIn post to create.
 * @returns {Promise<LinkedInPost>} The created LinkedIn post.
 */
export async function createLinkedInPost(postData: CreateLinkedInPostRequest): Promise<LinkedInPost> {
  const [newPost] = await db.insert(linkedInPosts).values(postData).returning();
  return newPost;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get a LinkedIn post by ID.
 * @param {string} postId - The ID of the LinkedIn post to retrieve.
 * @returns {Promise<LinkedInPost | null>} The LinkedIn post if found, otherwise null.
 */
export async function findLinkedInPostById(postId: string): Promise<LinkedInPost | null> {
  const post = await db.select().from(linkedInPosts).where(eq(linkedInPosts.id, postId));
  return post[0] || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get all LinkedIn posts, with optional pagination.
 * @param {number} [page] - The page number (optional; if omitted, all posts are fetched).
 * @param {number} [limit] - The number of posts per page (optional; if omitted, all posts are fetched).
 * @returns {Promise<{ docs: LinkedInPost[], total: number }>} All posts or paginated posts with total count.
 */
export async function findAllLinkedInPosts(page?: number, limit?: number): Promise<{ docs: LinkedInPost[]; total: number }> {
  if (page == null || limit == null) {
    // Fetch all posts without pagination
    const [postDocs, total] = await Promise.all([db.select().from(linkedInPosts), db.$count(linkedInPosts)]);
    return { docs: postDocs, total: total || 0 };
  }

  // Fetch paginated posts
  const offset = (page - 1) * limit;
  const [postDocs, total] = await Promise.all([
    db.select().from(linkedInPosts).offset(offset).limit(limit),
    db.$count(linkedInPosts)
  ]);
  return { docs: postDocs, total: total || 0 };
}
// =====================================================================================================
// =====================================================================================================

/**
 * Update a LinkedIn post by ID.
 * @param {string} postId - The ID of the LinkedIn post to update.
 * @param {UpdateLinkedInPostRequest} updateData - The data to update the LinkedIn post with.
 * @returns {Promise<LinkedInPost | null>} The updated LinkedIn post if found, otherwise null.
 */
export async function updateLinkedInPost(postId: string, updateData: UpdateLinkedInPostRequest): Promise<LinkedInPost | null> {
  const [updatedPost] = await db.update(linkedInPosts).set(updateData).where(eq(linkedInPosts.id, postId)).returning();
  return updatedPost || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Delete a LinkedIn post by ID.
 * @param {string} postId - The ID of the LinkedIn post to delete.
 * @returns {Promise<boolean>} True if the LinkedIn post was deleted, otherwise false.
 */
export async function deleteLinkedInPost(postId: string): Promise<boolean> {
  const deletedPost = await db.delete(linkedInPosts).where(eq(linkedInPosts.id, postId)).returning();
  return deletedPost.length > 0;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Count the total number of LinkedIn posts.
 * @returns {Promise<number>} The total number of LinkedIn posts.
 */
export async function countLinkedInPosts(): Promise<number> {
  return db.$count(linkedInPosts) || 0;
}
// =====================================================================================================
// =====================================================================================================
