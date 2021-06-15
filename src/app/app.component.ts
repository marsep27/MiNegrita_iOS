import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });

    if (this.platform.is("cordova")) {
      this.platform.backButton.isStopped = true;
    } else {
      this.platform.backButton.isStopped = true;
    }

    

    //this.firestore.firestore.enablePersistence()

    //firebase.auth().onAuthStateChanged(function(user){
      //if (user) {
        // usuario está logueado.
        //location.replace('/perfil');
      //} else {
        // usuario NO está logueado.
        //location.replace('/home');
      //}
    //});

    //firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(function(){
      //return firebase.auth().signInWithEmailAndPassword();
    //});

  }

  
}
