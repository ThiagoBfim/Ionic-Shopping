import { NgForm } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from '../../service/auth';

@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(private authService: AuthService) {

  }


  onSingin(form: NgForm){

  }

}
