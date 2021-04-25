import { Component } from "@angular/core";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  users = [
    {
      name: "Sai Subash",
      age: 25,
      email: "subash@gmail.com",
    },
    {
      name: "John Doe",
      age: 28,
      email: "jdoe@gmail.com",
    },
    {
      name: "Karl Max",
      age: 35,
      email: "max@gmail.com",
    },
    {
      name: "somesh",
      age: 29,
      email: "somesh@gmail.com",
    },
  ];
}
