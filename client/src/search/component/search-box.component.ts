import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {Control} from '@angular/common';

@Component({
  selector: 'bd-search-box',
  styles: [`
    .search-box {
      text-align: center;
    }
    .search-input {
      text-align: center;
    }
  `],
  template: `
    <div class="search-box form-group text-xs-center">
      <input
        class="search-input form-control form-control-lg"
        placeholder="Search"
        [(ngModel)]="term"
        autofocus
        
      />
      <small class="text-muted"></small>
    </div>
  `
})
export class SearchBoxComponent {

  @Input() term: string;

  keyup$ = new Subject<string>();

  @Output() search: Observable<string> = this.keyup$
    .debounceTime(700)
    .distinctUntilChanged();

}
