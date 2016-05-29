import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

  public localStorage: any;

  constructor() {
    if (!localStorage) {
      throw new Error('Current browser does not support Local Storage');
    }
    this.localStorage = localStorage;
  }

  public set(key: string, value:string): void {
    this.localStorage[key] = value;
  }

  public get(key: string): string {
    return this.localStorage[key];
  }

  public setObject(key: string, value: any): void {
    this.localStorage[key] = JSON.stringify(value);
  }

  public getObject(key: string): any {
    const val = this.localStorage[key];
    if (!val) {
      return undefined;
    }
    return JSON.parse(val);
  }

  public remove(key: string): any {
    this.localStorage.removeItem(key);
  }
}
