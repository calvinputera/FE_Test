export interface ResponseI {
  total_pages: number;
  current_page: number;
  count: number;
  rows: Rows;
}

export interface Rows {
  count: number;
  rows: [];
}
