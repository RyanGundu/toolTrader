import { ProfileModel } from './../core/profile.model';
import { ActivatedRoute } from '@angular/router';
import { PostService } from './../core/post.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-viewuser',
  templateUrl: './viewuser.component.html',
  styleUrls: ['./viewuser.component.css']
})
export class ViewuserComponent implements OnInit {

  currentUID:string = '';
  profileModel: ProfileModel;
  constructor(private activatedRoute:ActivatedRoute, private postService: PostService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(data => {
     this.currentUID = data['uID'];
    })

    this.postService.getUserInfo(this.currentUID, true).subscribe(data =>{
     this.profileModel = data['0'];
     console.log(this.profileModel);
    });
  }

}
