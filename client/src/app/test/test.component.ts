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

  message: string = '';
  username = 'username'
  isTyping = false;
  messageArray = [{ message:'message1', user: 'username'}, { message: 'message2', user: 'user2'}];
  chatroom = 'chatroom'

  constructor(private testService: TestService) {
    super();
    this.testService.newMessageReceived().subscribe(data => {
      console.log('new message received', data);
    });
    this.testService.receivedTyping().subscribe(bool => {
      console.log('receivedtyping event', bool)
    })
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

  sendMessage() {
    this.testService.sendMessage({room: this.chatroom, user: 'user', message: this.message});
    this.message = '';
  }

  typing() {
    console.log('typing...')
    this.testService.typing({room: this.chatroom, user: 'user'});
  }

}
