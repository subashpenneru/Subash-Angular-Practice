import { OnInit, Component } from "@angular/core";
import { AppSubjectService } from "../app-subject.service";

@Component({
  selector: "app-server",
  template: `<p>Server Component</p>`,
})
export class ServerComponent implements OnInit {
  constructor(private appSub: AppSubjectService) {}

  ngOnInit() {
    this.appSub.userSub.next({ name: "Server Sub", age: 25 });
    this.appSub.userBehSub.next({ name: "Server Behav", age: 25 });
    this.appSub.userReplaySub.next({ name: "Server Replay", age: 25 });
    this.appSub.userAsyncSub.next({ name: "Server Async", age: 25 });
    // this.appSub.userAsyncSub.complete();

    this.appSub.userSub.subscribe((res) =>
      console.log("[SERVER OnInit Subject]", res)
    );
    this.appSub.userBehSub.subscribe((res) =>
      console.log("[SERVER OnInit Behav]", res)
    );
    this.appSub.userReplaySub.subscribe((res) =>
      console.log("[SERVER OnInit Replay]", res)
    );
    this.appSub.userAsyncSub.subscribe((res) =>
      console.log("[SERVER OnInit Async]", res)
    );
  }
}
