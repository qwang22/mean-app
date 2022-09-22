import { Component, OnInit } from '@angular/core';
import { ChatService } from '../service/chat.service';

@Component({
  selector: 'app-chatroom',
  templateUrl: './chatroom.component.html',
  styleUrls: ['./chatroom.component.scss']
})
export class ChatroomComponent implements OnInit {

  message: string = '';
  username = 'username'
  isTyping = false;
  messageArray = [{ message:'message1', user: 'username'}, { message: 'message2', user: 'user2'}];
  chatroom = 'chatroom'

  constructor(private chatService: ChatService) {
    this.chatService.newMessageReceived().subscribe(data => {
      console.log('new message received', data);
    });
    this.chatService.receivedTyping().subscribe(bool => {
      console.log('receivedtyping event', bool)
    })
  }

  ngOnInit(): void {
  }

  sendMessage() {
    this.chatService.sendMessage({room: this.chatroom, user: 'user', message: this.message});
    this.message = '';
  }

  typing() {
    console.log('typing...')
    this.chatService.typing({room: this.chatroom, user: 'user'});
  }

}
