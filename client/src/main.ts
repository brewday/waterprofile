import {provide, Component, enableProdMode, PLATFORM_DIRECTIVES, PLATFORM_PIPES} from '@angular/core';
import {LocationStrategy, PathLocationStrategy} from '@angular/common';
import {disableDeprecatedForms, provideForms} from '@angular/forms';
import {ROUTER_DIRECTIVES, provideRouter} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {enableDebugTools} from '@angular/platform-browser';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {CookieService} from 'angular2-cookie/core';
import GoogleMapApiService from './googlemaps/google-map-api.service';

import {APP_REDUCERS, APP_EFFECTS} from './store';
import {APIHTTP_PROVIDER} from './http';
import {LocalStorageService} from './storage';
import {TokenService} from './security';
import {routes} from './routes';

import AppComponent from './app.component';
import hotModuleReplacement from './util/hmr';

const APP_PROVIDERS = [

  // Angular providers
  disableDeprecatedForms(),
  provideForms(),
  ...HTTP_PROVIDERS,
  provideRouter(routes),

  // Third party providers
  CookieService,

  // Application providers
  ...APP_REDUCERS,
  ...APP_EFFECTS,
  APIHTTP_PROVIDER,
  LocalStorageService,
  TokenService,
  GoogleMapApiService,
];

function main(hmrState?: any): Promise<any> {
  return bootstrap(AppComponent, APP_PROVIDERS).catch(err => console.error(err));
}

if (IS_PROD) {
  enableProdMode();
  main();
}

if (IS_DEV) {
  if (HMR && module.hot) {
    hotModuleReplacement(main, module);
  } else {
    main();
  }
}

// Import Styles
import './styles/main.scss';
