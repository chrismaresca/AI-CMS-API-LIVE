import { articles } from "@/db/schema";

import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Base Response types
import { GetAllResponse, GetSingleResponse } from "@/types/response.types";

// Base Article type
export type Article = InferSelectModel<typeof articles>;

// ================================================================================
// Payload types
// ================================================================================

export type ArticlePayload = {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  authorId: string;
  brandId: string;
  images: string[];
  publishStatus: string;
  dateCreated: Date;
  dateUpdated: Date;
  author: {
    firstName: string;
    lastName: string;
    title: string;
    isHuman: boolean;
    image: string;
    bio: string;
    linkedInHandle: string;
    twitterHandle: string;
    githubHandle: string;
    location: string;
    dateCreated: Date;
  };
  tags: {
    articleId: string;
    tagId: string;
    tag: {
      name: string;
      slug: string;
    };
  }[];
};

// ================================================================================
// Request types
// ================================================================================

// Create Article Request type
export type CreateArticleRequest = InferInsertModel<typeof articles> & { tagIds: string[]; imageUrls: string[] };

// Update Article Request type
export type UpdateArticleRequest = Partial<CreateArticleRequest>;

// ================================================================================
// Response types
// ================================================================================

export type GetAllArticlesResponse = GetAllResponse<ArticlePayload>;
export type GetArticleResponse = GetSingleResponse<ArticlePayload>;
