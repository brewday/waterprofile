import {Provider} from '@angular/core';
import {
  Http,
  ConnectionBackend,
  Headers,
  Request,
  RequestOptions,
  RequestOptionsArgs,
  Response,
  XHRBackend
} from '@angular/http';
import {Observable} from 'rxjs/Observable';

import {CookieService} from 'angular2-cookie/core';

import {TokenService} from '../security';

/**
 * Custom APIHttp client that handles conversions to json and redirects to signin if token is missing
 */
export class APIHttp extends Http {

  constructor(
    backend: ConnectionBackend,
    defaultOptions: RequestOptions,
    private tokenService: TokenService,
    private cookieService: CookieService
  ) {
    super(backend, defaultOptions);
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<any> {
    return super
      .request(url, this.mergeOptions(options))
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  get(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super
      .get(url, this.mergeOptions(options))
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  post(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return super
      .post(url, body, this.mergeOptions(options))
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return super
      .put(url, body, this.mergeOptions(options))
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super
      .delete(url, this.mergeOptions(options))
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  patch(url: string, body: string, options?: RequestOptionsArgs): Observable<any> {
    return super
      .patch(url, body, this.mergeOptions(options))
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  head(url: string, options?: RequestOptionsArgs): Observable<any> {
    return super
      .head(url, this.mergeOptions(options))
      .map(res => res.json())
      .catch(this.errorHandler);
  }

  private mergeOptions(options?: RequestOptionsArgs): RequestOptionsArgs {

    const csrfToken: string = this.cookieService.get('XSRF-TOKEN');

    let base: RequestOptions = new RequestOptions({
      headers: new Headers({
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest',
        'X-XSRF-TOKEN': csrfToken
      })
    });

    // If we have a valid jwt token, we add it
    if (this.tokenService.isValid()) {
      base.headers.set('Authorization', 'Bearer ' + this.tokenService.token.access_token);
    }

    return base.merge(options);
  }

  private errorHandler(errorResponse: Response): Observable<any> {
    if (errorResponse.status === 401) {
      console.log('redirecting to signin');
      window.location.href = '/signin';
      return Observable.empty();
    }

    // If it's a serious problem we toast it, so the user knows
    if (errorResponse.status === 500) {
      // this.toastManager.error('Servern returnerade ett 500 fel, någonting är väldigt galet, kontakta digiPlant');
    }

    console.error(errorResponse);

    return Observable.throw(errorResponse.json());
  }
}

export const APIHTTP_PROVIDER = new Provider(APIHttp, {
  useFactory: (backend: XHRBackend, defaultOptions: RequestOptions, tokenService: TokenService, cookieService: CookieService) => new APIHttp(backend, defaultOptions, tokenService, cookieService),
  deps: [XHRBackend, RequestOptions, TokenService, CookieService]
});
