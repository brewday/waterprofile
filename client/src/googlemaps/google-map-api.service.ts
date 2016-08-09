import {Component, OnInit, ChangeDetectionStrategy, OnDestroy, ElementRef, Injectable} from '@angular/core';

@Injectable()
export default class GoogleMapApiService {

  apiKey = 'AIzaSyCiSEUzfc78sjaQ-pGENezrPMAybAMaQcw';
  language = 'sv';
  region = 'SE';
  libraries = 'places';

  load(): Promise<void> {
    if (window['googleMapsPromise']) {
      return window['googleMapsPromise'];
    }

    const script = document.createElement('script');
    script.id = 'google-api';
    script.type = 'text/javascript';
    script.async = true;
    script.defer = true;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${this.apiKey}&language=${this.language}&region=${this.region}&libraries=${this.libraries}&callback=googleMapsCallback`;

    window['googleMapsPromise'] = new Promise<void>((resolve, reject) => {
      window['googleMapsCallback'] = () => resolve();
      script.onerror = reject;
    });

    document.body.appendChild(script);

    return window['googleMapsPromise'];
  }

}


