import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  server = { name: 'server1', status: 'online' };

  onChangeStatus() {
    this.server.status = 'offline';
  }

  onChange() {
    this.server = { name: 'server2', status: 'online' };
  }
}
