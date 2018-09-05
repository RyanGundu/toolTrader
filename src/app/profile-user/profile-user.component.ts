import { first } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import {  PostService } from './../core/post.service';

@Component({
  selector: 'app-profile-user',
  templateUrl: './profile-user.component.html',
  styleUrls: ['./profile-user.component.css']
})
export class ProfileUserComponent implements OnInit {

  userInfo: any;
  public email = "";
  public firstName = "";
  public lastName = "";
  public phone = "-";
  public address  = "-";
  public imgURL = "http://www.sunshineglobalhospitals.com/xadmin/myaccount/upload/default/profiledefault.png";

  constructor(private postService : PostService) { 
    this.postService.getUserInfo().subscribe(userInfo => {
      this.email = userInfo[0].email;
      this.firstName = userInfo[0].firstName;
      this.lastName = userInfo[0].lastName;
      if(userInfo[0].phoneNumber != "") {
        this.phone = userInfo[0].phoneNumber;
      }
      if (userInfo[0].address != "") {
        this.address = userInfo[0].address;
      }
      if (userInfo[0].imgURL != "") {
        this.imgURL = userInfo[0].imgURL;
      }
      
    });
  }

  ngOnInit() {
    
  }

}
