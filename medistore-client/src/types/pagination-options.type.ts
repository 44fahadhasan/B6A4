export interface IPaginationOptions {
  page?: number;
  limit?: number;
  skip?: number;
  orderBy?: string;
  order?: "asc" | "desc";
}
