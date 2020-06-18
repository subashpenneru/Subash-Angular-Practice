import { Component, OnInit } from '@angular/core';
import { Server } from 'src/app/shared/server.model';
import { ActivatedRoute } from '@angular/router';
import { ServerService } from '../server.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  server: Server;

  constructor(private route: ActivatedRoute, private serverServ: ServerService) {
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serverServ.getSingleServer(id);
    // this.route.params.subscribe(res => {
    //   this.server = this.serverServ.getSingleServer(+res['id']);
    // })

    this.server = this.route.snapshot.data['server'];
    this.route.data.subscribe(res => this.server = res.server);
  }

  ngOnInit(): void {
  }

}
