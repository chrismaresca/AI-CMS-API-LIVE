// Types
import {
  CreateArticleRequest,
  UpdateArticleRequest,
  GetArticleResponse,
  GetAllArticlesResponse,
  QueryParamStructure,
} from "@/types";

// Import Articles Data Layer
import {
  createArticle,
  // createArticleWithTags,
  findAllArticles,
  updateArticle,
  deleteArticle,
  findArticleBySlug,
  findAllArticlesByBrandId,
  findArticleById,

  // countArticles,
} from "@/data/articles";

// Errors
import { ResourceNotFoundError } from "@/lib/errors";

export async function handleGetById(id: string): Promise<GetArticleResponse> {
  const article = await findArticleById(id);

  if (!article) {
    throw new ResourceNotFoundError("Article not found");
  }

  return {
    doc: article,
  };
}

// TODO: Update usage of QueryParamStructure
export async function handleGetAll(queryParams: QueryParamStructure[]): Promise<GetAllArticlesResponse> {
  console.log("The query params are", queryParams);

  // Extract slug and brandId from query params if they exist
  const slugParam = queryParams.find((param) => param.field === "slug");
  const brandIdParam = queryParams.find((param) => param.field === "brandId");

  // If slug is provided, return single article by slug
  if (slugParam?.value) {
    const article = await findArticleBySlug(slugParam.value as string);
    if (!article) {
      throw new ResourceNotFoundError("Article not found");
    }
    return {
      docs: [article],
      totalDocs: 1,
      limit: 1,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }

  // If brandId is provided, return all articles for that brand
  if (brandIdParam?.value) {
    const articles = await findAllArticlesByBrandId(brandIdParam.value as string);
    return {
      docs: articles,
      totalDocs: articles.length,
      limit: articles.length,
      totalPages: 1,
      page: 1,
      pagingCounter: 1,
      hasPrevPage: false,
      hasNextPage: false,
      prevPage: null,
      nextPage: null,
    };
  }

  const articles = await findAllArticles();
  const total = articles.length;
  return {
    docs: articles,
    totalDocs: articles.length,
    limit: 10,
    totalPages: Math.ceil(articles.length / 10),
    page: 1,
    pagingCounter: 1,
    hasPrevPage: false,
    hasNextPage: total > 10,
    prevPage: null,
    nextPage: total > 10 ? 2 : null,
  };
}

export async function handleCreate(data: CreateArticleRequest): Promise<{ id: string }> {
  console.log("The data is", data);

  const newArticle = await createArticle(data);

  return { id: newArticle.id };
}

export async function handleUpdate(id: string, data: UpdateArticleRequest): Promise<{ id: string }> {
  const updatedArticle = await updateArticle(id, data);

  if (!updatedArticle) {
    throw new ResourceNotFoundError("Article not found");
  }

  return { id: updatedArticle.id };
}

export async function handleDelete(id: string): Promise<boolean> {
  return await deleteArticle(id);
}
