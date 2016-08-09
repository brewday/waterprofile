import {Component, ChangeDetectionStrategy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Store} from '@ngrx/store';
import {GOOGLE_MAPS_DIRECTIVES} from 'angular2-google-maps/core';

import {AppState} from '../store';
import {search} from './search.actions';

import {SearchBoxComponent} from './component/search-box.component';
import {provideLazyMapsAPILoaderConfig} from 'angular2-google-maps/core/services/maps-api-loader/lazy-maps-api-loader';
import GoogleMap from '../common/component/google-map.component';

@Component({
  moduleId: module.id,
  selector: 'bd-search-route',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
    SearchBoxComponent,
    GoogleMap,
    /*GOOGLE_MAPS_DIRECTIVES,
    provideLazyMapsAPILoaderConfig({ apiKey: 'myKey', clientId: 'myClientId' }),*/
  ],
  styles: [`
    :host {
      flex: 1;
      display: flex;
      flex-direction: column;
      background-color: #666;
    }
    .map {
      flex: 1;
      background-color: #333;
    }
    .sebm-google-map-container {
      width: 100%;
      height: 100%;
    }
  `],
  template: `
    <div class="bg-gray p-y-1">
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-offset-3 col-md-6 box">
            <bd-search-box [term]="term" (search)="handleSearch($event)"></bd-search-box>
          </div>
        </div>
      </div>
    </div>
    
    <div class="map">
      <google-map></google-map>
      <!--<sebm-google-map [latitude]="lat" [longitude]="lng"></sebm-google-map>-->
    </div>
  `
})
export default class SearchRoute implements OnInit {

  lat: number = 59.334591;
  lng: number = 18.063240;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {

  }

  ngOnInit() {
    navigator.geolocation.getCurrentPosition(pos => {
      const {latitude, longitude} = pos.coords;
      this.lat = latitude;
      this.lng = longitude;
      console.log(latitude, longitude);
    });
  }

  handleSearch(term: string) {
    this.store.dispatch(search(term));
  }

}
