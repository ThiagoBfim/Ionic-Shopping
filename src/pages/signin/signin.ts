import { LoadingController, AlertController } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService,
    private loadingController: LoadingController,
    private alertController: AlertController) { }

  onSingin(form: NgForm) {
    const loading = this.loadingController.create({
      content:"Logando..."
    });
    loading.present();
    this.authService.singin(form.value.email, form.value.password)
      .then(data => {
        loading.dismiss();
      })
      .catch(error => {
        loading.dismiss();
        const alert = this.alertController.create({
          title:"Erro ao Logar.",
          message: error.message,
          buttons: ['ok']
        });
        alert.present();
      })
  }

}
