import { RecipePage } from './../recipe/recipe';
import { RecipesService } from './../../service/recipe';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { NavController } from 'ionic-angular';
import { Component } from '@angular/core';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {


  recipes: Recipe[];

  constructor(private navController: NavController, private recipesService: RecipesService) { }

  ionViewWillEnter() {
    this.carregarRecipes();
  }

  onNewRecipe() {
    this.navController.push(EditRecipePage, { mode: 'New' });
  }

  onLoadRecipe(recipe: Recipe, index: number){
    this.navController.push(RecipePage, {recipe: recipe, index: index});
  }

  private carregarRecipes() {
    this.recipes = this.recipesService.retrieveAll();
  }
}
