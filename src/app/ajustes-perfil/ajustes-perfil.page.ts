import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Platform, ToastController } from '@ionic/angular';
import { Vibration } from '@ionic-native/vibration/ngx';
import * as firebase from 'firebase';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';

@Component({
  selector: 'app-ajustes-perfil',
  templateUrl: './ajustes-perfil.page.html',
  styleUrls: ['./ajustes-perfil.page.scss'],
})
export class AjustesPerfilPage implements OnInit {

  constructor(
    public alertController: AlertController,
    private fb: Facebook,
    private gp: GooglePlus,
    public platform: Platform,
    private vibra: Vibration,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() { }

  //Botón de retroceso
  goBackDefault() {
    this.vibracion();
    this.router.navigate(['/perfil']);
  }

  //Mostrar PopUp de patrocinadores
  patrocinadores(){
    this.vibracion();
    document.getElementById("patrocinadores").style.bottom = "10vh";
    document.getElementById("headAju").style.filter = "blur(2px)";
    document.getElementById("contentAju").style.filter = "blur(2px)";
    document.getElementById("fooAdj").style.filter = "blur(2px)";
  }

  //Se miniza el popUp de los patrocinadores
  minimizePatrocinadores() {
    document.getElementById("patrocinadores").style.bottom = "-1000px";
    document.getElementById("headAju").style.filter = "none";
    document.getElementById("contentAju").style.filter = "none";
    document.getElementById("fooAdj").style.filter = "none";
  }

  //Alerta para cerrar sesión
  async presentLogOutAlert() {
    this.vibracion();
    const alert = await this.alertController.create({
      message: '¿Estás seguro de que querés cerrar sesión?',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.vibracion();
            //firebase logout
            console.log(firebase.auth().currentUser);
            if (this.platform.is("cordova")) {
              firebase.auth().signOut()
                .then(() => {
                  this.fb.logout();
                  this.gp.disconnect();
                  this.router.navigate(['/home']);
                })
                .catch(function (error) {
                  // An error happened.
                  console.log(error);
                });
            } else {
              firebase.auth().signOut()
                .then(() => { this.router.navigate(['/home']); })
                .catch(function (error) {
                  // An error happened.
                  console.log(error);
                });
            }
          }
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });

    await alert.present();
  }

  go(){
    this.vibracion();
    window.open("https://www.santuarionacional.org/");
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
