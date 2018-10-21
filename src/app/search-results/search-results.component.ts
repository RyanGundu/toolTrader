import { PostModel } from './../core/post.model';
import { PostService } from './../core/post.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {

  posts: PostModel[];
  totalPosts: number;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService,
    private router: Router) {
   this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }
  
  ngOnInit() {
    var searchVal = this.activatedRoute.snapshot.paramMap.get('searchVal');
    this.postService.search(searchVal).subscribe(posts => {
      this.posts = posts;
      this.totalPosts = this.posts.length;
    });
  }

}
