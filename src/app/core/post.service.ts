import { PostModel } from './post.model';
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } 
from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class PostService {
  postCollection : AngularFirestoreCollection<PostModel>;
  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth,
 ){
  this.postCollection = this.db.collection('post');

 }

  createPost(post: PostModel) {
    var userID = firebase.auth().currentUser.uid;
    const id = this.db.createId();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp()
    this.postCollection.doc(id).set({
    postType: post.postType,
    adTitle : post.adTitle,
    description : post.description,
    price : post.price,
    availability : post.availability,
    address : post.address,
    images : post.images,
    keyword : post.keyword,
    phone : post.phone,
    email : post.email,
    priceNumber : post.priceNumber,
    uid: userID,
    datePosted : timestamp
  })
  }

}

