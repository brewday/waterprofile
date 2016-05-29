import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Action} from '@ngrx/store';
import {StateUpdates, Effect} from '@ngrx/effects';
import {APIHttp} from '../http';

import {AppState} from '../store/state';
import {SEARCH, SEARCH_SUCCESS, SEARCH_NO_RESULTS} from './search.model';


@Injectable()
export class SearchEffects {

  private API_URL = '/api/search';

  @Effect()
  search$ =  this.updates$
    .whenAction(SEARCH)
    .map(update => update.action.payload)
    .switchMap(term => this.http.post(this.API_URL, term)
      .map(res => {
        if (!res || res.length === 0) {
          return {type: SEARCH_NO_RESULTS};
        }
        return {type: SEARCH_SUCCESS, payload: res};
      })
      .catch(() => Observable.of({ type: SEARCH_NO_RESULTS }))
    );

  constructor(private http: APIHttp, private updates$: StateUpdates<AppState>) {
  }
}
