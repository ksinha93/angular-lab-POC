import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { SharedData } from '../shareddata.service';

@Component({
  selector: 'login-form',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  isUserValid: boolean = false;
  constructor(
    private svcData: SharedData,
    private svclogin: LoginService,
    private route: Router
  ) {
    this.svcData.getLoginStatus().subscribe((l) => {
      this.isUserValid = l;
    });
  }

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.maxLength(6),
    ]),
  });

  validateUser() {
    var user = this.form.controls['username'].value;
    var pass = this.form.controls['password'].value;

    this.svclogin.isUserValid(user, pass);
  }

  onLogOut(): void {
    this.isUserValid = false;
    this.form.controls['username'].setValue('');
    this.form.controls['password'].setValue('');
    this.svcData.sendLoginStatus(false);
  }
}
