import { articles } from "@/db/schema";

import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Base Response types
import { GetAllResponse, GetSingleResponse } from "@/types/response.types";

// Base Article type
export type Article = InferSelectModel<typeof articles>;

// ================================================================================
// Payload types
// ================================================================================
// TODO: Move this

export type AuthorPayload = {
  firstName: string;
  lastName: string;
  title: string ;
  bio: string;
  location: string;
  dateCreated: Date;
};

export type TagPayload = {
  name: string;
  slug: string;
};

export type ArticlePayload = {
  id: string;
  title: string;
  content: string;
  slug: string;
  authorId: string;
  brandId: string;
  dateCreated: Date;
  dateUpdated: Date;
  author: AuthorPayload;
  tags: {
    articleId: string;
    tagId: string;
    tag: TagPayload;
  }[];
};

// ================================================================================
// Request types
// ================================================================================

// Create Article Request type
export type CreateArticleRequest = InferInsertModel<typeof articles> & { tagIds: string[] };

// Update Article Request type
export type UpdateArticleRequest = Partial<CreateArticleRequest>;

// ================================================================================
// Response types
// ================================================================================

export type GetAllArticlesResponse = GetAllResponse<ArticlePayload>;
export type GetArticleResponse = GetSingleResponse<ArticlePayload>;
