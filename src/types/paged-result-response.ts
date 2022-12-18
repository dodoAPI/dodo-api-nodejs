/**
 * Paged result response
 */
type PagedResultResponse<T> = {
  /**
   * Items list
   */
  items: T[];
  /**
   * Total items count
   */
  totalItems: number;
  /**
   * Current page. [1, 2, ... n]
   */
  currentPage: number;
  /**
   * Total pages count
   */
  totalPages: number;
};

export = PagedResultResponse;
