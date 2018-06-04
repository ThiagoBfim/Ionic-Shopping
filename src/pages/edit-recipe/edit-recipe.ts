import { NavParams } from 'ionic-angular';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  mode = 'New';
  selectOptions = ['Fácil', 'Médio', 'Difícil']
  recipeForm: FormGroup

  constructor(private navParams: NavParams) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  onSubmit(){

  }

  private initForm() {
    this.recipeForm = new FormGroup({
      'titulo': new FormControl(null, Validators.required),
      'descricao': new FormControl(null, Validators.required),
      'dificuldade': new FormControl('Medium', Validators.required)
    });
  }

}

