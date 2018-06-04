import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../service/shopping';
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {


  constructor(public shoppingListService: ShoppingListService){}

  onAddItem(form: NgForm){
    this.shoppingListService.addItem(form.value.ingredientName, form.value.ingredientQtd);
    form.reset();
  }


}
