import { AngularFirestore } from 'angularfire2/firestore';
import { FirebaseUserModel } from './../core/user.model';
import { ProfileModel } from './../core/profile.model';
import { ProfileService } from './../core/profile.service';
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
  profileModel: ProfileModel = {
    firstName: "",
    lastName: "",
    address: "",
    phoneNumber: "",
    email: "",
    imgURL: "",
    username: ""
  }
  public isValidUsername = true;
  public errorMessage = "";
  public isError = false;
  public termsOfUse = false;

  constructor(
    public authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    public db: AngularFirestore,
    private userService : UserService,
    private profileService: ProfileService
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

  userAgreement(event) {
    if ( event.target.checked ) {
        this.termsOfUse = true;
    } else {
      this.termsOfUse = false;
    }
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
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i
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
    if (!mailformat.test(value.email)) { //check for valid email format
      this.errorMessage = "Invalid Email";
      this.isError = true;
      return;
    }
    if (value.password.length < 6) { //password a minimum of 6 characters
      this.errorMessage = "Password must be at least 6 characters";
      this.isError = true;
      return;
    }
    if (!this.termsOfUse) {
      this.errorMessage = "All members must agree to the terms of use";
      this.isError = true;
      return;
    }

    this.validUsername(value);
  }
  

  validUsername(value) {
    this.db.firestore.collection('user').doc(this.registerForm.get('username').value).get()
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
      this.updateUserModel();
      this.updateProfileModel();
      this.userService.addUser(this.firebaseUserModel);
      this.profileService.createUserProfile(this.profileModel);
      this.router.navigate(['/']);
    }, err => {
      console.log(err);
    })
  }

  updateUserModel() {
    this.firebaseUserModel.email = this.registerForm.get('email').value;
    this.firebaseUserModel.firstName = this.registerForm.get('firstName').value;
    this.firebaseUserModel.lastName = this.registerForm.get('lastName').value;
    this.firebaseUserModel.username = this.registerForm.get('username').value;
  }
  updateProfileModel() {
    this.profileModel.firstName = this.registerForm.get('firstName').value;
    this.profileModel.lastName = this.registerForm.get('lastName').value;
    this.profileModel.email = this.registerForm.get('email').value;
    this.profileModel.imgURL = "";
    this.profileModel.phoneNumber = "";
    this.profileModel.address = "";
    this.profileModel.username = this.registerForm.get('username').value;
  }

  setValidUserTrue() {
    this.isValidUsername = true;
  }
  
  onSubmit() {
    console.log(this.registerForm);
  }

}
