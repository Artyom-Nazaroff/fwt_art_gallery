export type QueryType = {
  name?: string;
  genres?: string[];
  perPage?: number;
  pageNumber?: number;
  orderBy?: 'asc' | 'desc' | null;
};
