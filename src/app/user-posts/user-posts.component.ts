import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {  PostService } from './../core/post.service';
import { PostModel } from './../core/post.model';


import { Observable } from 'rxjs/Observable';
import { ScrollableDirective } from './../scrollable.directive';
import { LoadingSpinnerComponent } from './../loading-spinner/loading-spinner.component';
import { PaginationService } from './../pagination.service';


@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {

  userPosts: PostModel[];
  currentUID: string;
  
  constructor(private postService : PostService, private activatedRoute:ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
      this.currentUID = data['uID'];
     }) 
     
    this.postService.getUserPosts(this.currentUID ? this.currentUID : null).subscribe(userPosts => {
      this.userPosts = userPosts;
      console.log(this.userPosts);
    });
  }

  scrollHandler(e) {
    console.log(e)
    // should log top or bottom
  }


}
