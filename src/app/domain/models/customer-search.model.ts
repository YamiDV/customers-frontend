export interface CustomerSearch {
  filterType: 'ALL' | 'DNI' | 'EMAIL';
  searchTerm: string;
}