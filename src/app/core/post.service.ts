import { Resolve } from '@angular/router';
import { PostModel } from './post.model';
import { ProfileModel } from './profile.model';
import { FirebaseUserModel } from './user.model';
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } 
from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import 'rxjs/Rx';


@Injectable()
export class PostService {
  postCollection : AngularFirestoreCollection<PostModel>;
  postCollectArray: AngularFirestoreCollection<PostModel>;
  userPost: AngularFirestoreCollection<PostModel>;
  posts : Observable<PostModel[]>;
  userPosts : Observable<PostModel[]>;
  userCollection: AngularFirestoreCollection<ProfileModel>;
  userInfo: Observable<ProfileModel[]>;
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

 search(term:string) {
  this.postCollectArray = this.db.collection<PostModel>('post', ref => {
    ref.orderBy('datePosted', 'desc').get().then( (documentSnapshots) => {
      // Get the last visible document
      this.lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
      // console.log('last', this.lastVisible);
    });
    return ref.orderBy('datePosted', 'desc');
  }); //
  this.posts = this.postCollectArray.valueChanges();
  return  this.posts.map(items => 
    items.filter(item => (item.description.includes(term) ||
    item.adTitle.includes(term))));
 }

 getCurrentUid() {
  return firebase.auth().currentUser.uid;
}

getPostCount() {
  return this.db.collection('postCount', ref => ref.where('countVal', '>', 0).orderBy('countVal', 'desc')).valueChanges();
}

getCurrentUsername() {
  return this.db.collection('user', ref => ref.where("uid", "==", this.getCurrentUid())).snapshotChanges();
}

addToPostCount() {
const sfDocRef = this.db.firestore.collection("postCount").doc("totalCount");

this.db.firestore.runTransaction(transaction => 
  transaction.get(sfDocRef)
  .then(sfDoc => {
    transaction.update(sfDocRef, { countVal: sfDoc.data().countVal + 1 });
  })).then(() => console.log("Transaction successfully committed!"))
.catch(error => console.log("Transaction failed: ", error));

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

  getUserPosts(userID: string) {
    this.postCollectArray = this.db.collection<PostModel>('post', ref => ref.where(userID ? "username" : "uid", "==", userID ? userID : this.getCurrentUid()).orderBy('datePosted', 'desc'));
    this.userPosts = this.postCollectArray.valueChanges();
    return this.userPosts;
  }

  getPost(postID) {
    this.postCollectArray = this.db.collection<PostModel>('post', ref => ref.where("postID", "==", postID));
    this.userPosts = this.postCollectArray.valueChanges();
    return this.userPosts;
  }

  getUserInfo(userinfo:string, flag:boolean) {
    this.userCollection = this.db.collection<ProfileModel>('userProfile', ref => ref.where(flag ? "username" : "uid", "==", userinfo));
    this.userInfo = this.userCollection.valueChanges();
    return this.userInfo;
  }

  createPost(post: PostModel) {
    var userID = firebase.auth().currentUser.uid;
    const id = this.db.createId();
    const postID = this.db.createId();
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
      datePosted : timestamp,
      postID: postID,
      username: post.username,
      urlArray: post.urlArray
    })
  }

}

