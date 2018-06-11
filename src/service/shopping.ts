import { AuthService } from './auth';
import { Ingredient } from './../models/Ingredient';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class ShoppingListService {

  private ingredients: Ingredient[] = [];

  constructor(private http: Http, private authService: AuthService){}

  addItem(name: string, amount: number) {
    this.addIngredient(new Ingredient(name, amount));
  }

  addItens(itens: Ingredient[]) {
    itens.forEach(element => {
     this.addIngredient(element);
    });
    // this.ingredients.push(...itens);
  }

  retrieveAll() {
    return this.ingredients.slice();
  }

  removeItem(index: number) {
    this.ingredients.splice(index, 1);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
    .put('https://ionic-livroreceitas.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token, this.ingredients)
    .map((response: Response) => {
      return response.json();
    });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
    .get('https://ionic-livroreceitas.firebaseio.com/' + userId + '/shopping-list.json?auth=' + token)
    .map((response: Response) => {
      return response.json();
    }).do((data) => {
      this.ingredients = data;
    });
  }

  private addIngredient(element: Ingredient) {
    var naoPossuiElemento = true;
      this.ingredients.forEach(f => {
        if (f.name == element.name) {
          f.amount = Number(f.amount) + Number(element.amount);
          naoPossuiElemento = false;
        }
      });
      if(naoPossuiElemento) {
        this.ingredients.push(element);
      }
  }

}
