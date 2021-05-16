import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private usersData: User[] = [
    {
      name: "user1",
      id: this.generateId(),
      age: Math.round(Math.random() * 50),
    },
    {
      name: "user2",
      id: this.generateId(),
      age: Math.round(Math.random() * 50),
    },
    {
      name: "user3",
      id: this.generateId(),
      age: Math.round(Math.random() * 50),
    },
    {
      name: "user4",
      id: this.generateId(),
      age: Math.round(Math.random() * 50),
    },
  ];

  generateId() {
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let id = "";
    for (let i = 0; i < 4; i++) {
      id += alphabets[Math.round(Math.random() * (alphabets.length - 1))];
    }

    return id;
  }

  getUsers() {
    console.log(this.usersData);
    return this.usersData;
  }

  selectedId = new BehaviorSubject("");

  getSelectedUser(id: string) {
    return this.usersData.find((user) => user.id === id);
  }
}
