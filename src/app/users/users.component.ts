import { Component, Input } from '@angular/core';
import { User } from '../shared/user.model';
import { UserService } from '../shared/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {

  @Input('users') usersData: User[];

  selected: User;

  constructor(private userServ: UserService) {
    this.userServ.selectedId.subscribe(id => {
      if(id) {
        this.selected = this.userServ.getSelectedUser(id);
      }
    })
  }
}
