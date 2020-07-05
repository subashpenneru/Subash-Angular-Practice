import { Component, OnInit, Input } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {map, switchMap} from 'rxjs/operators';

import { Recipe } from '../recipe.model';
import * as fromRecipes from '../store/recipe.reducer';
import * as RecipesActions from '../store/recipe.actions';
import * as SLActions from '../../shopping-list/store/shopping-list.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  @Input() recipe: Recipe;
  id: number;

  constructor(private route: ActivatedRoute, private router: Router,
              private store: Store<fromRecipes.RecipeState>) { }

  ngOnInit(): void {
    this.route.params.pipe(
      map(params => +params.id),
      switchMap(id => { this.id = id; return this.store.select('recipes'); }),
      map(recipesState => recipesState.recipes.find((recipe, index) => index === this.id))
    ).subscribe(recipe => this.recipe = recipe);
  }

  onAddToShoppingList() {
    this.store.dispatch(new SLActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    this.store.dispatch(new RecipesActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
