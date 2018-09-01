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
  
  constructor(private postService : PostService) {}

  ngOnInit() {
    
    this.postService.getUserPosts().subscribe(userPosts => {
      this.userPosts = userPosts;
    });
    
  }

  scrollHandler(e) {
    console.log(e)
    // should log top or bottom
  }


}
