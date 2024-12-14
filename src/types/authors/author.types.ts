import { authors } from "@/db/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Base Response types
import { GetAllResponse, GetSingleResponse } from "@/types/response.types";

// Base Author type
export type Author = InferSelectModel<typeof authors>;

// ================================================================================
// Request types
// ================================================================================

// Create Author Request type
export type CreateAuthorRequest = InferInsertModel<typeof authors>;

// Update Author Request type
export type UpdateAuthorRequest = Partial<CreateAuthorRequest>;

// ================================================================================
// Response types
// ================================================================================

export type GetAllAuthorsResponse = GetAllResponse<Author>;
export type GetAuthorResponse = GetSingleResponse<Author>; 