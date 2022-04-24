import { Component } from "@angular/core";

@Component({
  selector: "app-home",
  template: `<div class="main-home">
    <h1>Welcome to Server Manager</h1>
  </div>`,
  styles: [
    `
      .main-home {
        margin: 0 10px;
      }
    `,
  ],
})
export class HomeComponent {
  constructor() {}
}
