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
  pgCount: number;
  constructor(private postService : PostService) { 
    
  }

  ngOnInit() {
    console.log("ngOnInit");
    this.pgCount = 0;
    this.postService.getPosts("0").subscribe(posts => {
      this.posts = posts;
    });
  }

  next() {
    this.pgCount++;
    this.postService.next().subscribe(posts => {
      this.posts = posts;
    });
  }

  previous() {
    this.pgCount--;
    this.postService.previous().subscribe(posts => {
      this.posts = posts;
    });
  }


}
