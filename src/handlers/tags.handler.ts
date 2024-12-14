// Handlers for tag-specific operations 

// Types
import { Tag, CreateTagRequest, GetAllTagsResponse, GetTagResponse } from "@/types";

// Tag Data Layer
import { createTag, findAllTags, findTagById, deleteTag } from "@/data/tags";

// Errors
import { ResourceNotFoundError } from "@/lib/errors";

export async function handleGetById(id: string): Promise<GetTagResponse> {
  const tag = await findTagById(id);

  if (!tag) {
    throw new ResourceNotFoundError("Tag not found");
  }

  return { doc: tag };
}

export async function handleGetAll(queryParams: Record<string, unknown>): Promise<GetAllTagsResponse> {
  const { docs, total } = await findAllTags();
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

export async function handleCreate(data: CreateTagRequest): Promise<Tag> {
  const newTag = await createTag(data);
  return newTag;
}



export async function handleDelete(id: string): Promise<boolean> {
  return await deleteTag(id);
} 