import {Component, ChangeDetectionStrategy} from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'bd-top-nav',
  changeDetection: ChangeDetectionStrategy.OnPush,
  directives: [
  ],
  template: `
    <nav class="navbar navbar-full navbar-dark bg-inverse navbar-cc">
      <a class="navbar-brand" [routerLink]="['/']">BrewDay Water profiles</a>

      <!-- Main Nav -->
      <ul class="nav navbar-nav">

        <!--<li class="nav-item" routerActive>
          <a class="nav-link" [routerLink]="['/']"><i class="fa fa-search"></i> Search</a>
        </li>-->

        <!--<li class="nav-item" routerActive>
          <a class="nav-link" [routerLink]="['/customers']"><i class="fa fa-university"></i> Kunder</a>
        </li>

        <li class="nav-item" routerActive>
          <a class="nav-link" [routerLink]="['/accounts']"><i class="fa fa-user"></i> Konton</a>
        </li>-->
      </ul>

      <!-- Right Nav -->
      <!--<ul class="nav navbar-nav pull-xs-right">
        <li class="nav-item"><a class="nav-link" [routerLink]="['/settings']">{{account?.name}}</a></li>
      </ul>-->
    </nav>
  `
})
export class TopNavComponent {
}
