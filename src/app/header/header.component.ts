import { Component } from '@angular/core';
import {DataStorageService} from '../shared/data-storage.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private dsSer: DataStorageService) {
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
}
