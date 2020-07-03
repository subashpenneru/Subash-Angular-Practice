import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {Subscription} from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {

  private userSub: Subscription;
  isAuthenticated = false;

  constructor(private dsSer: DataStorageService, private authSer: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authSer.user.subscribe(user => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.dsSer.storeRecipes().subscribe(
      res => console.log(res),
      error => console.log('Save Data Error: ', error)
    );
  }

  onFetchData() {
    this.dsSer.fetchRecipes().subscribe(
      res => console.log(res),
      err => console.log(err)
    );
  }

  onLogout() {
    this.authSer.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
