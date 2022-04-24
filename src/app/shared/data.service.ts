import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { throwError, BehaviorSubject } from "rxjs";
import { map, catchError } from "rxjs/operators";

import { Server } from "./server.model";
import { User } from "./user.model";

@Injectable({
  providedIn: "root",
})
export class DataService {
  isServerUpdated = new BehaviorSubject(false);
  navigationLoading = new BehaviorSubject(false);
  childNavigationLoading = new BehaviorSubject(false);

  constructor(private http: HttpClient) {}

  getServers() {
    return this.http.get<Server[]>("api/servers").pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  getSingleServer(id: number) {
    return this.http.get<Server[]>("api/servers").pipe(
      map((server) => server.find((server) => server.id === id)),
      catchError(this.handleError)
    );
  }

  updateSingleServer(id: number, serverData: Server) {
    return this.http.put(`api/servers/${id}`, serverData).pipe(
      map((res) => res),
      catchError(this.handleError)
    );
  }

  getUsers() {
    return this.http.get<User[]>("api/users").pipe(
      map((res) => {
        res.forEach((user) => {
          if (user.id === 2) {
            user["role"] = "Admin";
          } else {
            user["role"] = "Developer";
          }
        });
        return res;
      }),
      catchError(this.handleError)
    );
  }

  handleError(err: HttpErrorResponse) {
    return throwError(
      err.error ? err.error.message : err.message || "Server Error"
    );
  }
}
