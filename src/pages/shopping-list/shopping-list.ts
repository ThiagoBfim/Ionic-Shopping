import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../service/shopping';
import { Ingredient } from '../../models/Ingredient';
import { PopoverController } from 'ionic-angular';
import { SLOptionsPage } from './sl-options/sl-options';
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItens: Ingredient[];

  constructor(public shoppingListService: ShoppingListService,
  private popOverController: PopoverController) { }

  onAddItem(form: NgForm) {
    this.shoppingListService.addItem(form.value.ingredientName, form.value.ingredientQtd);
    form.reset();
    this.loadItens();
  }

  ionViewWillEnter() {
    this.loadItens();
  }

  onRemoveItem(index: number) {
    this.shoppingListService.removeItem(index);
    this.loadItens();
  }

  onShowOptions(event: MouseEvent) {
    const popOver = this.popOverController.create(SLOptionsPage);
    popOver.present({
      ev: event
    });
  }

  private loadItens() {
    this.listItens = this.shoppingListService.retrieveAll();
  }

}
