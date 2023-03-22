export interface PaginationResult<T> {
  data: T[];
  meta: {
    pages: number;
    page: number;
    limit: number;
    items: any;
  };
}
