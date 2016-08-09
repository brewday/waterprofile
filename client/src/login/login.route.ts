import {Component, ChangeDetectionStrategy} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {AppState} from '../store';

@Component({
  moduleId: module.id,
  selector: 'ws-login-route',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="wrapper">
      <div class="login">
        <form>
          <div class="form-group">
            <label>Email</label>
            <input class="form-control" type="email" />
          </div>

          <div class="form-group">
            <label>Email</label>
            <input class="form-control" type="password" />
          </div>

          <button class="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  `
})
export default class LoginRoute  {

  constructor() {}

}
