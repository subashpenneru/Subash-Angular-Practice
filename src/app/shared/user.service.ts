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
      age: this.generateAge(),
    },
    {
      name: "user2",
      id: this.generateId(),
      age: this.generateAge(),
    },
    {
      name: "user3",
      id: this.generateId(),
      age: this.generateAge(),
    },
    {
      name: "user4",
      id: this.generateId(),
      age: this.generateAge(),
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

  generateAge() {
    return Math.round(Math.random() * 50);
  }

  getUsers() {
    return this.usersData;
  }

  selectedId = new BehaviorSubject("");

  getSelectedUser(id: string) {
    return this.usersData.find((user) => user.id === id);
  }
}
