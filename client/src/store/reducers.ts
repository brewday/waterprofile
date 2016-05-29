import {provideStore} from '@ngrx/store';

import {searchReducer} from '../search/search.reducer';

export const APP_REDUCERS = [
  provideStore({
    search: searchReducer
  })
]
