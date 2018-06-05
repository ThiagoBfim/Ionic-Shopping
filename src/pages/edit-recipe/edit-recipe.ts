import { NavParams, ActionSheetController, AlertController, Button, ToastController } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['Fácil', 'Médio', 'Difícil']
  recipeForm: FormGroup

  constructor(private navParams: NavParams,
    private actionSheetController: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  onSubmit() {

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
            const fArray: FormArray = <FormArray>this.recipeForm.get('ingredients');
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
            (<FormArray>this.recipeForm.get('ingredients')).push(new FormControl(data.name, Validators.required));
           this.createAndShowToasty("Item adicioando");

          }
        }
      ]
    });
  }

  private createAndShowToasty(mensagem: string){
    const toast = this.toastCtrl.create({
      message: mensagem,
      duration: 1500,
      position: 'bottom'
    });
    toast.present();
  }

  private initForm() {
    this.recipeForm = new FormGroup({
      'titulo': new FormControl(null, Validators.required),
      'descricao': new FormControl(null, Validators.required),
      'dificuldade': new FormControl('Medium', Validators.required),
      'ingredients': new FormArray([])
    });
  }

}

