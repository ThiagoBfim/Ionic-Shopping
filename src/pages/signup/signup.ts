import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';
import { LoadingController, AlertController } from 'ionic-angular';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService,
    private loadingController: LoadingController,
    private alertController:AlertController) {

  }

  onSingup(form: NgForm) {
    const loading = this.loadingController.create({
      content: 'Cadastrando...'
    });
    this.authService.singup(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      }
      ).catch(error => {
        loading.dismiss();
        const alert = this.alertController.create({
          title:"Cadastro falhou!",
          message: error.message,
          buttons: ['ok']
        });
        alert.present();
      });

  }

}
