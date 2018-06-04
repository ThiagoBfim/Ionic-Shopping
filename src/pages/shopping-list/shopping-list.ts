import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../service/shopping';
import { Ingredient } from '../../models/Ingredient';
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItens: Ingredient[];

  constructor(public shoppingListService: ShoppingListService) { }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.ingredientQtd);
    form.reset();
    this.loadItens();
  }

  ionViewWillEnter() {
    this.loadItens();
  }

  onRemoveItem(index: number){
    this.shoppingListService.removeIten(index);
    this.loadItens();
  }

  private loadItens() {
    this.listItens = this.shoppingListService.retrieveAll();
  }
}
