
export const SEARCH = 'SEARCH';
export const SEARCH_SUCCESS = 'SEARCH_SUCCESS';
export const SEARCH_NO_RESULTS = 'SEARCH_NO_RESULTS';
export function search(term: string) {
  return {
    type: SEARCH,
    payload: term
  };
}
