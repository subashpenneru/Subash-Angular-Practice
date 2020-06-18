import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Server } from '../shared/server.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { DataService } from '../shared/data.service';

@Injectable({
    providedIn: 'root'
})
export class ServerResolver implements Resolve<Server> {

    constructor(private dataServ: DataService) {}

    resolve(
        route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot
        ): Server | Observable<Server> | Promise<Server> {
            return this.dataServ.getSingleServer(Number(route.params['id']));
    }

}