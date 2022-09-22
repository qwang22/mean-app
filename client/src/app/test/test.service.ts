import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  private socket = io('http://localhost:8080');

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    const headers = new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    });
    return this.http.get(`${environment.baseApiUrl}/test`, { headers });
  }

  joinRoom(data: any) {
    console.log('joinRoom', data)
    this.socket.emit('join', data);
  }

  sendMessage(data: any) {
    console.log('sendMessage', data)
    this.socket.emit('message', data);
  }

  newMessageReceived() {
    const observable = new Observable<{ user: String, message: String}>(observer => {
      this.socket.on('new message', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

  typing(data: any) {
    this.socket.emit('typing', data);
  }

  receivedTyping() {
    const observable = new Observable<{ isTyping: boolean}>(observer => {
      this.socket.on('typing', (data) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
    return observable;
  }

}
