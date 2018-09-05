import { ProfileModel } from './profile.model';
import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/toPromise';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Injectable()
export class ProfileService {
  userProfileCollection : AngularFirestoreCollection<ProfileModel>;
  constructor(
   public db: AngularFirestore,
   public afAuth: AngularFireAuth
 ){
  this.userProfileCollection = this.db.collection('userProfile');

 }

  createUserProfile(userProfile: ProfileModel) {
    var userID = firebase.auth().currentUser.uid;
    const id = this.db.createId();
    this.userProfileCollection.doc(id).set({
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        address: userProfile.address,
        phoneNumber: userProfile.phoneNumber,
        email: userProfile.email,
        uid: userID,
        imgURL: userProfile.imgURL
    })
  }

}

