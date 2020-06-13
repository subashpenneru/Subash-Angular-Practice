import { Injectable } from '@angular/core';
import { Server } from '../shared/server.model';

@Injectable({
  providedIn: 'root'
})
export class ServerService {

  private servers: Server[] = [
    { id: 1, name: 'Production Server', status: 'online' },
    { id: 2, name: 'QA Server', status: 'offline' },
    { id: 3, name: 'Dev Server', status: 'online' }
  ];

  constructor() { }

  getServers() {
    return this.servers;
  }

  getSingleServer(id: number) {
    return this.servers.find(server => server.id === id);
  }

  updateServer(id: number, serverData: { serverName: string, serverStatus: string }) {
    const serverId = this.servers.findIndex(server => server.id === id);

    if(serverId >= 0) {
      this.servers[serverId].name = serverData.serverName;
      this.servers[serverId].status = serverData.serverStatus;
    }
  }
}
