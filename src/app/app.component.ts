import { Component } from '@angular/core';
import { of, Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  asyncData: any;
  filteredStatus = ''

  constructor() {
    this.asyncData = new Observable(this.asyncSubscriber);
  }

  servers = [
    { name: 'server1', date: new Date('2020-01-01'), status: 'online' },
    { name: 'server2', date: new Date('2020-01-02'), status: 'online' },
    { name: 'server3', date: new Date('2020-01-03'), status: 'offline' },
    { name: 'server4', date: new Date('2020-01-04'), status: 'online' },
  ]

  getServerClass(status) {
    return {
      'Online': status === 'online',
      'Offline': status === 'offline'
    }
  }

  onAddServer() {
    const length = this.servers.length;
    const newServer = {
      name: `server${length+1}`,
      date: new Date(),
      status: this.servers[length-1].status === 'offline' ? 'online' : 'offline'
    };
    this.servers.push(newServer);
  }

  asyncSubscriber = (observer) => {
    setTimeout(() => observer.next([1,2,3,4,5,6]), 5000);
  }

}
