import { InMemoryDbService } from "angular-in-memory-web-api";

import { Server } from "./server.model";
import { User } from "./user.model";

export class InMemoryService implements InMemoryDbService {
  createDb() {
    let servers: Server[] = [
      { id: 1, name: "Production Server", status: "online" },
      { id: 2, name: "QA Server", status: "offline" },
      { id: 3, name: "Dev Server", status: "online" },
    ];

    let users: User[] = [
      { id: 1, name: "Sai", email: "sai@test.com" },
      { id: 2, name: "Subash", email: "subash@test.com" },
      { id: 3, name: "Penneru", email: "penneru@test.com" },
    ];

    return { servers, users };
  }
}
