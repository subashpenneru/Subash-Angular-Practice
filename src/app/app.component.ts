import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular-Practice';

  server = { name: 'server1', status: 'online' };

  getServerName(event) {
    this.server.name = event;
  }
}
