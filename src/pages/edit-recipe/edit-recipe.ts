import { RecipesService } from './../../service/recipe';
import { NavParams, ActionSheetController, AlertController, ToastController, NavController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Recipe } from '../../models/recipe';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['Fácil', 'Médio', 'Difícil']
  recipeForm: FormGroup
  recipe: Recipe;
  index: number;

  constructor(private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private recipesService: RecipesService,
    private navController: NavController) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    if (this.mode == 'Edit') {
      this.recipe = this.navParams.get('recipe');
      this.index = this.navParams.get('index');
    }
    this.initForm();
  }

  onSubmit() {
    const value = this.recipeForm.value;
    let ingredientes = [];
    if (value.ingredientes.length > 0) {
      ingredientes = value.ingredientes.map(name => {
        return { name: name, amount: 1 }
      });
    }
    if (this.index != null) {
      this.recipesService.updateRecipe(this.index, value.titulo, value.descricao, value.dificuldade, ingredientes);
    } else {
      this.recipesService.addRecipe(value.titulo, value.descricao, value.dificuldade, ingredientes);
    }
    this.recipeForm.reset();
    this.navController.popToRoot();

  }

  onGerirIngredientes() {
    const actionSheet = this.actionSheetController.create({
      title: 'Escolha uma opção:',
      buttons: [
        {
          text: 'Add Ingrediente',
          handler: () => {
            this.createNewIngredientAlert().present();
          }
        },
        {
          text: 'Remover Ingrediente',
          role: 'destructive',
          handler: () => {
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredientes');
            const len = fArray.length;
            if (len > 0) {
              for (let i = len - 1; i >= 0; i--) {
                fArray.removeAt(i);
              }
              this.createAndShowToasty("Todos ingredientes foram removidos!");
            } else {
              this.createAndShowToasty("Não há nenhum ingrediente para ser removido!");
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel'
        }
      ]
    });
    actionSheet.present();
  }

  private createNewIngredientAlert() {
    return this.alertCtrl.create({
      title: "Adicionar ingredient",
      inputs: [
        {
          name: 'name',
          placeholder: 'Nome'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Add',
          handler: data => {
            if (data.name.trim() == '' || data.name == null) {
              this.createAndShowToasty("Por favor, preencha o nome antes de salvar!");
              return;
            }
            (<FormArray>this.recipeForm.get('ingredientes')).push(new FormControl(data.name, Validators.required));
            this.createAndShowToasty("Item adicioando");

          }
        }
      ]
    });
  }

  private createAndShowToasty(mensagem: string) {
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  private initForm() {
    let title = null;
    let descricao = null;
    let dificuldade = 'Médio';
    let ingredientes = [];

    if (this.recipe != null) {
      title = this.recipe.title;
      descricao = this.recipe.descricao;
      dificuldade = this.recipe.dificuldade;
      for (let ingredient of this.recipe.ingredients) {
        ingredientes.push(new FormControl(ingredient.name, Validators.required));
      }

    }

    this.recipeForm = new FormGroup({
      'titulo': new FormControl(title, Validators.required),
      'descricao': new FormControl(descricao, Validators.required),
      'dificuldade': new FormControl(dificuldade, Validators.required),
      'ingredientes': new FormArray(ingredientes)
    });
  }

}

