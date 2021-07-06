import { AngularFirestore } from '@angular/fire/firestore';
import { AlertController, Platform } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../services/firestore/firestore.service';
import { take } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Vibration } from '@ionic-native/vibration/ngx';
import * as firebase from 'firebase';

@Component({
  selector: 'app-romeria-perfil',
  templateUrl: './romeria-perfil.page.html',
  styleUrls: ['./romeria-perfil.page.scss'],
})
export class RomeriaPerfilPage {

  contentLoaded     = false;

  pasos             = true;
  activa:   boolean = false;
  romeria:          any;
  currentRomeria:   any;
  romeriaData:      any;
  cantidadRomerias: number;
  totalHoras:       number;
  totalKm:          number;
  totalPasos:       number;
  progress:         number;
  porcentaje:       number;
  page:             string;

  constructor(private firestoreService: FirestoreService, private vibra: Vibration,
    private route: ActivatedRoute,private router: Router, private firestore: AngularFirestore,public platform: Platform, public alertController: AlertController,) {
    this.currentRomeria = { empty: true };
    this.cantidadRomerias = 0;
    this.totalHoras = 0;
    this.totalKm = 0;
    this.totalPasos = 0;
    this.progress = 0;
    this.porcentaje = 0;
    this.romeriaData = { empty: true }
    //Simulate data loading in
    setTimeout(() => {
      this.contentLoaded = true
    }, 2000);
  }

  ionViewWillEnter() {
    this.route.queryParams.subscribe(params => {
      this.page = params['page'];
    });

    //Se carga la información de la romeria activa del usuario.
    firebase.firestore().collection('romerias').doc(firebase.auth().currentUser.uid).onSnapshot((romeriasSnapshot) => {
      const info = romeriasSnapshot.data();
      this.getRomeriaInfo(info);
    });

    /*this.firestoreService.getRomerias(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((romeriasSnapshot) => {
      const info = romeriasSnapshot.payload.data();
      this.getRomeriaInfo(info);
    });*/

    //Se carga la información de la romerias realizadas del usuario.
    firebase.firestore().collection('romeriaxusuario').doc(firebase.auth().currentUser.uid).onSnapshot((romSnapshot) => {
      const romeriaData = romSnapshot.data();
      this.getRomeriaData(romeriaData);
    });

    /*this.firestoreService.getRomeriaXUser(firebase.auth().currentUser.uid).pipe(take(1)).subscribe((romSnapshot) => {
      const romeriaData = romSnapshot.payload.data();
      this.getRomeriaData(romeriaData);
    });*/
  }

  //Se obtiene la información de la romeria activa del usuario.
  getRomeriaInfo = (info: any) => {
    this.currentRomeria =
    {
      proposito: info.proposito,
      TipoRomeria: info.tipoRomeria,
      progreso: info.progreso,
      pasosConteo: info.pasosConteo,
      pasosRestantes: info.pasosRestantes,
      pasosTotal: info.pasosTotal,
      timeConteo: info.timeConteo,
      timeConteoAtras: info.timeConteoAtras,
      timeTotalMs: info.timeTotalMs
    }

    if (!info.finalizada) {
      this.currentRomeria =
      {
        //conteo: info.conteo,
        //faltante: info.faltante,
        //partida: info.partida,
        //medida: info.medida
        proposito: info.proposito,
        TipoRomeria: info.tipoRomeria,
        progreso: info.progreso,
        pasosConteo: info.pasosConteo,
        pasosRestantes: info.pasosRestantes,
        pasosTotal: info.pasosTotal,
        timeConteo: info.timeConteo,
        timeConteoAtras: info.timeConteoAtras,
        timeTotalMs: info.timeTotalMs
      }
      if (this.currentRomeria.TipoRomeria == "horas") {
        this.pasos = false;
        this.calcTimeProgress();
      }
      else {
        this.pasos = true;
        this.calcStepsProgress();
      }
    }
  }

  //Se obtiene la información de la romerias realizadas del usuario.
  getRomeriaData = (info: any) => {
    this.romeriaData = {
      romeriaActiva: info.romeriaActiva,
      romeriasCompletadas: info.romeriasCompletadas,
      horasTotales: info.totalHoras,
      pasosTotales: info.pasosTotales,
      kmTotales: info.kmTotales
    }
    this.romeria = this.romeriaData.romeriaActiva;
    this.cantidadRomerias = this.romeriaData.romeriasCompletadas;
    this.totalHoras = Math.round((this.romeriaData.horasTotales / 1000 / 60 / 60) * 10) / 10;
    this.totalPasos = this.romeriaData.pasosTotales;
    this.totalKm = Math.round(this.romeriaData.kmTotales * 10) / 10;

    if (this.romeria == true){
      this.activa = true;
    }else{
      this.activa = false;
    }
  }

  //Calcula el progreso por tiempo
  calcTimeProgress() {
    //let currentHoursMinutes = this.currentRomeria.conteo.split(":");
    //let currentHours = Number(currentHoursMinutes[0])
    //let currentHoursToMinutes = currentHours*60;
    //let currentMinutes = Number(currentHoursMinutes[1]);
    //let currentTimeInMinutes = currentHoursToMinutes + currentMinutes;

    //let missingHoursMinutes = this.currentRomeria.faltante.split(":");
    //let missingHours = Number(missingHoursMinutes[0])
    //let missingHoursToMinutes = missingHours*60;
    //let missingMinutes = Number(missingHoursMinutes[1]);
    //let missingTimeInMinutes = missingHoursToMinutes + missingMinutes;

    //let objetivo = currentTimeInMinutes + missingTimeInMinutes;
    let currTime = this.currentRomeria.timeConteo;
    console.log("currTime: " + currTime);
    let timeout = this.currentRomeria.timeTotalMs;
    console.log("timeout: " + timeout);
    //this.progress = currentTimeInMinutes / objetivo;
    this.progress = currTime / timeout;
    console.log("progress: " + this.progress);
    this.porcentaje = Math.round(this.progress * 100);
    console.log("porcentaje: " + this.porcentaje);
  }

  //Calcula el progreso por pasos
  calcStepsProgress() {
    let currentSteps = Number(this.currentRomeria.pasosConteo);
    let missingSteps = Number(this.currentRomeria.pasosRestantes);

    //let objetivo = currentSteps + missingSteps;
    let pasosTotal = this.currentRomeria.pasosTotal;
    //this.progress = currentSteps / objetivo;
    this.progress = currentSteps / pasosTotal;

    this.porcentaje = Math.round(this.progress * 100);
  }

  //Eliminar la romería actual
  deleteRomeria() {
    this.vibracion();
    this.confirmarDelete();
    console.log("Borrar?")
  }

  //Alerta para borrar la romería actual
  async confirmarDelete() {
    const alert = await this.alertController.create({
      message: '¿Querés eliminar la romería actual?',
      buttons: [
        {
          text: 'SÍ',
          handler: () => {
            this.vibracion();
            this.confirmarBorradoDefnitivo()
          }
        },
        {
          text: 'NO',
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }
  //Alerta para confirmar borrar la romería actual
  async confirmarBorradoDefnitivo() {
    const alert = await this.alertController.create({
      message: 'Estás a punto de eliminar la romería actual',
      buttons: [
        {
          text: 'SÍ',
          handler: () => {
            this.vibracion();
            this.firestoreService.deleteRomeria(firebase.auth().currentUser.uid);
            this.romeria = false;
            const userId = firebase.auth().currentUser.uid;
            const refUser = this.firestore.collection('usuarios').doc(userId);
            const updateData = {
              usuario: refUser.ref,
              romeriasCompletadas: this.romeriaData.romeriasCompletadas,
              totalHoras: this.romeriaData.horasTotales,
              pasosTotales: this.romeriaData.pasosTotales,
              kmTotales: this.romeriaData.kmTotales,
              romeriaActiva: false
            };
            this.firestoreService.updateRomeriaXUser(userId, updateData);
            if (this.page == 'romería'){
              this.router.navigate(['/romeria'],
              {
                queryParams: {
                  romeria: this.romeria
                }
              });
            }else{
              this.router.navigate(['/perfil'],
              {
                queryParams: {
                  romeria: this.romeria
                }
              });
            }
          }
        },
        {
          text: 'NO',
          role: 'cancel',
        }
      ]
    });
    await alert.present();
  }

  back(){
    this.vibracion();
    if (this.page == 'romería'){
      this.router.navigate(['/romeria'])
    } else {
      this.router.navigate(['/perfil'])
    }
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
