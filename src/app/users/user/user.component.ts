import { Component, Input } from "@angular/core";
import { User } from "src/app/shared/user.model";
import { UserService } from "src/app/shared/user.service";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent {
  @Input() userInfo: User;

  constructor(private userServ: UserService) {}

  sendUserInfo(id: string) {
    this.userServ.selectedId.next(id);
  }
}
