// Handlers for LinkedIn post-specific operations

// Types
import {
  LinkedInPost,
  CreateLinkedInPostRequest,
  GetAllLinkedInPostsResponse,
  GetLinkedInPostResponse,
  UpdateLinkedInPostRequest,
} from "@/types";

// LinkedIn Post Data Layer
import {
  createLinkedInPost,
  findAllLinkedInPosts,
  findLinkedInPostById,
  updateLinkedInPost,
  deleteLinkedInPost,
} from "@/data/linkedin-posts";

// Errors
import { ResourceNotFoundError } from "@/lib/errors";

export async function handleGetById(id: string): Promise<GetLinkedInPostResponse> {
  const post = await findLinkedInPostById(id);

  if (!post) {
    throw new ResourceNotFoundError("LinkedIn post not found");
  }

  return { doc: post };
}

export async function handleGetAll(queryParams: string): Promise<GetAllLinkedInPostsResponse> {

  console.log("queryParams", queryParams);

  const { docs, total } = await findAllLinkedInPosts();
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

export async function handleCreate(data: CreateLinkedInPostRequest): Promise<LinkedInPost> {
  const newPost = await createLinkedInPost(data);
  return newPost;
}

export async function handleUpdate(id: string, data: UpdateLinkedInPostRequest): Promise<LinkedInPost> {
  const updatedPost = await updateLinkedInPost(id, data);

  if (!updatedPost) {
    throw new ResourceNotFoundError("LinkedIn post not found");
  }

  return updatedPost;
}

export async function handleDelete(id: string): Promise<boolean> {
  return await deleteLinkedInPost(id);
}
