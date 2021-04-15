import { getTestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Platform, ToastController } from '@ionic/angular';
import * as firebase from 'firebase';
import { auth } from 'firebase';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  constructor(public auth: AuthService,
    private fb: Facebook,
    private gp: GooglePlus,
    public router: Router,
    public platform: Platform,
    public Toast: ToastController,
    public loadingController: LoadingController) {

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
                  provedor: 'Facebook'
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
                  provedor: 'Facebook'
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
    if (this.platform.is("cordova")) {//Si la plaforma es coordova muestra la siguiente información
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
                  provedor: 'Google'
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
    } else { //Si la plaforma no es coordova muestra la siguiente información
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
                  provedor: 'Google'
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

  //Toast que muestra un error al logearse con Facebook o Google
  async toast() {
    const toast = await this.Toast.create({
      header: 'Ya existe una cuenta con la misma dirección de correo electrónico, pero diferentes credenciales de inicio de sesión. Inicie sesión con un proveedor asociado a esta dirección de correo electrónico',
      position: "middle",
      color: "azul",
      duration: 5000,
    });
    toast.present();
  }

}