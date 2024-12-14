// =====================================================================================================
// =====================================================================================================
// Drizzle ORM
import { db } from "@/db/drizzle";
import { eq } from "drizzle-orm";

// Collections
import { authors } from "@/db/schema";

// Types
import { Author, CreateAuthorRequest, UpdateAuthorRequest } from "@/types";

// =====================================================================================================
// =====================================================================================================
// Main CRUD Operations
// =====================================================================================================
// =====================================================================================================

/**
 * Create a new author.
 * @param {CreateAuthorRequest} authorData - The data of the author to create.
 * @returns {Promise<Author>} The created author.
 */
export async function createAuthor(authorData: CreateAuthorRequest): Promise<Author> {
  const [newAuthor] = await db.insert(authors).values(authorData).returning();
  return newAuthor;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get an author by ID.
 * @param {string} authorId - The ID of the author to retrieve.
 * @returns {Promise<Author | null>} The author if found, otherwise null.
 */
export async function findAuthorById(authorId: string): Promise<Author | null> {
  const author = await db.select().from(authors).where(eq(authors.id, authorId));
  return author[0] || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Get all authors, with optional pagination.
 * @param {number} [page] - The page number (optional; if omitted, all authors are fetched).
 * @param {number} [limit] - The number of authors per page (optional; if omitted, all authors are fetched).
 * @returns {Promise<{ docs: Author[], total: number }>} All authors or paginated authors with total count.
 */
export async function findAllAuthors(page?: number, limit?: number): Promise<{ docs: Author[]; total: number }> {
  if (page == null || limit == null) {
    // Fetch all authors without pagination
    const [authorDocs, total] = await Promise.all([db.select().from(authors), db.$count(authors)]);
    return { docs: authorDocs, total: total || 0 };
  }

  // Fetch paginated authors
  const offset = (page - 1) * limit;
  const [authorDocs, total] = await Promise.all([db.select().from(authors).offset(offset).limit(limit), db.$count(authors)]);
  return { docs: authorDocs, total: total || 0 };
}
// =====================================================================================================
// =====================================================================================================

/**
 * Update an author by ID.
 * @param {string} authorId - The ID of the author to update.
 * @param {UpdateAuthorRequest} updateData - The data to update the author with.
 * @returns {Promise<Author | null>} The updated author if found, otherwise null.
 */
export async function updateAuthor(authorId: string, updateData: UpdateAuthorRequest): Promise<Author | null> {
  const [updatedAuthor] = await db.update(authors).set(updateData).where(eq(authors.id, authorId)).returning();
  return updatedAuthor || null;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Delete an author by ID.
 * @param {string} authorId - The ID of the author to delete.
 * @returns {Promise<boolean>} True if the author was deleted, otherwise false.
 */
export async function deleteAuthor(authorId: string): Promise<boolean> {
  const deletedAuthor = await db.delete(authors).where(eq(authors.id, authorId)).returning();
  return deletedAuthor.length > 0;
}
// =====================================================================================================
// =====================================================================================================

/**
 * Count the total number of authors.
 * @returns {Promise<number>} The total number of authors.
 */
export async function countAuthors(): Promise<number> {
  return db.$count(authors) || 0;
}
// =====================================================================================================
// =====================================================================================================