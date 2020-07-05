import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {map} from 'rxjs/operators';
import {Subscription} from 'rxjs';

import * as fromApp from '../../store/app.reducer';
import * as RecipesAction from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {

  id: number;
  editMode = false;
  recipeForm: FormGroup;
  private storeSub: Subscription;

  constructor(private route: ActivatedRoute, private router: Router,
              private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params.id;
        this.editMode = params.id != null;
        this.initForm();
      }
    );
  }

  private initForm() {
    const recipeObj = {
      recipeName: null,
      recipeImagePath: null,
      recipeDescription: null,
      recipeIngredients: new FormArray([])
    };

    if (this.editMode) {
      this.storeSub = this.store.select('recipes').pipe(
        map(recipesState => recipesState.recipes.find((recipe, i) => i === this.id))
      ).subscribe(recipe => {
        recipeObj.recipeName = recipe.name;
        recipeObj.recipeImagePath = recipe.imagePath;
        recipeObj.recipeDescription = recipe.description;
        if (recipe.ingredients) {
          recipe.ingredients.forEach(ing => {
            recipeObj.recipeIngredients.push(new FormGroup({
              name: new FormControl(ing.name, Validators.required),
              amount: new FormControl(ing.amount, [
                Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            }));
          });
        }
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeObj.recipeName, Validators.required),
      imagePath: new FormControl(recipeObj.recipeImagePath, Validators.required),
      description: new FormControl(recipeObj.recipeDescription, Validators.required),
      ingredients: recipeObj.recipeIngredients
    });
  }

  get recipeIngControls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [
        Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }));
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }

  onSubmit() {
    if (this.editMode) {
      // this.recipeSer.updateRecipe(this.id, this.recipeForm.value);
      this.store.dispatch(new RecipesAction.UpdateRecipe({
        index: this.id,
        recipe: this.recipeForm.value
      }));
    } else {
      this.store.dispatch(new RecipesAction.AddRecipe(this.recipeForm.value));
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  ngOnDestroy(): void {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}
