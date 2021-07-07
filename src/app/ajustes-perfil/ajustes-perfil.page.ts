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
    private route: ActivatedRoute,
    public Toast: ToastController){}

  ngOnInit() { }

  //Botón de retroceso
  goBackDefault() {
    this.vibracion();
    this.router.navigate(['/perfil']);
  }

  //Mostrar PopUp de Contacto y soporte
  contactsoport(){
    this.vibracion();
    document.getElementById("contactsoport").style.bottom = "43vh";
    document.getElementById("headAju").style.filter = "blur(5px)";
    document.getElementById("contentAju").style.filter = "blur(5px)";
    document.getElementById("fooAdj").style.filter = "blur(5px)";
  }

  //Se miniza el popUp de los Contacto y soporte
  minimizeContactsoport() {
    document.getElementById("contactsoport").style.bottom = "-1000px";
    document.getElementById("headAju").style.filter = "none";
    document.getElementById("contentAju").style.filter = "none";
    document.getElementById("fooAdj").style.filter = "none";
  }

  //Mostrar PopUp de Legal
  legal(){
    this.vibracion();
    document.getElementById("legal").style.bottom = "21vh";
    document.getElementById("headAju").style.filter = "blur(5px)";
    document.getElementById("contentAju").style.filter = "blur(5px)";
    document.getElementById("fooAdj").style.filter = "blur(5px)";
  }

  //Se miniza el popUp de los Contacto y soporte
  minimizeLegal() {
    document.getElementById("legal").style.bottom = "-1000px";
    document.getElementById("headAju").style.filter = "none";
    document.getElementById("contentAju").style.filter = "none";
    document.getElementById("fooAdj").style.filter = "none";
  }

  //Mostrar PopUp de patrocinadores
  patrocinadores(){
    this.vibracion();
    document.getElementById("patrocinadores").style.bottom = "5vh";
    document.getElementById("headAju").style.filter = "blur(5px)";
    document.getElementById("contentAju").style.filter = "blur(5px)";
    document.getElementById("fooAdj").style.filter = "blur(5px)";
  }

  //Se miniza el popUp de los patrocinadores
  minimizePatrocinadores() {
    document.getElementById("patrocinadores").style.bottom = "-1000px";
    document.getElementById("headAju").style.filter = "none";
    document.getElementById("contentAju").style.filter = "none";
    document.getElementById("fooAdj").style.filter = "none";
  }

  //Función para copiar al portapapeles del dispositivo
  copiarAlPortapapeles() {
    var aux = document.createElement("input");
      aux.setAttribute("value", 'minegrita@santuarionacional.org');
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.presentToast();
  }

//Toast para indicar que el correo ha sido copiado
  async presentToast() {
    this.vibracion();
    const toast = await this.Toast.create({
      header: '¡Copiado en el portapapeles!',
      color: "azul",
      position: "middle",
      duration: 2000,
    });
    toast.present();
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
