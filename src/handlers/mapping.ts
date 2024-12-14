/* eslint-disable @typescript-eslint/no-explicit-any */

// Types
import { GetSingleResponse, GetAllResponse, Resource, ResourceDataMap, QueryParamStructure } from "@/types";

// Handlers
import * as articles from "./articles.handler";
import * as authors from "./authors.handler";

// Errors
import { ResourceNotFoundError, OperationNotSupportedError } from "@/lib/errors";

// Define separate types for each operation
type GetAllOperation<T> = (queryParams: QueryParamStructure[]) => Promise<GetAllResponse<T>>;
type GetByIdOperation<T> = (id: string) => Promise<GetSingleResponse<T>>;
type DeleteOperation = (id: string) => Promise<boolean>;
type CreateOperation = (data: any) => Promise<{ id: string }>;  // Changed to always return id
type UpdateOperation = (id: string, data: any) => Promise<{ id: string }>;  // Changed to always return id

// Update HandlerOperations to support input types
type HandlerOperations<T> = {
  handleGetAll?: GetAllOperation<T>;
  handleGetById?: GetByIdOperation<T>;
  handleCreate?: CreateOperation;  // No longer generic
  handleUpdate?: UpdateOperation;  // No longer generic
  handleDelete?: DeleteOperation;
};

// Define handlers for resources with partial implementation
const handlers: Partial<{ [K in Resource]: HandlerOperations<ResourceDataMap[K]> }> = {
  articles: articles,
  authors: authors,
  // Other resources will be implemented later:
  // "brands": brands,
  // "tags": tags,
  // "linkedin-posts": linkedinPosts,
  // "twitter-posts": twitterPosts
};

// Update mapHandler with operation-specific return types
export function mapHandler<O extends keyof HandlerOperations<ResourceDataMap[Resource]>>(
  resource: Resource,
  operation: O
): HandlerOperations<ResourceDataMap[Resource]>[O] {


  if (!handlers[resource]) {
    throw new ResourceNotFoundError(`Resource "${resource}" not found`);
  }

  const handler = handlers[resource]?.[operation];
  if (!handler) {
    throw new OperationNotSupportedError(`Operation "${operation}" is not supported for this resource.`);
  }

  return handler as HandlerOperations<ResourceDataMap[Resource]>[O];
}
