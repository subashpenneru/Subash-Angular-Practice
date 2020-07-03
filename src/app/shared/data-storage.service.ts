import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {exhaustMap, map, take, tap} from 'rxjs/operators';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private URL = 'https://recipe-5595.firebaseio.com/';

  constructor(private http: HttpClient, private recipeSer: RecipeService,
              private authSer: AuthService) {
  }

  storeRecipes() {
    const recipes = this.recipeSer.getRecipes();
    return this.http.put(`${this.URL}recipes.json`, recipes);
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(`${this.URL}recipes.json`)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => this.recipeSer.setRecipes([...recipes]))
      );
  }
}
