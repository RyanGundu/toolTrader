import { Component, OnInit } from '@angular/core';
import {  PostService } from './../core/post.service';
import { PostModel } from './../core/post.model';
import { ProfileUserComponent } from '../profile-user/profile-user.component';
import { getViewData } from '../../../node_modules/@angular/core/src/render3/instructions';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  userPosts: PostModel[];

  constructor(private postService : PostService) {}

  ngOnInit() {
    
    this.postService.getUserPosts().subscribe(userPosts => {
      this.userPosts = userPosts;
    });
    
  }


}
