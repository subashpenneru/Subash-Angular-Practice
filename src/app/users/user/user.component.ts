import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { User } from 'src/app/shared/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input() userInfo: User;

  @Output() selectedUser = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  sendUserInfo(id: string) {
    this.selectedUser.emit(id);
  }

}
