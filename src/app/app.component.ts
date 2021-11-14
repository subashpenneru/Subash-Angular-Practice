import { Component } from "@angular/core";
import { AppSubjectService } from "./app-subject.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  constructor(private appSub: AppSubjectService) {
    this.appSub.userSub.subscribe((res) => console.log("[APP Subject]", res));
    this.appSub.userBehSub.subscribe((res) => console.log("[APP Behav]", res));
    this.appSub.userReplaySub.subscribe((res) =>
      console.log("[APP Replay]", res)
    );
    this.appSub.userAsyncSub.subscribe((res) =>
      console.log("[APP Async]", res)
    );
  }

  onAddUser() {
    const obj1 = {
      name: "Server1",
      age: this.getAge(),
    };
    const obj2 = {
      name: "Server2",
      age: this.getAge(),
    };
    const obj3 = {
      name: "Server3",
      age: this.getAge(),
    };

    this.appSub.userSub.next(obj1);
    this.appSub.userSub.next(obj2);
    this.appSub.userSub.next(obj3);

    this.appSub.userBehSub.next(obj1);
    this.appSub.userBehSub.next(obj2);
    this.appSub.userBehSub.next(obj3);

    this.appSub.userReplaySub.next(obj1);
    this.appSub.userReplaySub.next(obj2);
    this.appSub.userReplaySub.next(obj3);

    this.appSub.userAsyncSub.next(obj1);
    this.appSub.userAsyncSub.next(obj2);
    this.appSub.userAsyncSub.next(obj3);
    this.appSub.userAsyncSub.complete(); // comment this line to see Async Subject working effect

    this.appSub.userSub.subscribe((res) =>
      console.log("[APP func Subject]", res)
    );
    this.appSub.userBehSub.subscribe((res) =>
      console.log("[APP func Behav]", res)
    );
    this.appSub.userReplaySub.subscribe((res) =>
      console.log("[APP func Replay]", res)
    );
    this.appSub.userAsyncSub.subscribe((res) =>
      console.log("[APP func Async]", res)
    );
  }

  getAge = () => {
    return Math.floor(Math.random() * 50);
  };
}
