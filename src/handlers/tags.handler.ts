// Drizzle andNeon
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";

// Types
import { Tag, CreateTagRequest, GetAllTagsResponse, GetTagResponse, QueryParamStructure } from "@/types";

// Tag Data Layer
import { createTag, findTagById, deleteTag } from "@/data/tags";

// Errors
import { ResourceNotFoundError } from "@/lib/errors";

// Schema
import * as schema from "@/db/schema";

// Client
const client = neon(process.env.DATABASE_URL!);

// Drizzle
const neonDb = drizzle(client, { schema });

/**
 * Finds tag information by a specific field.
 *
 * @param field - The field of the tag to match.
 * @param value - The value to match for the specified field. If `null`, all tags are returned.
 * @param mode - The query mode:
 *   - "all": returns all tags (ignores `field` and `value` if `value` is `null`).
 *   - "first": returns the first matching tag.
 *   - "many": returns all matching tags.
 * @returns The requested tag(s). Throws a ResourceNotFoundError if none are found.
 */
export async function findTag(
  field: keyof typeof schema.tags.$inferSelect,
  value: string | null,
  mode: "first" | "many" | "all" = "all"
): Promise<Tag | Tag[] | null> {
  // If value is null or mode is "all", return all tags
  if (value === null || mode === "all") {
    const allTags = await neonDb.query.tags.findMany();
    if (!allTags.length) throw new ResourceNotFoundError("No tags found");
    return allTags as Tag[];
  }

  // Otherwise, we have a specific value, so apply a WHERE clause
  const whereClause = eq(schema.tags[field], value);

  if (mode === "first") {
    const tag = await neonDb.query.tags.findFirst({ where: whereClause });
    if (!tag) throw new ResourceNotFoundError(`Tag not found for ${String(field)} = ${value}`);
    return tag as Tag;
  }

  if (mode === "many") {
    // const tags = await neonDb.query.brandTags.findMany({ where: (brandTags) => eq(brandTags.brandId, value) });
    // console.log("tags", tags);
    // return tags;
    const tags = await neonDb.query.tags.findMany({ where: whereClause });
    if (!tags.length) throw new ResourceNotFoundError(`No tags found for ${String(field)} = ${value}`);
    return tags as Tag[];
  }

  // If none of the above conditions match, return null
  return null;
}

// =====================================================================================================
// =====================================================================================================

export async function handleGetById(id: string): Promise<GetTagResponse> {
  const tag = await findTagById(id);

  if (!tag) {
    throw new ResourceNotFoundError("Tag not found");
  }

  return { doc: tag };
}

// =====================================================================================================
// =====================================================================================================

export async function handleGetAll(queryParams: QueryParamStructure[]): Promise<GetAllTagsResponse> {
  let docs: Tag[];
  let total: number;

  const brandIdParam = queryParams.find((param) => param.field === "brandId");

  if (brandIdParam?.value) {
    const brandId = brandIdParam.value as string;

    const brandTags = await neonDb.query.brandTags.findMany({
      where: (brandTags) => eq(brandTags.brandId, brandId),
      with: { tag: { columns: { id: true, name: true, slug: true, dateCreated: true, dateUpdated: true, seoDescription: true, aiDescription: true } } },
    });


    docs = brandTags.map((brandTag) => brandTag.tag);
    total = docs.length;
  } else {
    const allTags = (await findTag("id", null, "all")) as Tag[];
    docs = allTags;
    total = allTags.length;
  }

  return {
    docs,
    totalDocs: total,
    limit: 10,
    totalPages: Math.ceil(total / 10),
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: total > 10,
    prevPage: null,
    nextPage: total > 10 ? 2 : null,
  };
}

// =====================================================================================================
// =====================================================================================================

export async function handleCreate(data: CreateTagRequest): Promise<Tag> {
  const newTag = await createTag(data);
  return newTag;
}

// =====================================================================================================
// =====================================================================================================

export async function handleDelete(id: string): Promise<boolean> {
  return await deleteTag(id);
}

// =====================================================================================================
// =====================================================================================================

  // async function findTagsByBrandId(brandId: string): Promise<Tag[]> {
  //   const tags = await findTag("id", brandId, "many");
  //   if (!tags) {
  //     return [];
  //   }
  //   return Array.isArray(tags) ? tags : [tags];
  // }
