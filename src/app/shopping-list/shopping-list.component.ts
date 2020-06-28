import {Component, OnDestroy, OnInit} from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import {ShoppingListService} from './shopping-list.service';
import {Subscription} from 'rxjs/index';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  ingredients: Ingredient[];
  private ingChangeSub: Subscription;

  constructor(private slSer: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.slSer.getIngredients();
    this.ingChangeSub = this.slSer.ingredientsChanged
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      });
  }

  ngOnDestroy() {
    this.ingChangeSub.unsubscribe();
  }
}
