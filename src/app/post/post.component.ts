import { Component, OnInit, OnDestroy  } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import {  PostService } from './../core/post.service';
import { PostModel } from './../core/post.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit, OnDestroy {

  postID: number;
  post: PostModel[];
  private sub: any;

  public adTitle = "";
  public email = "";
  public phone = "";
  public price = "";
  public address  = "";
  public description = "";

  constructor(private route: ActivatedRoute, private postService : PostService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      console.log(params);
      this.postID = params['postID'];

      this.postService.getPost(this.postID).subscribe(post => {
        this.post = post;
        if (this.post.length > 0) {
          this.adTitle = this.post[0].adTitle;
          this.email = this.post[0].email;
          this.phone = this.post[0].price;
          this.price = this.post[0].price;
          this.address = this.post[0].address;
          this.description = this.post[0].description;
        }
      });

    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
