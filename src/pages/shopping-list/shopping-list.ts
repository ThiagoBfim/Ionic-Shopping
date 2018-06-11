import { AuthService } from './../../service/auth';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ShoppingListService } from '../../service/shopping';
import { Ingredient } from '../../models/Ingredient';
import { PopoverController, LoadingController, AlertController } from 'ionic-angular';
import { DataBaseOptionsPage } from '../database-options/database-options';

@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage {

  listItens: Ingredient[];

  constructor(public shoppingListService: ShoppingListService,
    private popOverController: PopoverController,
    private authService: AuthService,
    private alertController: AlertController,
    private loadingController: LoadingController) { }

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
    const loading = this.loadingController.create({
      content: "Carregando..."
    });
    const popOver = this.popOverController.create(DataBaseOptionsPage);
    popOver.present({
      ev: event
    });
    popOver.onDidDismiss(data => {
      if (data.action == 'load') {
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.shoppingListService.fetchList(token)
              .subscribe((list: Ingredient[]) => {
                if (list) {
                  this.listItens = list;
                } else {
                  this.listItens = [];
                }
                loading.dismiss();
              },
                error => {
                  loading.dismiss();
                  this.handleError(error.message);
                })
          });
      } else if (data.action == 'store') {
        loading.present();
        this.authService.getActiveUser().getIdToken()
          .then((token: string) => {
            this.shoppingListService.storeList(token)
              .subscribe(() => {
                console.log("Sucesso")
                loading.dismiss();
              },
                error => {
                  loading.dismiss();
                  this.handleError(error.message);
                })
          });
      }
    });
  }

  private loadItens() {
    this.listItens = this.shoppingListService.retrieveAll();
  }

  private handleError(error: string){
   const alert =  this.alertController.create({
    title: "Erro",
    message: error,
    buttons: ['Ok']
    });
    alert.present();
  }
}
