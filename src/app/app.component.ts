import { Component, OnInit } from "@angular/core";
import { User } from "./shared/user.model";
import { UserService } from "./shared/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent implements OnInit {
  usersData: User[];
  sliderValue = 10;

  constructor(private userServ: UserService) {}

  ngOnInit() {
    this.usersData = this.userServ.getUsers();
  }
}
