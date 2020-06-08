import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  serverName = '';

  @Input('server') server: { name: string, status: string }
  @Output() changeServerName = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
    this.serverName = this.server.name;
  }

  onChange() {
    this.changeServerName.emit(this.serverName);
  }

}
