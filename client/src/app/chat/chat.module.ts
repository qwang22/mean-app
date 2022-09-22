import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatroomComponent } from './chatroom/chatroom.component';
import { ChatService } from './service/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatRoutingModule } from './chat-routing.module';

@NgModule({
  declarations: [
    ChatroomComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChatRoutingModule
  ],
  providers: [
    ChatService
  ]
})
export class ChatModule { }
