import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef} from '@angular/core';
import GoogleMapApiService from './google-map-api.service';
import Map = google.maps.Map;

@Component({
  moduleId: module.id,
  selector: 'google-map',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [`
    :host {
      display: block;
      width: 100%;
      height: 100%;
    }
  `],
  template: ``
})
export default class GoogleMap implements OnInit {

  map: Map;

  constructor(private googleMapsApi: GoogleMapApiService, private element: ElementRef) {
  }

  ngOnInit() {
    this.googleMapsApi.load().then(() => {
      this.map = new Map(this.element.nativeElement, {
        center: {lat: -34.397, lng: 150.644},
        zoom: 8
      });
    })
  }

}


