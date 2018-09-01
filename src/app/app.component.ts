import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PaginationService } from './pagination.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Tool Trader';

  constructor(public page: PaginationService) {}

  ngOnInit() {

  }

  scrollHandler(e) {
    console.log(e);
  }

}

