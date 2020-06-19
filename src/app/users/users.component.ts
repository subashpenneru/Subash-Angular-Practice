import { Component, OnInit } from '@angular/core';
import { DataService } from '../shared/data.service';
import { User } from '../shared/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users: User[];

  constructor(private dataServ: DataService) { 
    this.dataServ.navigationLoading.next(false);
  }

  ngOnInit(): void {
    this.dataServ.getUsers().subscribe(res => {
      this.users = res;
    })
  }

  getUserRoleClass(role: string) {
    return {
      active: role === 'Admin' ? true : false,
      disabled: role === 'Developer' ? true : false
    }
  }

}
