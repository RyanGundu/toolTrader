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

  public errorMessage = "";
  public successMessage = "Your post has been uploaded!";
  public isError = false;
  public isSuccess = false;

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

  verifyEmail(email) {
    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return mailformat.test(email);
  }

  validPosting() {
    if (this.postModel.adTitle == "") {
      this.errorMessage = "A title is requied";
      return false;
    } else if (this.postModel.description.length < 20) {
      this.errorMessage = "Description must be at least 20 characters";
      return false;
    } else if (this.postModel.address == "") {
      this.errorMessage = "Please provide an Address";
      return false;
    } else if (this.postModel.phone == "") {
      this.errorMessage = "A phone number is required";
      return false;
    } else if (!this.verifyEmail(this.postModel.email)) {
      this.errorMessage = "A valid email is required";
      return false;
    }
    return true;
  }

  tryPost() {
    this.isError = false;
    this.updatePostModel();
    if (this.validPosting()) {
      this.postService.createPost(this.postModel);
      this.postForm.reset();
      this.isSuccess = true;
    } else {
      this.isError = true;
    }
    
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