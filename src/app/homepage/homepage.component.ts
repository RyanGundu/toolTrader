import {  PostService } from './../core/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  constructor(private postService : PostService) { }

  ngOnInit() {
    this.postService.getPosts().subscribe(posts => {
      console.log(posts);
    });
  }

}
