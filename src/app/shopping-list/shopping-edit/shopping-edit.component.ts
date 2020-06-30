import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {Subscription} from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {

  @ViewChild('f', {static: true}) slForm: NgForm;
  editSub: Subscription;
  editMode = false;
  editedItemIndex: number;
  editedItem: Ingredient;

  constructor(private slSer: ShoppingListService) { }

  ngOnInit(): void {
    this.editSub = this.slSer.startedEditing.subscribe(
      (index: number) => {
        this.editedItemIndex = index;
        this.editedItem = this.slSer.getIngredient(index);
        this.editMode = true;
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  onAddItem(form: NgForm) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.slSer.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.slSer.addIngredient(newIngredient);
    }
    this.onClear();
  }

  onClear() {
    this.slForm.reset();
    this.editMode = false;
  }

  onDelete() {
    this.slSer.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.editSub.unsubscribe();
  }

}
