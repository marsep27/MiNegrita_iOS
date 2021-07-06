import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from './../services/firestore/firestore.service';
import { AlertController, ToastController, Platform } from '@ionic/angular';
import { Component, NgZone, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { Pedometer } from '@ionic-native/pedometer/ngx';
import { Vibration } from '@ionic-native/vibration/ngx';
import { take } from 'rxjs/operators';
import * as firebase from 'firebase';


@Component({
  selector: 'app-continuar-romeria',
  templateUrl: './continuar-romeria.page.html',
  styleUrls: ['./continuar-romeria.page.scss'],
})
export class ContinuarRomeriaPage {

  contentLoaded = false;

  currentRomeria:      any;
  pasos:               boolean = true;
  romeriaData:         any;
  romeriasCompletadas: number;
  totalHoras:          number;
  totalKm:             number;
  totalPasos:          number;


  Play:  boolean = false;
  Pause: boolean = false;

  accelerometer: any;
  public accX:   number;
  public accY:   number;
  public accZ:   number;
  magnitud:      number;
  magNoG:        number;
  magNoGfinal:   number;


  start:         boolean;
  PedometerData: any;
  PasosIncial    = 0;
  PasosTotal     = 0;
  PasosCurr      = 0;
  medidaPaso     = 0.000600;

  timeout   = 0;
  timeConteoAtras = 0;
  progress: number;
  kmTotal: number; //Km final

  startTime: Date;
  TimePause: Date;
  currTime:  number;
  velocidad  = 0.00138889;
  kmInicial: number; //Km al inicio de la romería
  kmCurr:    number; //km para el retroceso de km restantes
  currSeg:   number; //Segundos para sumar o restar los km

  get currtime() { return this.getCurrentTime(this.startTime, this.TimePause) }

  private currentUserId: String;
  private romeriaActiva: boolean;

  private proposito:    string;
  private puntoPartida: string;
  private tipoRomeria:  string;
  private romeria:      boolean;
  private finished:     boolean;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private deviceMotion: DeviceMotion,
    private vibra: Vibration,
    private pedometer: Pedometer,
    private firestoreService: FirestoreService,
    public alertController: AlertController,
    public platform: Platform,
    private firestore: AngularFirestore,
    private Toast: ToastController
  ) {
    this.currentRomeria = { empty: true }
    this.romeriaData = { empty: true }
    //Simulate data loading in
    setTimeout(() => {
      this.contentLoaded = true
    }, 2000);
  }

  ionViewWillEnter() {
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
      romeriaActiva: info.romeriaActiva,
      play: info.play,
      pause: info.pause,
      finalizada: info.finalizada,
      tipoRomeria: info.tipoRomeria,
      proposito: info.proposito,
      puntoPartida: info.puntoPartida,
      progreso: info.progreso,
      kmConteo: info.kmConteo,
      kmRestantes: info.kmRestantes,
      kmTotal: info.kmTotal,
      timeConteo: info.timeConteo,
      timeConteoAtras: info.timeConteoAtras,
      timeTotalMs: info.timeTotalMs,
      pasosConteo: info.pasosConteo,
      pasosRestantes: info.pasosRestantes,
      pasosTotal: info.pasosTotal
    }
    if (!info.finalizada) {
      this.currentRomeria =
      {
        romeriaActiva: info.romeriaActiva,
        play: info.play,
        pause: info.pause,
        finalizada: info.finalizada,
        tipoRomeria: info.tipoRomeria,
        proposito: info.proposito,
        puntoPartida: info.puntoPartida,
        progreso: info.progreso,
        kmConteo: info.kmConteo,
        kmRestantes: info.kmRestantes,
        kmTotal: info.kmTotal,
        timeConteo: info.timeConteo,
        timeConteoAtras: info.timeConteoAtras,
        timeTotalMs: info.timeTotalMs,
        pasosConteo: info.pasosConteo,
        pasosRestantes: info.pasosRestantes,
        pasosTotal: info.pasosTotal
      }
      this.Play = this.currentRomeria.play;
      this.Pause = this.currentRomeria.pause;
      this.romeriaActiva = this.currentRomeria.romeriaActiva;
      this.finished = this.currentRomeria.finalizada;
      this.tipoRomeria = this.currentRomeria.tipoRomeria;
      this.proposito = this.currentRomeria.proposito;
      this.puntoPartida = this.currentRomeria.puntoPartida;
      this.progress = this.currentRomeria.progreso;
      if (this.currentRomeria.tipoRomeria == 'pasos') { //Si el tipo de romeria es por pasos se cargan los datos de pasos.
        this.pasos = true;
        this.Play = this.currentRomeria.play;
        this.timeout = this.currentRomeria.timeTotalMs;
        this.PasosIncial = this.currentRomeria.pasosConteo;
        this.PasosTotal = this.currentRomeria.pasosTotal;
        this.PasosCurr = this.currentRomeria.pasosRestantes;
        this.kmTotal = this.currentRomeria.kmTotal;
        this.kmInicial = Math.round(this.currentRomeria.kmConteo * 10) / 10;
        this.kmCurr = Math.round(this.currentRomeria.kmRestantes * 10) / 10;
        console.log(this.romeriaActiva);
        console.log(this.pasos);
        console.log("km Inicial" + this.kmInicial);
        console.log("km Curr" + this.kmCurr);
      } else {//Sino se cargan los datos por tiempo.
        this.pasos = false;
        this.PasosTotal = this.currentRomeria.pasosTotal;
        this.currTime = this.currentRomeria.timeConteo;
        this.timeout = this.currentRomeria.timeTotalMs;
        this.timeConteoAtras = this.currentRomeria.timeConteoAtras;
        this.kmTotal = this.currentRomeria.kmTotal;
        this.kmInicial = Math.round(this.currentRomeria.kmConteo * 10) / 10;
        this.kmCurr = Math.round(this.currentRomeria.kmRestantes * 10) / 10;
        this.currSeg = this.currentRomeria.timeConteo / 1000;
        console.log("Segund" + this.currSeg);
        console.log(this.romeriaActiva);
        console.log(this.pasos);
        console.log("km Inicial :" + this.kmInicial);
        console.log("km Curr :" + this.kmCurr);
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
    this.romeria = this.romeriaData.romeriaActiva,
      this.romeriasCompletadas = this.romeriaData.romeriasCompletadas,
      this.totalHoras = this.romeriaData.horasTotales,
      this.totalPasos = this.romeriaData.pasosTotales,
      this.totalKm = this.romeriaData.kmTotales
  }

  //Botón de retroceso
  back() {
    this.vibracion();
    this.continuarOSalir();
  }

  //Lanza una alerta para detener la Romería
  async continuarOSalir() {
    const alert = await this.alertController.create({
      message: '¿Querés pausar la romería?',
      buttons: [
        {
          text: 'Pausar',
          handler: () => {
            this.vibracion();
            this.confirmarBack();
          }
        },
        {
          text: 'Continuar',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  //se confirma si se desea detener la Romería
  async confirmarBack() {
    const alert = await this.alertController.create({
      message: 'Si pausás la romería, no se contará más el progreso. ¿Querés salir de la pantalla actual?',
      buttons: [
        {
          text: 'Salir',
          handler: () => {
            if (this.currentRomeria.tipoRomeria == "pasos") {
              this.pausePasos();
              this.router.navigate(['/romeria']);
            } else {
              if (this.Play == false && this.Pause == false) {
                this.router.navigate(['/romeria']);
              } else {
              this.pauseTime();
              this.router.navigate(['/romeria']);
            }
            }
          }
        },
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });

    await alert.present();
  }

  //Se presenta un toast para indicar que la romería esta en pausa.
  async presentToastPause() {
    this.vibracion();
    const toast = await this.Toast.create({
      header: '¡Acabás de pausar la romería!',
      position: "middle",
      color: "azul",
      duration: 2000,
    });
    toast.present();
  }

  //Se obtienen los pasos por medio del acelerometro.
  Accelerometer() {
    this.deviceMotion.getCurrentAcceleration().then(
      (acceleration: DeviceMotionAccelerationData) =>
        console.log(acceleration),

      (error: any) => console.log(error)
    );

    //Watch device acceleration
    this.accelerometer = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => {
      this.accX = acceleration.x;
      this.accY = acceleration.y;
      this.accZ = acceleration.z;
      this.magnitud = Math.sqrt((Math.abs(this.accX)) ^ 2 + (Math.abs(this.accY)) ^ 2 + (Math.abs(this.accZ)) ^ 2);
      this.magNoG = this.magnitud - (this.magnitud / 2);
      this.magNoGfinal = this.magNoG / 2;
      this.PasosIncial = Math.round(this.PasosIncial + this.magNoGfinal);
      this.progress = this.PasosIncial / this.PasosTotal;
      if (this.PasosIncial > this.PasosTotal) {
        this.romeria = false;
        this.romeriaActiva = false;
        this.finished = true;
        this.pausePasos();//Poner todo en cero
        const userId = firebase.auth().currentUser.uid;
        const refUser = this.firestore.collection('usuarios').doc(userId);
        this.romeriasCompletadas = + (this.romeriasCompletadas + 1);
        this.totalHoras = + (this.totalHoras + this.currentRomeria.timeTotalMs);
        this.totalPasos = + (this.totalPasos + this.PasosTotal);
        this.totalKm = + (this.totalKm + this.kmTotal);
        const updateData = {
          usuario: refUser.ref,
          romeriasCompletadas: this.romeriasCompletadas,
          totalHoras: this.totalHoras,
          pasosTotales: this.totalPasos,
          kmTotales: this.totalKm,
          romeriaActiva: false
        };
        this.firestoreService.updateRomeriaXUser(userId, updateData);
        this.vibracionFinal();
        this.router.navigate(['/romeria']);
      } else {
        this.PasosCurr = this.PasosTotal - this.PasosIncial;
        document.getElementById('PasosRestantes').innerHTML = this.PasosCurr.toFixed(0);
        this.getCurrentKmSteps();
        this.getFinalKmSteps();
        this.update()//Poner DB
      }
    });

  }

  //Función para iniciar el conteo de pasos
  playPasos() {
    this.vibracion();
    this.Play = true;
    this.Accelerometer();
    //this.pedometer.startPedometerUpdates()
    //.subscribe((PedometerData) => {
    //this.PedometerData = PedometerData;
    //this.ngZone.run(() => {
    //this.PasosIncial = this.PedometerData.numberOfSteps;
    //this.PasosCurr = this.PasosTotal - this.PasosIncial;
    //this.kmInicial = + Math.round(this.PasosIncial * this.medidaPaso);
    //document.getElementById('CuentaAdelanteKPTop').innerHTML = this.kmInicial.toFixed(1);
    //document.getElementById('CuentaAdelantPKm').innerHTML = this.kmInicial.toFixed(1);
    //this.kmCurr = (this.kmTotal - (this.PasosIncial * this.medidaPaso));
    //document.getElementById('CuentaAtrasPKm').innerHTML = this.kmCurr.toFixed(1);
    //});
    //});
  }

  //Función para pausar el conteo de pasos
  pausePasos() {
    if (this.Play != false) {
      this.presentToastPause()
      this.accelerometer.unsubscribe;
      this.accX = 0;
      this.accY = 0;
      this.accZ = 0;
      //this.pedometer.stopPedometerUpdates();

      this.Play = false;
      this.update()//Poner DB
    } else {
      //this.pedometer.stopPedometerUpdates();
      this.Play = false;
    }
  }

  //Función para obtener los kilometros dados
  getCurrentKmSteps() {
    console.log('StepKmC 1: ' + this.kmInicial);
    this.kmInicial = + (this.PasosIncial * this.medidaPaso);
    console.log('StepKmC 2: ' + this.kmInicial);
    this.kmInicial = Math.round(this.kmInicial * 10) / 10;
    console.log('StepKmC 3: ' + this.kmInicial);
  }

  //Función para obtener los kilometros restantes
  getFinalKmSteps() {
    console.log('StepKmF 1: ' + this.kmCurr);
    this.kmCurr = Math.round((this.kmTotal - this.kmInicial) * 10) / 10;
    console.log('StepKmF 2: ' + this.kmCurr);
  }

  //Se obtiene el conteo del tiempo
  timer() {
    console.log(this.getCurrentTime(this.startTime, this.TimePause));
    if ((this.currSeg * 1000) > this.timeout) {
      this.romeria = false;
      this.romeriaActiva = false;
      this.finished = true;
      this.pauseTime();
      //Poner todo en cero
      const userId = firebase.auth().currentUser.uid;
      const refUser = this.firestore.collection('usuarios').doc(userId);
      this.romeriasCompletadas = + (this.romeriasCompletadas + 1);
      this.totalHoras = + (this.totalHoras + this.currentRomeria.timeTotalMs);
      this.totalPasos = + (this.totalPasos + this.PasosTotal);
      this.totalKm = + (this.totalKm + this.kmTotal);
      const updateData = {
        usuario: refUser.ref,
        romeriasCompletadas: this.romeriasCompletadas,
        totalHoras: this.totalHoras,
        pasosTotales: this.totalPasos,
        kmTotales: this.totalKm,
        romeriaActiva: false
      };
      this.firestoreService.updateRomeriaXUser(userId, updateData);
      this.vibracionFinal();
      this.router.navigate(['/romeria']);
    } else if (this.Play && !this.Pause) {
      this.progress = (this.currSeg * 1000) / this.timeout;
      console.log("Progreso :" + this.progress);
      //contar el tiempo hacia atrás
      this.timeConteoAtras = this.timeout - this.currTime;
      this.getKm();
      this.TimePause = new Date()
      setTimeout(() => {
        this.timer()
      }, 1000);
      this.update()//Poner DB
    }
  }

  //Función para iniciar el conteo del tiempo
  playTime() {
    this.vibracion();
    this.startTime = new Date()
    console.log(this.startTime)
    this.TimePause = this.TimePause
    this.currTime = this.currentRomeria.timeConteo;
    this.Play = true
    this.timer()
  }

  //Función para pausar el conteo del tiempo
  pauseTime() {
    if (this.Pause != true) {
      this.presentToastPause()
      this.Pause = true
      this.TimePause = new Date()
      console.log(this.TimePause)
      this.currTime = this.getCurrentTime(this.startTime, this.TimePause)
      console.log(this.currTime)
      this.update()//Poner DB 
    } else {
      this.Pause = true
      console.log("Devolverse sin borar")
    }
  }

  //Función para continuar con el conteo del tiempo
  continueTime() {
    this.vibracion();
    this.startTime = new Date(+new Date() - this.currTime)
    console.log(this.startTime)
    this.Pause = false
    this.timer()
  }

  //Función para obtener Tiempo exacto de conteo
  getCurrentTime(start, stop) {
    return (start && stop) ? +stop - +start : 0
  }

  //Función que obtiene los kilometros recorridos y restantes
  getKm() {
    this.currSeg = +(this.currSeg + 1);
    console.log("segundos :" + this.currSeg);
    this.getCurrentKmTime();
    this.getFinalKmTime();
  }
  
  //Función que obtiene los kilometros recorridos
  getCurrentKmTime() {
    if (this.kmInicial >= this.kmTotal) {
      this.kmInicial = this.kmTotal;
      document.getElementById('CuentaAdelanteKmTop').innerHTML = this.kmInicial.toFixed(1);
      document.getElementById('CuentaAdelanteKm').innerHTML = this.kmInicial.toFixed(1);
    } else {
      this.kmInicial = + (this.currSeg * this.velocidad);
      document.getElementById('CuentaAdelanteKmTop').innerHTML = this.kmInicial.toFixed(1);
      document.getElementById('CuentaAdelanteKm').innerHTML = this.kmInicial.toFixed(1);
      console.log('voy en: ' + this.kmInicial);
    }

  }

  //Función que obtiene los kilometros restantes
  getFinalKmTime() {
    if (this.kmCurr <= 0) {
      this.kmCurr = 0.0;
      document.getElementById('CuentaAtrasKm').innerHTML = this.kmCurr.toFixed(1);
      console.log('final 1: ' + this.kmCurr);
    } else {
      this.kmCurr = (this.kmTotal - this.kmInicial);
      document.getElementById('CuentaAtrasKm').innerHTML = this.kmCurr.toFixed(1);
      console.log('final 2: ' + this.kmCurr);
    }
  }

  //Función que pone actualiza todo en la base de datos.
  update() {
    const userId = firebase.auth().currentUser.uid;
    const refUser = this.firestore.collection('usuarios').doc(userId);
    const updatedData = {
      usuario: refUser.ref,
      play: this.Play,
      pause: this.Pause,
      romeriaActiva: this.romeriaActiva,
      finalizada: this.finished,
      tipoRomeria: this.tipoRomeria,
      proposito: this.proposito,
      puntoPartida: this.puntoPartida,
      progreso: this.progress,
      kmConteo: this.kmInicial,
      kmRestantes: this.kmCurr,
      kmTotal: this.kmTotal,
      timeConteo: this.currtime,
      timeConteoAtras: this.timeConteoAtras,
      timeTotalMs: this.timeout,
      pasosConteo: this.PasosIncial,
      pasosRestantes: this.PasosCurr,
      pasosTotal: this.PasosTotal
    };
    console.log(updatedData);
    this.firestoreService.updateRomeria(userId, updatedData);
  }

  vibracionFinal(){
    this.vibra.vibrate([200 , 300 , 300, 300, 500]);
  }

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}