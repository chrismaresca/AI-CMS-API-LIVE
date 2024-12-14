import { tweetPosts, tweets } from "@/db/schema";
import { InferSelectModel, InferInsertModel } from "drizzle-orm";

// Base Response types
import { GetAllResponse, GetSingleResponse } from "@/types/response.types";

// Base Tweet Post types
export type TweetPost = InferSelectModel<typeof tweetPosts>;
export type Tweet = InferSelectModel<typeof tweets>;

// ================================================================================
// Request types
// ================================================================================

// Create Tweet Post Request type
export type CreateTweetPostRequest = InferInsertModel<typeof tweetPosts>;

// Create Tweet Request type
export type CreateTweetRequest = InferInsertModel<typeof tweets>;

// Update Tweet Post Request type
export type UpdateTweetPostRequest = Partial<CreateTweetPostRequest>;

// Update Tweet Request type
export type UpdateTweetRequest = Partial<CreateTweetRequest>;

// ================================================================================
// Response types
// ================================================================================

// Tweet Posts
export type GetAllTweetPostsResponse = GetAllResponse<TweetPost>;
export type GetTweetPostResponse = GetSingleResponse<TweetPost>;

// Tweets
export type GetAllTweetsResponse = GetAllResponse<Tweet>;
export type GetTweetResponse = GetSingleResponse<Tweet>; 