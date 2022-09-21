import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent {

  ngUnsubscribe = new Subject();

  constructor() { }

  ngOnDestroy() {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

}
