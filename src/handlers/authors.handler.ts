// Handlers for author-specific operations

// Types
import {
  Author,
  CreateAuthorRequest,
  GetAllAuthorsResponse,
  GetAuthorResponse,
  QueryParamStructure,
  UpdateAuthorRequest,
} from "@/types";

// Author Data Later
import { createAuthor, findAllAuthors, findAuthorById, updateAuthor, deleteAuthor } from "@/data/authors";

// Errors
import { ResourceNotFoundError } from "@/lib/errors";

export async function handleGetById(id: string): Promise<GetAuthorResponse> {
  const author = await findAuthorById(id);

  if (!author) {
    throw new ResourceNotFoundError("Author not found");
  }

  return { doc: author };
}

export async function handleGetAll(queryParams: QueryParamStructure[]): Promise<GetAllAuthorsResponse> {


  const { docs, total } = await findAllAuthors();
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

export async function handleCreate(data: CreateAuthorRequest): Promise<Author> {
  const newAuthor = await createAuthor(data);
  return newAuthor;
}

export async function handleUpdate(id: string, data: UpdateAuthorRequest): Promise<Author> {
  const updatedAuthor = await updateAuthor(id, data);

  if (!updatedAuthor) {
    throw new ResourceNotFoundError("Author not found");
  }

  return updatedAuthor;
}

export async function handleDelete(id: string): Promise<boolean> {
  return await deleteAuthor(id);
}
