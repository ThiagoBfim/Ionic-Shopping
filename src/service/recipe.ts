import { AuthService } from './auth';
import { Ingredient } from './../models/Ingredient';
import { Recipe } from '../models/recipe';
import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class RecipesService {

  private recipes: Recipe[] = [];

  constructor(private http: Http, private authService: AuthService) { }

  addRecipe(title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes.push(new Recipe(title, description, difficulty, ingredients));
  }

  addRecipes(itens: Recipe[]) {
    console.log(itens);
    this.recipes.push(...itens);
  }

  retrieveAll() {
    return this.recipes.slice();
  }

  removeRecipe(index: number) {
    this.recipes.splice(index, 1);
  }

  updateRecipe(index: number, title: string, description: string, difficulty: string, ingredients: Ingredient[]) {
    this.recipes[index] = new Recipe(title, description, difficulty, ingredients);
  }

  storeList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .put('https://ionic-livroreceitas.firebaseio.com/' + userId + '/recipe-list.json?auth=' + token, this.recipes)
      .map((response: Response) => {
        return response.json();
      });
  }

  fetchList(token: string) {
    const userId = this.authService.getActiveUser().uid;
    return this.http
      .get('https://ionic-livroreceitas.firebaseio.com/' + userId + '/recipe-list.json?auth=' + token)
      .map((response: Response) => {
        const recipelist: Recipe[] = response.json ? response.json() : [];
        recipelist.forEach( recipe => {
          if(!recipe.hasOwnProperty('ingredients')){
            recipe.ingredients = [];
          }
        })
        return recipelist;
      }).do((recipes: Recipe[]) => {
        if (recipes) {
          this.recipes = recipes;
        } else {
          this.recipes = [];
        }
      });
  }

}
