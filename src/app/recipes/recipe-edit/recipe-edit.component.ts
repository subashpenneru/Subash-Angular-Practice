import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private recipeSer: RecipeService,
              private router: Router) { }

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
      const recipe = this.recipeSer.getRecipe(this.id);
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
    // const { name, imagePath, description, ingredients } = this.recipeForm.value;
    // const newRecipe = new Recipe(name, imagePath, description, ingredients);

    if (this.editMode) {
      this.recipeSer.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeSer.addRecipe(this.recipeForm.value);
    }
    this.onCancel();
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
