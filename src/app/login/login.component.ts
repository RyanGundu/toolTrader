import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params  } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  resetPassword = false;
  isEmail = true;
  
  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ['', Validators.required ],
      password: ['',Validators.required]
    });
  }

  // tryFacebookLogin(){
  //   this.authService.doFacebookLogin()
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   })
  // }

  // tryTwitterLogin(){
  //   this.authService.doTwitterLogin()
  //   .then(res => {
  //     this.router.navigate(['/user']);
  //   })
  // }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res => {
      this.router.navigate(['/user']);
    })
  }

  tryLogin(value){
    this.authService.doLogin(value)
    .then(res => {
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
      // this.errorMessage = err.message;
    })
  }

  verifyEmail(email) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(email);
  }

  sendResetEmail(email) {
    if (this.verifyEmail(email)) {
      this.authService.resetPassword(email)
        .then(() => {
          this.isEmail = true;
          this.resetPassword = true})
        .catch(_error => {
          // this.resetError = _error
          console.log(_error);
        })
    } else {
        console.log("invalid email");
        this.isEmail = false;
        this.resetPassword = false;

    }
  }

  setIsEmailTrue() {
    this.isEmail = true;
    this.resetPassword = false;
  }



}
