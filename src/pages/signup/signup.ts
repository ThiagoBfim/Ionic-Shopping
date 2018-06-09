import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(private authService: AuthService) {

  }

  onSingup(form: NgForm) {
    this.authService.singup(form.value.email, form.value.password)
    .then(
      data => console.log(data)
    ).catch(error => console.log(error));
  }

}
