import {Component, ViewEncapsulation} from '@angular/core';
import {ROUTER_DIRECTIVES} from '@angular/router';

import {TopNavComponent} from './layout/top-nav.component';

import SearchRoute from './search/search.route';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  directives: [
    ROUTER_DIRECTIVES,
    TopNavComponent,
  ],
  template: `
    <bd-top-nav></bd-top-nav>
    
    <router-outlet></router-outlet>
  `
})
export default class AppComponent {

}
