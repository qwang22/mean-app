import { Component, OnInit } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { TestService } from './test.service';
import { BaseComponent } from '../shared/components/base/base.component';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent extends BaseComponent implements OnInit {
  
  testData: any[] = [];

  constructor(private testService: TestService) {
    super();
  }

  ngOnInit(): void {
    this.getTestData();
  }

  getTestData(): void {
    this.testService.get().pipe(takeUntil(this.ngUnsubscribe)).subscribe(
      (res) => {
        this.testData = res;
      }
    )
  }

}
