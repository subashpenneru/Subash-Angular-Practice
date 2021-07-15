import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root",
})
export class TableUsersService {
  constructor(private http: HttpClient) {}

  getUsers(page = 0, size = 10) {
    // return this.http.get(`https://jsonplaceholder.typicode.com/todos`);
    return this.http.get(
      `https://api.instantwebtools.net/v1/passenger?page=${page}&size=${size}`
    );
  }
}
