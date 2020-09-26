import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  server = { name: "server1", status: "online" };
  serverList = [
    { name: "Server 1", status: "offline" },
    { name: "Server 2", status: "online" },
    { name: "Server 3", status: "online" },
  ];

  onChangeStatus() {
    this.server.status = "offline";
  }

  onChange() {
    this.server = { name: "server2", status: "online" };
    // this.server.name = "server2"; // this line will not call ngOnChanges
  }
}
