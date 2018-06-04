import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor (private navController: NavController){}

  onNewRecipe(){
    this.navController.push(EditRecipePage, {mode: 'New'});
  }
}
