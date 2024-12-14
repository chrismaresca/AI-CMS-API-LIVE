import { linkedInPosts } from "@/db/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Base Response types
import { GetAllResponse, GetSingleResponse } from "@/types/response.types";

// Base LinkedIn Post type
export type LinkedInPost = InferSelectModel<typeof linkedInPosts>;

// ================================================================================
// Request types
// ================================================================================

// Create LinkedIn Post Request type
export type CreateLinkedInPostRequest = InferInsertModel<typeof linkedInPosts>;

// Update LinkedIn Post Request type
export type UpdateLinkedInPostRequest = Partial<CreateLinkedInPostRequest>;

// ================================================================================
// Response types
// ================================================================================

export type GetAllLinkedInPostsResponse = GetAllResponse<LinkedInPost>;
export type GetLinkedInPostResponse = GetSingleResponse<LinkedInPost>; 