import {Action, ActionReducer} from '@ngrx/store';
import {
  SearchResult,
  SEARCH,
  SEARCH_SUCCESS,
  SEARCH_NO_RESULTS
} from './search.model';

export interface SearchState {
  loading: boolean;
  results: SearchResult[];
}

const initialState: SearchState = {
  loading: false,
  results: []
};

export const searchReducer: ActionReducer<SearchState> = (state: SearchState = initialState, action: Action) => {
  switch (action.type) {
    case SEARCH:


      default:
          return state;
  }
}
