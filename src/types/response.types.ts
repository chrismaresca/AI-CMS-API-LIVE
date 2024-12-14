// ================================================================================
// Response types
// ================================================================================

export type GetAllResponse<T> = {
  docs: T[];
  totalDocs: number; // Total number of articles for pagination
  limit: number; // Items per page
  totalPages: number; // Total number of pages
  page: number; // Current page
  pagingCounter: number; // Paging counter
  hasPrevPage: boolean; // Has previous page
  hasNextPage: boolean; // Has next page
  prevPage: number | null; // Previous page
  nextPage: number | null; // Next page
};

export type GetSingleResponse<T> = {
  doc: T;
};
