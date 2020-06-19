import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Server } from './server.model';
import { User } from './user.model';
import { map, catchError } from 'rxjs/operators';
import { throwError, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataService {

    isServerUpdated = new BehaviorSubject(false);
    navigationLoading = new BehaviorSubject(false);
    childNavigationLoading = new BehaviorSubject(false);
    
    constructor(private http: HttpClient) {}

    getServers() {
        return this.http.get<Server[]>('api/servers')
            .pipe(
                map(res => res),
                catchError(error => this.handleError(error))
            )
    }

    getSingleServer(id: number) {
        return this.http.get<Server[]>('api/servers')
            .pipe(
                map(server => server.find(server => server.id === id)),
                catchError(error => this.handleError(error))
            )
    }

    updateSingleServer(id: number, serverData: Server) {
        return this.http.put(`api/servers/${id}`, serverData)
            .pipe(
                map(res => res),
                catchError(err => this.handleError(err))
            )
    }

    getUsers() {
        return this.http.get<User[]>('api/users')
            .pipe(
                map(res => {
                    res.forEach(user => {
                        if(user.id === 2) {
                            user['role'] = 'Admin';
                        } else {
                            user['role'] = 'Developer';
                        }
                    });
                    return res;
                }),
                catchError(error => this.handleError(error))
            )
    }

    handleError(err: HttpErrorResponse) {
        return throwError(err.error ? err.error.message : err.message || 'Server Error');
    }

}