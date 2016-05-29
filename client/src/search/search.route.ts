import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Router, OnActivate, RouteSegment, RouteTree} from '@angular/router';
import {Store} from '@ngrx/store';
import {ANGULAR2_GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import {AppState} from '../store';

import {SEARCH} from '../search/search.model';

import {SearchBoxComponent} from './component/search-box.component';

@Component({
  moduleId: module.id,
  selector: 'bd-search-route',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    SearchBoxComponent,
    ANGULAR2_GOOGLE_MAPS_DIRECTIVES
  ],
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      background-color: #666;
    }
    .map {
      flex: 1;
      background-color: #333;
    }
    .sebm-google-map-container {
      height: 100%;
    }
  `],
  template: `
    <div class="bg-gray p-y-3">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-offset-3 col-md-6 box">
            <bd-search-box [term]="term" (search)="handleSearch($event)"></bd-search-box>
          </div>
        </div>
      </div>
    </div>
    
    <div class="map">
      <sebm-google-map [latitude]="lat" [longitude]="lng"></sebm-google-map>
    </div>
  `
})
export default class SearchRoute implements OnActivate  {

  lat: number = 51.678418;
  lng: number = 7.809007;

  constructor(private store: Store<AppState>) {

  }

  routerOnActivate(curr: RouteSegment, prev?: RouteSegment, currTree?: RouteTree, prevTree?: RouteTree): void {
  }

  handleSearch(term: string) {
    this.store.dispatch({
      type: SEARCH,
      payload: term
    });
  }

}
