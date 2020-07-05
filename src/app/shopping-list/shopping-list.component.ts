import {Component, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {Observable} from 'rxjs/index';
import {Store} from '@ngrx/store';
import * as SLActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Observable<{ingredients: Ingredient[]}>;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList');
  }

  onEditItem(index: number) {
    this.store.dispatch(new SLActions.StartEdit(index));
  }
}
