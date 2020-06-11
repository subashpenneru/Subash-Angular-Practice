import { Component } from '@angular/core';
import { User } from './shared/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  usersData: User[] = [
    { name: 'user1', id: this.generateId(), age: Math.round(Math.random() * 50) },
    { name: 'user2', id: this.generateId(), age: Math.round(Math.random() * 50) },
    { name: 'user3', id: this.generateId(), age: Math.round(Math.random() * 50) },
    { name: 'user4', id: this.generateId(), age: Math.round(Math.random() * 50) },
  ];

  generateId() {
    const alphabets = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let id = '';
    for(let i=0;i<4;i++) {
      id += alphabets[Math.round(Math.random() * alphabets.length)];
    };

    return id;
  }

}
