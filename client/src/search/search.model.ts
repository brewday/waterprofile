// Models

export interface SearchResult {
  name: string;
  lat: number;
  lng: number;
}

// Actions
export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_NO_RESULTS = 'SEARCH_NO_RESULTS';
