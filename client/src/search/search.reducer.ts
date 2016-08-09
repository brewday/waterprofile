import {Action, ActionReducer} from '@ngrx/store';
import {
  SearchResult,
} from './search.model';
import {
  SEARCH,
  SEARCH_SUCCESS,
} from './search.actions';

export interface SearchState {
  loading: boolean;
  term: string;
  results: SearchResult[];
}

const initialState: SearchState = {
  loading: false,
  term: undefined,
  results: [],
};

export const searchReducer: ActionReducer<SearchState> = (state: SearchState = initialState, action: Action) => {
  switch (action.type) {
    case SEARCH:
      return Object.assign({}, state, {
        loading: true,
        term: action.payload,
      });

    case SEARCH_SUCCESS:
      return Object.assign({}, state, {
        loading: false,
        results: action.payload,
      });

    default:
      return state;
  }
}
