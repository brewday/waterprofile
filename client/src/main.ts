import {provide, Component, enableProdMode, PLATFORM_DIRECTIVES, PLATFORM_PIPES} from '@angular/core';
import {FORM_PROVIDERS, LocationStrategy, PathLocationStrategy} from '@angular/common';
import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES} from '@angular/router';
import {HTTP_PROVIDERS} from '@angular/http';
import {enableDebugTools} from '@angular/platform-browser';
import {bootstrap} from '@angular/platform-browser-dynamic';

import {CookieService} from 'angular2-cookie/core';
import {ANGULAR2_GOOGLE_MAPS_PROVIDERS} from 'angular2-google-maps/core';

import {APP_REDUCERS, APP_EFFECTS} from './store';
import {APIHTTP_PROVIDER} from './http';
import {LocalStorageService} from './storage';
import {TokenService} from './security';

import AppComponent from './app.component';

const APP_PROVIDERS = [

  // Angular providers
  ...FORM_PROVIDERS,
  ...HTTP_PROVIDERS,
  ...ROUTER_PROVIDERS,
  provide(LocationStrategy, { useClass: PathLocationStrategy }),

  // Third party providers
  CookieService,
  ANGULAR2_GOOGLE_MAPS_PROVIDERS,

  // Application providers
  ...APP_REDUCERS,
  ...APP_EFFECTS,
  APIHTTP_PROVIDER,
  LocalStorageService,
  TokenService,
];

const APP_DIRECTIVES = [
  ...ROUTER_DIRECTIVES,
];

const APP_PIPES = [
];

function main(): Promise<any> {

  return bootstrap(AppComponent, [
    ...APP_PROVIDERS,
    provide(PLATFORM_DIRECTIVES, { multi: true, useValue: APP_DIRECTIVES }),
    provide(PLATFORM_PIPES, { multi: true, useValue: APP_PIPES })
  ])
  .catch(err => console.error(err));

}

if (IS_PROD) {
  enableProdMode();
  main();
}

if (IS_DEV) {
  main();//.then(ref => (enableDebugTools(ref), ref));
  if (HMR) {
    module.hot.accept();
  }
}

// Import Styles
import './styles/main.scss';
