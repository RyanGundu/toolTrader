import { Observable } from 'rxjs/Observable';
import { PostModel } from './post.model';
import { FirebaseUserModel } from './user.model';
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } 
from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';

@Injectable()
export class PostService {
  postCollection : AngularFirestoreCollection<PostModel>;
  postCollectArray: AngularFirestoreCollection<PostModel>;
  userPost: AngularFirestoreCollection<PostModel>;
  posts : Observable<PostModel[]>;
  userPosts : Observable<PostModel[]>;
  userInfo: Observable<FirebaseUserModel[]>; //should be type FirebaseUserModel;
  lastVisible: any;
  globalFirst: any;
  firstVisible: any[] = [];
  flag: boolean;
  count: any;

  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth,
 ){
  this.postCollection = this.db.collection('post');
  this.lastVisible = "0";
  this.firstVisible.push("0");
  this.flag = false;

 }

 getCurrentUid() {
  return firebase.auth().currentUser.uid;
}

  getPosts(value:string) {

    this.postCollectArray = this.db.collection<PostModel>('post', ref => {
      ref.orderBy('datePosted', 'desc').startAfter(value).limit(5).get().then( (documentSnapshots) => {
        // Get the last visible document
        this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        // console.log('last', this.lastVisible);
      });
      return ref.orderBy('datePosted', 'desc').startAfter(value).limit(5);
    }); //
    this.posts = this.postCollectArray.valueChanges();
    return this.posts;
    
  }


  next() {

    this.postCollectArray = this.db.collection<PostModel>('post', ref => {
      ref.orderBy('datePosted', 'desc').startAfter(this.lastVisible).limit(5).get().then( (documentSnapshots) => {
        // Get the last visible document

        this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        if (!this.firstVisible.some((item) => item.id == documentSnapshots.docs[0].id)) {
          this.firstVisible.push(documentSnapshots.docs[0]);
        }
      });
      return ref.orderBy('datePosted', 'desc').startAfter(this.lastVisible).limit(5);
    }); //

    this.posts = this.postCollectArray.valueChanges();
    return this.posts;
    
  }

  previous(pos:number) {

    this.postCollectArray = this.db.collection<PostModel>('post', ref => {
      ref.orderBy('datePosted', 'desc').startAt(this.firstVisible[pos]).limit(5).get().then( (documentSnapshots) => {
        // Get the last visible document

        this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
        // console.log('last', this.lastVisible);
      });
      return ref.orderBy('datePosted', 'desc').startAt(this.firstVisible[pos]).limit(5);
    }); //

    this.posts = this.postCollectArray.valueChanges();
    return this.posts;
    
  }


  getUserPosts() {
    this.userPost = this.db.collection<PostModel>('post', ref => ref.where("uid", "==", this.getCurrentUid()))
    this.userPosts = this.userPost.valueChanges();
    return this.userPosts;
  }

  getUserInfo() {
    this.userInfo = this.db.collection<FirebaseUserModel>('user', ref => ref.where("uid", "==", this.getCurrentUid()));
    this.userInfo = this.userInfo.valueChanges();
    return this.userInfo;
  }

  

  createPost(post: PostModel) {
    var userID = firebase.auth().currentUser.uid;
    const id = this.db.createId();
    const timestamp = firebase.firestore.FieldValue.serverTimestamp();
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

