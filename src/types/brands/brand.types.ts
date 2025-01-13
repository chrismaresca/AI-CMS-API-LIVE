import { brands } from "@/db/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Base Response types
import { GetAllResponse, GetSingleResponse } from "@/types/response.types";

// Base Tag type
import { CreateTagRequest } from "../tags/tag.types";

// Base Brand type
export type Brand = InferSelectModel<typeof brands>;

// ================================================================================
// Request types
// ================================================================================

// Create Brand Request type
export type CreateBrandRequest = InferInsertModel<typeof brands>;

// Update Brand Request type
export type UpdateBrandRequest = Partial<CreateBrandRequest>;

// ================================================================================
// Response types
// ================================================================================

export type GetAllBrandsResponse = GetAllResponse<Brand>;
export type GetBrandResponse = GetSingleResponse<Brand>;

// Create Brand With Tags Response type
export type CreateBrandWithTagsRequest = InferInsertModel<typeof brands> & { createdTags?: CreateTagRequest[] };
