import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {  PostService } from './../core/post.service';
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  userInfo: any;
  public email = "";
  public firstName = "";
  public lastName = "";


  constructor(private postService : PostService) { 
    this.postService.getUserInfo().subscribe(userInfo => {
      this.email = userInfo[0].email;
      this.firstName = userInfo[0].firstName;
      this.lastName = userInfo[0].lastName;
    });
  }

  ngOnInit() {
    
  }

}
