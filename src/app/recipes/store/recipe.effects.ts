import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {HttpClient} from '@angular/common/http';
import {map, switchMap, withLatestFrom} from 'rxjs/operators';
import {Store} from '@ngrx/store';

import * as RecipesActions from './recipe.actions';
import {Recipe} from '../recipe.model';
import {environment} from '../../../environments/environment';
import * as fromApp from '../../store/app.reducer';

@Injectable()
export class RecipeEffects {
  constructor(private actions$: Actions, private http: HttpClient,
              private store: Store<fromApp.AppState>) {
  }

  @Effect()
  fetchRecipes = this.actions$.pipe(
    ofType(RecipesActions.FETCH_RECIPES),
    switchMap(() => this.http.get<Recipe[]>(`${environment.apiUrl}recipes.json`)),
    map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }),
    map(recipes => new RecipesActions.SetRecipes(recipes))
  );

  @Effect({dispatch: false})
  storeRecipes = this.actions$.pipe(
    ofType(RecipesActions.STORE_RECIPES),
    withLatestFrom(this.store.select('recipes')),
    switchMap(([actionData, recipesState]) => {
      return this.http.put(`${environment.apiUrl}recipes.json`, recipesState.recipes);
    })
  );
}
