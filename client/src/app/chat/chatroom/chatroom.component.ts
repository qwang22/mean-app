import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  message: string = '';
  username: string = 'testuser1';
  isTyping: boolean = false;
  messageArray = [{ message:'message1', user: 'username'}, { message: 'message2', user: 'user2'}];
  roomName: string = '';

  constructor(private chatService: ChatService, private readonly route: ActivatedRoute) {
    this.chatService.newMessageReceived().subscribe(data => {
      console.log('new message received', data);
    });
    this.chatService.receivedTyping().subscribe(bool => {
      console.log('receivedtyping event', bool)
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.roomName = params['id'];
    });

    this.chatService.joinRoom({ user: this.username, roomName: this.roomName });
    // this.chatService.get(this.roomName).subscribe(res => {
    //   console.log('room chat res', res);
    // });
  }

  sendMessage() {
    this.chatService.sendMessage({ roomName: this.roomName, user: this.username, message: this.message });
    this.message = '';
  }

  typing() {
    console.log('typing...')
    this.chatService.typing({ roomName: this.roomName, user: this.username });
  }

}
