import {Directive, ElementRef, Output, EventEmitter, OnInit} from '@angular/core';
import GoogleMapApiService from './google-map-api.service';
import Autocomplete = google.maps.places.Autocomplete;
import Place = google.maps.Place;

declare var google: any;

@Directive({
  selector: '[google-maps-autocomplete]'
})
export class PlacesAutocompleteDirective implements OnInit {

  @Output() mapChange: EventEmitter<Place> = new EventEmitter();

  private autocomplete: Autocomplete;

  constructor(private googleMapsApi: GoogleMapApiService, private element: ElementRef) {}

  ngOnInit(): void {
    let options = {
      types: ['geocode'],
      componentRestrictions: {country: 'SE'}
    };

    this.googleMapsApi.load().then(() => {
      this.autocomplete = new Autocomplete(this.element.nativeElement, options);

      google.maps.event.addListener(this.autocomplete, 'place_changed', () => {
        var place: Place = this.autocomplete.getPlace();
        this.mapChange.emit(place);
      });
    });
  }
}
