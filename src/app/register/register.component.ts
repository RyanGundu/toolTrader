import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseUserModel } from './../core/user.model';
import { UserService } from './../core/user.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../core/auth.service';
import { Router, Params  } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { RegisterValidation } from './register-validation';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  firebaseUserModel: FirebaseUserModel = {
    firstName: '',
    lastName: '',
    username: '',
    email: ''
  }
  public isValidUsername = true;
  public errorMessage = "";
  public isError = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public db: AngularFirestore,
    private userService : UserService
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required ],
      lastName: ['', Validators.required ],
      email: ['', Validators.required ],
      username: ['', Validators.required ],
      password: ['',Validators.required],
      confirmPassword: ['', Validators.required]
    }, {
      validator: RegisterValidation.MatchPassword // your validation method
    });
  }

  // tryFacebookLogin(){
  //   this.authService.doFacebookLogin()
  //   .then(res =>{
  //     this.router.navigate(['/user']);
  //   }, err => console.log(err)
  //   )
  // }

  // tryTwitterLogin(){
  //   this.authService.doTwitterLogin()
  //   .then(res =>{
  //     this.router.navigate(['/user']);
  //   }, err => console.log(err)
  //   )
  // }

  tryGoogleLogin(){
    this.authService.doGoogleLogin()
    .then(res =>{
      this.router.navigate(['/user']);
    }, err => console.log(err)
    )
  }

  formValidation (value) {
    let values = [
      value.firstName, 
      value.lastName, 
      value.email, 
      value.username, 
      value.password,
      value.confirmPassword
    ];
    let inValid = /\s/;
    this.isError = false;
    for (let val of values) {
      if(inValid.test(val)) { //if key contains a space
        this.errorMessage = "Spaces are not allowed";
        this.isError = true;
        return;
      } else if (val === "") {
        this.errorMessage = "All fields are required";
        this.isError = true;
        return;
      }
    }
    this.validUsername(value);
  }

  validUsername(value) {
    this.db.firestore.collection('user').doc(this.firebaseUserModel.username).get()
    .then(docSnapshot => {
      if (docSnapshot.exists) {
      this.isValidUsername = false;
       console.log("exists");
      }
      else {
        this.tryRegister(value);
        this.isValidUsername = true;
        console.log("not exists");
      }
    });
  }

  tryRegister(value){
    this.authService.doRegister(value)
    .then(res => {
      console.log(res);
      // this.errorMessage = "";
      // this.successMessage = "Your account has been created";

      this.userService.addUser(this.firebaseUserModel);
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
      // this.errorMessage = err.message;
      // this.successMessage = "";
    })
  }

  setValidUserTrue() {
    this.isValidUsername = true;
  }
  
  onSubmit() {
    console.log(this.registerForm);
  }

}
