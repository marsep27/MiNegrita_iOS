import { getTestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { SignInWithApple, AppleSignInResponse, AppleSignInErrorResponse, ASAuthorizationAppleIDRequest } from '@ionic-native/sign-in-with-apple/ngx';
import { Platform, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { Vibration } from '@ionic-native/vibration/ngx';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  app_uid: string;
  app_user: string;

  constructor(public auth: AuthService,
    private fb: Facebook,
    private gp: GooglePlus,
    public router: Router,
    public platform: Platform,
    public Toast: ToastController,
    public loadingController: LoadingController,
    private vibra: Vibration,
    private apple: SignInWithApple) {

  }

  //Muestra en pantalla por unos segundos un spinner para indicar que la página se está cargando 
  async presentLoading() {
    const loading = await this.loadingController.create({
      cssClass: 'spinner',
      message: 'Espere por favor...',
      duration: 2000
    });
    await loading.present();

    const { role, data } = await loading.onDidDismiss();
    console.log('Loading dismissed!');
  }


  info() {
    this.auth.print();
    this.auth.loginUser("ana@gmail.com", "ana1234");
  }

  //Iniciar sesion con Facebook
  loginFacebook() {
    this.vibracion();
    if (this.platform.is("cordova")) { //Si la plaforma es coordova muestra la siguiente información
      this.auth.loginFacebook().then((res) => {
        this.presentLoading();
        var docRef = firebase.firestore().collection('usuarios').doc(res.user.uid);
        docRef.onSnapshot((async (doc) => {
          if (doc.exists) { //Si el usuario ya está registrado se dirige al perfil
            this.router.navigate(['/perfil']);
          } else {//Si el usuario no está registrado se dirige a terminar el registro
            this.router.navigate(['/registro-cuenta'],
              {
                queryParams: {
                  userData: res.user.uid,
                  name: res.user.displayName,
                  provedor: 'Facebook',
                  page: 'datos'
                }
              });
          }
        }))
      }).catch(e => console.log('Error logging into Facebook', e));
      /*this.fb.login(['public_profile', 'email']).then((res: FacebookLoginResponse) => {
        const credential_fb = auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        var docRef = firebase.firestore().collection('usuarios').doc(res.authResponse.userID);
        docRef.onSnapshot((async(doc) => {
          if (doc.exists){
            this.router.navigate(['/perfil']);
          }else{
            this.router.navigate(['/registro-cuenta'], 
        { queryParams: {
          userData: res.authResponse.userID, 
          name: res,
          provedor: 'Facebook' } });
          }
        }))
      }).catch(e => console.log('Error logging into Facebook', e));*/
    } else { //Si la plaforma no es coordova muestra la siguiente información
      const provider = new firebase.auth.FacebookAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result => {
        this.presentLoading();
        var docRef = firebase.firestore().collection('usuarios').doc(result.user.uid);
        docRef.onSnapshot((async (doc) => {
          console.log(result.user);
          console.log(result.user.displayName);
          console.log(doc);
          if (doc.exists) {//Si el usuario ya está registrado se dirige al perfil
            this.router.navigate(['/perfil']);
          } else {//Si el usuario no está registrado se dirige a terminar el registro
            this.router.navigate(['/registro-cuenta'],
              {
                queryParams: {
                  userData: result.user.uid,
                  name: result.user.displayName,
                  provedor: 'Facebook',
                  page: 'datos'
                }
              });
          }
        })
        )
      }).catch(error => {
        console.log(error);
        this.toast();
      });
    }

  }

  facebook() {
    this.auth.loginFacebook().then(res => {
    }).catch
  }

  //Iniciar sesion con Google
  loginGoogle() {
    this.vibracion();
    if (this.platform.is("cordova")) {//Si la plaforma es cordova muestra la siguiente información
      this.auth.loginGoogle().then((res) => {
        this.presentLoading();
        var docRef = firebase.firestore().collection('usuarios').doc(res.user.uid);
        docRef.onSnapshot((async (doc) => {
          if (doc.exists) {//Si el usuario ya está registrado se dirige al perfil
            this.router.navigate(['/perfil']);
          } else {//Si el usuario no está registrado se dirige a terminar el registro
            this.router.navigate(['/registro-cuenta'],
              {
                queryParams: {
                  userData: res.user.uid,
                  name: res.user.displayName,
                  provedor: 'Google',
                  page: 'datos'
                }
              });
          }
        }))
      }).catch(e => console.log('Error logging into Google', e));
      /*this.gp.login({}).then(res => {
        console.log(res.userId)
        var docRef = firebase.firestore().collection('usuarios').doc(res.userId);
        alert(res.userId);
        docRef.onSnapshot((async (doc) => {
          if (doc.exists) {
            this.router.navigate(['/perfil']);
          } else {
            this.router.navigate(['/registro-cuenta'],
              {
                queryParams: {
                  userData: res.userId,
                  name: res.givenName,
                  lastname: res.familyName,
                  provedor: 'Google'
                }
              });
          }
        }))
      }).catch(err => {
        console.log(err);
        //this.toast();
      })*/
    } else { //Si la plaforma no es cordova muestra la siguiente información
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase.auth().signInWithPopup(provider).then(result => {
        this.presentLoading();
        var docRef = firebase.firestore().collection('usuarios').doc(result.user.uid);
        docRef.onSnapshot((async (doc) => {
          console.log(result.user);
          console.log(result.user.displayName);
          console.log(doc);
          if (doc.exists) {//Si el usuario ya está registrado se dirige al perfil
            this.router.navigate(['/perfil']);
          } else {//Si el usuario no está registrado se dirige a terminar el registro
            this.router.navigate(['/registro-cuenta'],
              {
                queryParams: {
                  userData: result.user.uid,
                  name: result.user.displayName,
                  provedor: 'Google',
                  page: 'datos'
                }
              });
          }
        })
        )
      }).catch(error => {
        console.log(error);
        this.toast();
      });
    }
  }

  //Iniciar sesion con Apple
  loginApple() {
    this.vibracion();
    if (this.platform.is("cordova")) {//Si la plaforma es cordova muestra la siguiente información
      this.apple.signin({requestedScopes: [ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName,ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail]
      }).then(async (res: AppleSignInResponse) => {
        const credential = new firebase.auth.OAuthProvider('apple.com').credential(res.identityToken);
        const response = await firebase.auth().signInWithCredential(credential).then(async ()=>{
          await firebase.auth().onAuthStateChanged(user=>{
            if(user){
              this.app_user= user.email;
              this.app_uid= user.uid;
            } 
          })
        })
        console.log('Login successful', response);
        console.log(JSON.stringify(res))
        this.presentLoading();
        var docRef = firebase.firestore().collection('usuarios').doc(this.app_uid);
        docRef.onSnapshot((async (doc) => {
          if (doc.exists) {//Si el usuario ya está registrado se dirige al perfil
              this.router.navigate(['/perfil']);
            } else {//Si el usuario no está registrado se dirige a terminar el registro
              this.router.navigate(['/registro-cuenta'],
                {
                  queryParams: {
                    userData: this.app_uid,
                    name: this.app_user,
                    provedor: 'Apple',
                    page: 'datos'
                  }
                });
            }
        }));
      });
    } else { //Si la plaforma no es cordova muestra la siguiente información
      this.apple.signin({ requestedScopes: [ ASAuthorizationAppleIDRequest.ASAuthorizationScopeFullName, ASAuthorizationAppleIDRequest.ASAuthorizationScopeEmail]})
        .then((result: AppleSignInResponse) => {
          // https://developer.apple.com/documentation/signinwithapplerestapi/verifying_a_user
          const user_data_apple = result;
          const credential = new firebase.auth.OAuthProvider('apple.com').credential(user_data_apple.identityToken);
          const response = firebase.auth().signInWithPopup(credential).then(
             firebase.auth().onAuthStateChanged(user => {
               this.app_uid = user.uid;
               this.app_user = user.displayName;
               console.log(this.app_uid, this.app_user);
             })
          )
        });
        this.presentLoading();
        var docRef = firebase.firestore().collection('usuarios').doc(this.app_uid);
        docRef.onSnapshot((async (doc) => {
          if (doc.exists) {//Si el usuario ya está registrado se dirige al perfil
            this.router.navigate(['/perfil']);
          } else {//Si el usuario no está registrado se dirige a terminar el registro
            this.router.navigate(['/registro-cuenta'],
              {
                queryParams: {
                  userData: this.app_uid,
                  name: this.app_user,
                  provedor: 'Apple',
                  page: 'datos'
                }
              });
          }
      }))
    }
  }

  //Toast que muestra un error al logearse con Facebook o Google
  async toast() {
    this.vibracion();
    const toast = await this.Toast.create({
      header: '¡Error de conexión! Intentá de nuevo.',
      position: "middle",
      color: "azul",
      duration: 5000,
    });
    toast.present();
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}