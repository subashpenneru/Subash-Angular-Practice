import { Component, OnInit } from '@angular/core';
import { Server } from '../shared/server.model';
import { ServerService } from './server.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  serversData: Server[];

  constructor(private serverServ: ServerService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.serversData = this.serverServ.getServers();
  }

  getServerStatusColor(status) {
    return {
      'Online': status === 'online',
      'Offline': status === 'offline'
    }
  }

  navigateToServer(id: number) {
    this.router.navigate([id], { relativeTo: this.route })
  }

}
