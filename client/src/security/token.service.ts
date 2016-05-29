import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';

import {Observable} from 'rxjs/Observable';

import {LocalStorageService} from '../storage';

export interface Token {
  access_token: string;
  token_type: string;
  refresh_token: string;
  expires_in: number;
  expires: Date;
  scope: string;
  jti: string;
}

@Injectable()
export class TokenService {

  constructor(private http: Http, private localStorage: LocalStorageService) {
  }

  get token(): Token {
    const t: Token = this.localStorage.getObject('token');
    if (!t) {
      return undefined;
    }
    return this.addExpires(t);
  }

  isValid(): boolean {
    const token = this.token;

    if (!token) {
      return false;
    }

    const now = new Date();
    return this.token.expires.getTime() > now.getTime();
  }

  requestToken(): Observable<Token> {
    const headers: Headers = new Headers({
      'Content-Type': 'application/json; charset=utf-8'
    });
    return this.http.get('/api/token', {headers})
      .map(res => res.json())
      // Add when the token expires
      .map(this.addExpires)
      // Save the token to local storage
      .map(t => {
        this.localStorage.setObject('token', t);
        return t;
      })
      // If we can't get the token we remove the token from local storage
      .catch((errorResponse) => {
        this.localStorage.remove('token');
        this.localStorage.remove('user');
        return Observable.throw(errorResponse.json());
      });
  }

  tryAuthenticate(): void {
    this.requestToken().subscribe(undefined, error => console.error(error));
  }

  /**
   * Set Expires time based on expires_in
   * @param token
   * @returns {Token}
   */
  private addExpires(token: Token): Token {
    var d = new Date();
    d.setSeconds(d.getSeconds() + token.expires_in);
    token.expires = d;

    return token;
  }
}
