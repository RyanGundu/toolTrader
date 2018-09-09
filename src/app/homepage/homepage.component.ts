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
  flag: boolean;
  totalPosts: any;
  lastPostOnPage: any;
  constructor(private postService : PostService) { 
    this.postService.getPostCount().subscribe(count =>
      {
        this.totalPosts = count[0];
      });
  }

  ngOnInit() {
    this.lastPostOnPage = 5;
    this.pgCount = 0;
    this.postService.getPosts("0").subscribe(posts => {
      this.posts = posts;
    });
  }

  next() {
    this.lastPostOnPage += 5;
    this.pgCount++;
    this.postService.next().subscribe(posts => {
      this.posts = posts;
    });
  }

  previous() {
    this.lastPostOnPage -= 5;
    this.pgCount--;
    this.postService.previous(this.pgCount).subscribe(posts => {
      this.posts = posts;
    });
  }


}
