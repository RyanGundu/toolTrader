import { PostModel } from './../core/post.model';
import {  PostService } from './../core/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  posts: PostModel[];
  constructor(private postService : PostService) { 
    
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.postService.getPosts().subscribe(posts => {
      this.posts = posts;
    });
  }


}
