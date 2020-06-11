import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnChanges {

  @Input('users') usersData: User[];

  selected: User;

  constructor() { }

  ngOnChanges() {
  }

  ngOnInit(): void {
  }

  getSelectedUserId(id) {
    this.selected = this.usersData.find(user => user.id === id);
  }

}
