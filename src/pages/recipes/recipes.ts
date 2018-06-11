import { RecipePage } from './../recipe/recipe';
import { RecipesService } from './../../service/recipe';
import { Recipe } from './../../models/recipe';
import { EditRecipePage } from './../edit-recipe/edit-recipe';
import { NavController, LoadingController, AlertController, PopoverController } from 'ionic-angular';
import { Component } from '@angular/core';
import { DataBaseOptionsPage } from '../database-options/database-options';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {


  recipes: Recipe[];

  constructor(private navController: NavController, private recipesService: RecipesService,
    private alertController: AlertController,
    private authService: AuthService,
    private popOverController: PopoverController,
    private loadingController: LoadingController) { }

  ionViewWillEnter() {
    this.carregarRecipes();
  }

  onNewRecipe() {
    this.navController.push(EditRecipePage, { mode: 'Nova' });
  }

  onLoadRecipe(recipe: Recipe, index: number) {
    this.navController.push(RecipePage, { recipe: recipe, index: index });
  }

  private carregarRecipes() {
    this.recipes = this.recipesService.retrieveAll();
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
            this.recipesService.fetchList(token)
              .subscribe((list: Recipe[]) => {
                if (list) {
                  this.recipes = list;
                } else {
                  this.recipes = [];
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
            this.recipesService.storeList(token)
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

  private handleError(error: string) {
    const alert = this.alertController.create({
      title: "Erro",
      message: error,
      buttons: ['Ok']
    });
    alert.present();
  }
}
