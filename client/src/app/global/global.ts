import { InjectionToken, Injectable } from '@angular/core';

@Injectable()
export class Global {
  // data here
}

export const GLOBAL = new InjectionToken<Global>('GLOBAL');