import { PostService } from './../core/post.service';
import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  searchVal: string;
  constructor(private postService:PostService) { }

  ngOnInit() {

  }

  searchClicked() {
    console.log(this.searchVal);
    this.postService.search(this.searchVal).subscribe(post => {
      console.log(post);
    });
  }

}
