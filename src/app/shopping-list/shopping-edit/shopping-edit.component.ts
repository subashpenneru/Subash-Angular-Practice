import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import {Store} from '@ngrx/store';
import * as SLActions from '../store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: true}) slForm: NgForm;
  editSub: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.editSub = this.store.select('shoppingList').subscribe(state => {
      if (state.editedIngredientIndex > -1) {
        this.editMode = true;
        this.editedItem = state.editedIngredient;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      } else {
        this.editMode = false;
      }
    });
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(new SLActions.UpdateIngredient(newIngredient));
    } else {
      this.store.dispatch(new SLActions.AddIngredient(newIngredient));
    }
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
    this.store.dispatch(new SLActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new SLActions.DeleteIngredient());
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe();
    this.store.dispatch(new SLActions.StopEdit());
  }

}
