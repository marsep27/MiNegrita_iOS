import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import * as firebase from 'firebase';

@Component({
  selector: 'app-donacion',
  templateUrl: './donacion.page.html',
  styleUrls: ['./donacion.page.scss'],
})
export class DonacionPage implements OnInit {

  private currentUserId: String;

  contentLoaded = false;

  BN:  any;
  CC:  any;
  CI:  any;
  SM:  any;
  SMS: any;

  constructor(private route: ActivatedRoute,
    public Toast: ToastController) {
    //Simulate data loading in
    setTimeout(() => {
      this.contentLoaded = true
    }, 2000);
  }

  ngOnInit() {
    //Se obtienen los números de cuenta de la Basílica
    firebase.firestore().collection('banco').doc('cuentas').onSnapshot((cuentaSnapshot) => {
      const info = cuentaSnapshot.data();
      this.BN = info.bancoNacional;
      this.CC = info.cuentaCliente;
      this.CI = info.cuentaIBAN;
      this.SM = info.SINPEMóvil;
      this.SMS = info.sinpesinguion;
      console.log(this.BN);
      console.log(this.CC);
      console.log(this.CI);
      console.log(this.SM);
      console.log(this.SMS);
    })
  }

  ionViewWillEnter() {
    //Se obtienen los números de cuenta de la Basílica
    firebase.firestore().collection('banco').doc('cuentas').onSnapshot((cuentaSnapshot) => {
      const info = cuentaSnapshot.data();
      this.BN = info.bancoNacional;
      this.CC = info.cuentaCliente;
      this.CI = info.cuentaIBAN;
      this.SM = info.SINPEMóvil;
      this.SMS = info.sinpesinguion;
      console.log(this.BN);
      console.log(this.CC);
      console.log(this.CI);
      console.log(this.SM);
      console.log(this.SMS);
    })
  }

  ionViewWillUnload() {
    //Se obtienen los números de cuenta de la Basílica
    firebase.firestore().collection('banco').doc('cuentas').onSnapshot((cuentaSnapshot) => {
      const info = cuentaSnapshot.data();
      this.BN = info.bancoNacional;
      this.CC = info.cuentaCliente;
      this.CI = info.cuentaIBAN;
      this.SM = info.SINPEMóvil;
      this.SMS = info.sinpesinguion;
      console.log(this.BN);
      console.log(this.CC);
      console.log(this.CI);
      console.log(this.SM);
      console.log(this.SMS);
    })
  }

  //Función para copiar al portapapeles del dispositivo
  copiarAlPortapapeles(id_elemento) {
    console.log(id_elemento);
    console.log(document.getElementById(id_elemento).innerHTML);
    var aux = document.createElement("input");
    if (document.getElementById(id_elemento).innerHTML == this.SM) {
      aux.setAttribute("value", this.SMS);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.presentToast();
    } else {
      aux.setAttribute("value", document.getElementById(id_elemento).innerHTML);
      document.body.appendChild(aux);
      aux.select();
      document.execCommand("copy");
      document.body.removeChild(aux);
      this.presentToast();
    }
  }

  //Toast para indicar que el número de cuenta ha sido copiado
  async presentToast() {
    const toast = await this.Toast.create({
      header: '¡Copiado en el portapapeles!',
      cssClass: 'copiar',
      position: "top",
      duration: 2000,
    });
    toast.present();
  }

}
