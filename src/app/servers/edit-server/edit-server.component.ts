import { Component, OnInit } from '@angular/core';
import { Server } from 'src/app/shared/server.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { DataService } from 'src/app/shared/data.service';
import { CanComponentDeactivate } from '../can-deactivate.guard';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanComponentDeactivate {

  server: Server;
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(private route: ActivatedRoute, private dataServ: DataService,
    private router: Router) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe((queryParams: Params) => {
      this.allowEdit = queryParams['allowEdit'] === '1' ? true : false;
    })

    const id = this.route.snapshot.params['id'];
    this.dataServ.getSingleServer(+id).subscribe(res => {
      this.server = res
      this.serverStatus = this.server.status;
    });
    this.route.params.subscribe(param => {
      this.dataServ.getSingleServer(+param['id']).subscribe(res => {
        this.server = res
        this.serverStatus = this.server.status;
      });
    })
  }

  onUpdateServer() {

    this.server.status = this.serverStatus;
    
    this.dataServ.updateSingleServer(this.server.id, this.server).subscribe(res => {
      this.changesSaved = true;
      this.dataServ.isServerUpdated.next(true);
      this.router.navigate(['/servers']);
    }, err => console.log(err));

  }

  canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {

    if(!this.allowEdit) {
      return true;
    }
    if((this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes!');
    } else return true;
  }

}
