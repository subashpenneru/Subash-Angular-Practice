import { Component, OnInit } from '@angular/core';
import { Server } from '../shared/server.model';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {

  serversData: Server[];

  constructor(private router: Router, 
    private route: ActivatedRoute, public dataServ: DataService) { }

  ngOnInit(): void {
    this.dataServ.getServers().subscribe(res => this.serversData = [...res]);

    this.dataServ.isServerUpdated.subscribe(res => {
      if(res) {
        this.dataServ.getServers().subscribe(res => this.serversData = [...res]);
        this.dataServ.isServerUpdated.next(false);
      }
    })
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

  // navigateToEditServer(id: number) {
  //   this.router.navigate([id, 'edit'], { relativeTo: this.route })
  // }

}
