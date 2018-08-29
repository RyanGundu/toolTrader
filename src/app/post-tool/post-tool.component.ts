import { PostService } from './../core/post.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostModel } from './../core/post.model';
import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-post-tool',
  templateUrl: './post-tool.component.html',
  styleUrls: ['./post-tool.component.css']
})
export class PostToolComponent implements OnInit {
  postForm: FormGroup;

  postModel: PostModel = {
    postType : '',
    adTitle :'',
    description : '',
    price : '',
    availability : '',
    address : '',
    images : '',
    keyword : '',
    phone : '',
    email : '',
    priceNumber: ''
  }

  constructor(
    public db: AngularFirestore,
    public postService : PostService,
    private fb: FormBuilder,
  ) {
    this.createForm();
   }

  ngOnInit() {
  }

  createForm() {
    this.postForm = this.fb.group({
      postType: ['sale', Validators.required ],
      adTitle: ['', Validators.required ],
      description: ['', Validators.required ],
      price: ['custom', Validators.required ],
      priceNumber: ['0', Validators.required ],
      availability: ['', Validators.required ],
      address: ['',Validators.required],
      keyword: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
    }, {
    });
  }

  tryPost() {
    this.updatePostModel();
    this.postService.createPost(this.postModel);
  }

  updatePostModel() {
    this.postModel.postType = this.postForm.get('postType').value;
    this.postModel.adTitle = this.postForm.get('adTitle').value;
    this.postModel.description = this.postForm.get('description').value;
    this.postModel.price = this.postForm.get('price').value;
    this.postModel.priceNumber = this.postForm.get('priceNumber').value;
    this.postModel.availability = this.postForm.get('availability').value;
    this.postModel.address = this.postForm.get('address').value;
    this.postModel.keyword = this.postForm.get('keyword').value;
    this.postModel.phone = this.postForm.get('phone').value;
    this.postModel.email = this.postForm.get('email').value;
  }

}