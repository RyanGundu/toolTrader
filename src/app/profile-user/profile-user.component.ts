import { Component, OnInit } from '@angular/core';
import {  PostService } from './../core/post.service';
import { FirebaseUserModel } from '../core/user.model';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  userInfo: FirebaseUserModel;

  constructor(private postService : PostService) { }

  ngOnInit() {
    this.postService.getUserInfo().subscribe(userInfo => {
      console.log(userInfo);
      this.userInfo = userInfo;
    });
  }

}
