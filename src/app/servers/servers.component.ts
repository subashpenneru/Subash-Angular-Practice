import { Component, OnInit } from '@angular/core';
import { Server } from '../shared/server.model';
import { ServerService } from './server.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  serversData: Server[];

  constructor(private serverServ: ServerService) { }

  ngOnInit(): void {
    this.serversData = this.serverServ.getServers();
  }

  getServerStatusColor(status) {
    return {
      'Online': status === 'online',
      'Offline': status === 'offline'
    }
  }

}
