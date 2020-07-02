import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private URL = 'https://recipe-5595.firebaseio.com/';

  constructor(private http: HttpClient, private recipeSer: RecipeService) {
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
