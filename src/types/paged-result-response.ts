/**
 * Key auth data
 */
type PagedResultResponse<T> = {
  items: T[];
  totalItems: number;
  currentPage: number;
  totalPages: number;
};

export = PagedResultResponse;
