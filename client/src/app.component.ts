import {Component, ViewEncapsulation} from '@angular/core';
import {Routes} from '@angular/router';

import {TopNavComponent} from './layout/top-nav.component';

import SearchRoute from './search/search.route';

@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  directives: [
    TopNavComponent,
  ],
  template: `
    <bd-top-nav></bd-top-nav>
    
    <router-outlet></router-outlet>
  `
})
@Routes([
  { path: '/', component: SearchRoute },
])
export default class AppComponent {

}
