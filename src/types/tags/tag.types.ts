import { tags } from "@/db/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Base Response types
import { GetAllResponse, GetSingleResponse } from "@/types/response.types";

// Base Tag type
export type Tag = InferSelectModel<typeof tags>;

// ================================================================================
// Request types
// ================================================================================

// Create Tag Request type
export type CreateTagRequest = InferInsertModel<typeof tags>;

// Update Tag Request type
export type UpdateTagRequest = Partial<CreateTagRequest>;

// ================================================================================
// Response types
// ================================================================================

export type GetAllTagsResponse = GetAllResponse<Tag>;
export type GetTagResponse = GetSingleResponse<Tag>; 