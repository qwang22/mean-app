import { Injectable, Inject } from '@angular/core';
import { GLOBAL, Global } from '../global/global'

export default function initializer(service: AppLoadService) {
  return () => {
    service.initialize()
  }
}

@Injectable()
export class AppLoadService {

  constructor(@Inject(GLOBAL) public g: Global) { }

  initialize(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      // do something here
      console.log('initializer called')
      resolve(true);
    })
  }
}