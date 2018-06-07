import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { RecipesService } from './../../service/recipe';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { Recipe } from './../../models/recipe';
import { Component, OnInit } from '@angular/core';
import { ShoppingListService } from '../../service/shopping';

@Component({
  selector: 'page-recipe',
  templateUrl: 'recipe.html',
})
export class RecipePage implements OnInit {

  recipe: Recipe;
  index: number;

  constructor(public navController: NavController,
    public navParams: NavParams,
    public recipesService: RecipesService,
  public shoppingListService: ShoppingListService,
  private toastCtrl: ToastController ) {

  }

  ngOnInit() {
    this.recipe = this.navParams.get('recipe');
    this.index = this.navParams.get('index');
  }

  onAddIngredient() {
    this.shoppingListService.addItens(this.recipe.ingredients);
    this.createAndShowToasty("Ingrediente adicionado na lista de compras.");
  }
  private createAndShowToasty(mensagem: string) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  onDeleteRecipe() {
    this.recipesService.removeRecipe(this.index);
    this.navController.popToRoot();
  }

  onEditRecipe() {
    this.navController.push(EditRecipePage, {mode: 'Editar', recipe: this.recipe, index: this.index});
  }
}
