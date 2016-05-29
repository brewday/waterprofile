import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
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
        [ngFormControl]="input"
        autofocus
      />
      <small class="text-muted"></small>
    </div>
  `
})
export class SearchBoxComponent implements OnInit {

  @Input() term: string;

  @Output() search = new EventEmitter<string>();

  private input = new Control();

  constructor() {
    this.input.valueChanges
      .debounceTime(700)
      .distinctUntilChanged()
      .filter((v: string) => v && v !== 'null' && v !== 'undefined' && v.length > 1)
      .subscribe((v: string) => this.search.emit(v));
  }

  ngOnInit() {
    // Update value from incoming term
    this.input.updateValue(this.term);
  }

}
