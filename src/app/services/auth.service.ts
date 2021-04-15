import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './user.model'; // optional

import { auth } from 'firebase';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Injectable({ providedIn: 'root' })
export class AuthService {

    user$: Observable<User>;

    constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router,
        private fb: Facebook,
        private google: GooglePlus
    ) {
      this.user$ = this.afAuth.authState.pipe(
        switchMap( user => {
          if(user){
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else{
          return of(null);
        }
       }
       )
      );      
    }
    
    async googleSignin() {
      const provider = new auth.GoogleAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user,"","");
    } 

    async facebookSignin() {
      const provider = new auth.FacebookAuthProvider();
      const credential = await this.afAuth.signInWithPopup(provider);
      return this.updateUserData(credential.user,"","");
    } 
    
    async register(email,password, name, lastname, displayName, photoURL) {
      const credential = await this.afAuth.createUserWithEmailAndPassword(email,password);
      this.updateUserData(credential.user, name, lastname);
      print();
      return this.router.navigate(['/registro-intenciones']);
    }  

    private updateUserData({ uid, email, displayName, photoURL }: User, name, lastname) {
      // Sets user data to firestore on login
      const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
  
      const data = { 
        uid, 
        email,
        name,
        lastname,
        displayName,
        photoURL
      } 
  
      return userRef.set(data, { merge: true })
  
    }
  
    async print(){
      
      const things = this.afs.collection('users').valueChanges();
      things.subscribe(console.log);
    }
  
    async signOut() {
      await this.afAuth.signOut();
      return this.router.navigate(['/']);
    }   

    loginUser(email, password) {
      return new Promise<any>((resolve, reject) => {
        this.afAuth.signInWithEmailAndPassword(email, password)
          .then(
            res => resolve(res),
            err => reject(err))
            return this.router.navigate(['/'])
      })
      return this.router.navigate(['/eventos']) 
    }
    
     loginFacebook(){
       return this.fb.login(['email', 'public_profile']).then((response: FacebookLoginResponse) => {
         const credential_fb = auth.FacebookAuthProvider.credential(response.authResponse.accessToken);
         return this.afAuth.signInWithCredential(credential_fb);
       })
     }

     loginGoogle(){
       return this.google.login({}).then( (result) => {
         const user_data_google = result;
         return this.afAuth.signInWithCredential(auth.GoogleAuthProvider.credential(null, user_data_google.accessToken));
       })
     }
    
     resetPassword(email: string){
      return this.afAuth.sendPasswordResetEmail(email);
     }

}
