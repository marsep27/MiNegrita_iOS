import { async } from '@angular/core/testing';
import { DeviceMotionAccelerationData } from '@ionic-native/device-motion/ngx';
import { AngularFirestore } from '@angular/fire/firestore';
import { FirestoreService } from './../services/firestore/firestore.service';
import { AlertController, Platform } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { AngularFireDatabase } from '@angular/fire/database';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/auth';
import { Component, OnInit } from '@angular/core';
import { Vibration } from '@ionic-native/vibration/ngx';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nueva-romeria',
  templateUrl: './nueva-romeria.page.html',
  styleUrls: ['./nueva-romeria.page.scss'],
})
export class NuevaRomeriaPage implements OnInit{

  pasos:               boolean = true; 
  finalizada                   = false;
  romeriaData:         any;
  ref:                 any;
  romeriasCompletadas: number;
  TotalHoras:          number;
  TotalPasos:          number;
  TotalKm:             number;

  totalHoras:    number;
  pasosTotales:  number;
  kmTotales:     number;
  tipoRomeria    = "";
  progreso       = 0;
  kmTotal        = 0; 
  pasosTotal     = 0; 
  kmConteo       = 0;
  kmRestante     = 0;
  timeConteo     = 0;
  timeConteoAtras= 0;
  timeTotalMs    = 0;
  pasosConteo    = 0;
  pasosRestantes = 0;

  creaRomeria: any;

  private currentUserId: String;
  romeriaForm: FormGroup;
 
  diocesis = [];

  get proposito() {
    return this.romeriaForm.get('proposito');
  }

  get puntoPartida() {
    return this.romeriaForm.get('puntoPartida');
  }

  public errorMessages = {
    puntoPartida: [
      { type: 'require', message: 'Espacio obligatorio' },
    ]
  };

  text = [{ tex: '' }];
  public texx: String;

  private romeria: boolean;
  private finished: Boolean;
  disableButtonConfirmar: boolean = true;

  constructor(public alertController: AlertController,
    private auth: AngularFireAuth,
    private formBuilder: FormBuilder,
    public platform: Platform,
    private db: AngularFireDatabase,
    private router: Router,
    private route: ActivatedRoute,
    private firestoreService: FirestoreService,
    private firestore: AngularFirestore,
    private vibra: Vibration) { 
      this.romeriaData = { empty: true }
    }

  ngOnInit() {
    //Se obtienen los puntos de partida desde la base datos
    firebase.firestore().collection('partidasdeinicio').orderBy('orden').onSnapshot((diocesisSnapshot) => {
      this.diocesis = [];
      diocesisSnapshot.forEach(async(diocesisData: any) => {
        const diocesis = await diocesisData;
        console.log(diocesis.data().nombre);
        this.diocesis.push(
          {
            nombre: diocesis.data().nombre,
            horas: diocesis.data().horas,
            minutos: diocesis.data().minutos,
            tiempoMilisegundos: diocesis.data().tiempoMilisegundos,
            kmTotal: diocesis.data().kmTotal,
            pasosTotal: diocesis.data().pasosTotal
          },
        );
      });
    });

    /*this.firestoreService.getPuntosPartida().pipe(take(1)).subscribe((diocesisSnapshot) => {
      diocesisSnapshot.forEach(async (diocesisData: any) => {
        const diocesis = await diocesisData.payload.doc;
        this.diocesis.push(
          {
            nombre: diocesis.data().nombre,
            horas: diocesis.data().horas,
            minutos: diocesis.data().minutos,
            tiempoMilisegundos: diocesis.data().tiempoMilisegundos,
            kmTotal: diocesis.data().kmTotal,
            pasosTotal: diocesis.data().pasosTotal
          },
        );
      });
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

    this.romeriaForm = this.formBuilder.group({
      proposito: [''],
      puntoPartida: ['', [Validators.required]]
    })
  }

  //Se selecciona el punto de partida para la nueva romería
  Select() {
    this.vibracion();
    console.log(this.romeriaForm.controls['puntoPartida'].value);
    if (this.romeriaForm.controls['puntoPartida'].value == '') {
      this.text = [{ tex: 'Seleccioná un punto de partida válido.' }];
      this.disableButtonConfirmar = true;
    } else {
      switch (this.romeriaForm.controls['puntoPartida'].value){
        case this.romeriaForm.controls['puntoPartida'].value:
          firebase.firestore().collection('partidasdeinicio').orderBy('orden').onSnapshot((diocesisSnapshot) => {
            diocesisSnapshot.forEach(async(diocesisData: any) => {
              const diocesis = await diocesisData;
              if (diocesis.data().nombre == this.romeriaForm.controls['puntoPartida'].value){
                  this.timeTotalMs= diocesis.data().tiempoMilisegundos;
                  this.kmTotal = diocesis.data().kmTotal;
                  this.pasosTotal = diocesis.data().pasosTotal;
                  console.log(diocesis.data().nombre, this.timeTotalMs , this.kmTotal , this.pasosTotal);
              }
            });
          });
      }
      this.disableButtonConfirmar = false;
    }
  }

  //Se obtiene la información de la romerias realizadas del usuario.
  getRomeriaData = (info : any) => {
      this.romeriaData = {
        usuario: info.usuario,
        romeriaActiva: info.romeriaActiva,
        romeriasCompletadas: info.romeriasCompletadas,
        horasTotales: info.totalHoras,
        pasosTotales: info.pasosTotales,
        kmTotales: info.kmTotales
      }
      this.romeria = this.romeriaData.romeriaActiva,
      this.romeriasCompletadas = this.romeriaData.romeriasCompletadas,
      this.TotalHoras = this.romeriaData.horasTotales,
      this.TotalPasos = this.romeriaData.pasosTotales,
      this.TotalKm = this.romeriaData.kmTotales
      console.log(this.romeria);
      console.log(this.romeriasCompletadas);
      console.log(this.TotalHoras);
      console.log(this.TotalPasos);
      console.log(this.TotalKm);
  }

  //Cambia el progreso a pasos
  progressPasos() {
    this.vibracion();
    this.pasos = true;
    this.tipoRomeria = 'pasos';
    console.log(this.tipoRomeria);
  }

  //Cambia el progreso a horas
  progressTiempo() {
    this.vibracion();
    this.pasos = false;
    this.tipoRomeria = 'horas';
    console.log(this.tipoRomeria);
  }

  Clean() {
    this.text = [{ tex: '' }];
  }

  //Confirma la nueva romería
  confirm() {
    this.vibracion();
    if (this.romeriaForm.controls['puntoPartida'].value == this.diocesis['nombre']) {
      this.text = [{ tex: 'Seleccioná un punto de partida válido.' }];
    } else {
      if (this.tipoRomeria == "") {
        const userId = firebase.auth().currentUser.uid;
        this.romeria = true;
        this.tipoRomeria = 'pasos';
        console.log(userId, this.romeria, this.finalizada, this.tipoRomeria, this.romeriaForm.controls['proposito'].value, this.romeriaForm.controls['puntoPartida'].value, this.kmTotal, this.kmRestante, this.kmTotal, this.timeConteo, this.timeTotalMs, this.timeTotalMs, this.pasosConteo, this.pasosTotal, this.pasosTotal);
        this.firestoreService.createRomeria(userId, this.finalizada, this.finalizada, this.romeria, this.finalizada, this.tipoRomeria, this.romeriaForm.controls['proposito'].value, this.romeriaForm.controls['puntoPartida'].value, this.progreso, this.kmConteo, this.kmTotal, this.kmTotal, this.timeConteo, this.timeTotalMs, this.timeTotalMs, this.pasosConteo, this.pasosTotal, this.pasosTotal);
        const refUser = this.firestore.collection('usuarios').doc(userId);
        const updateData = {
          usuario: refUser.ref,
          romeriasCompletadas: this.romeriasCompletadas,
          totalHoras:  this.TotalHoras,
          pasosTotales:  this.TotalPasos,
          kmTotales:  this.TotalKm,
          romeriaActiva: this.romeria
        };
        this.firestoreService.updateRomeriaXUser(userId, updateData);
        this.router.navigate(['/romeria']);
      } else {
        const userId = firebase.auth().currentUser.uid;
        this.romeria = true;
        this.firestoreService.createRomeria(userId, this.finalizada, this.finalizada, this.romeria, this.finalizada, this.tipoRomeria, this.romeriaForm.controls['proposito'].value, this.romeriaForm.controls['puntoPartida'].value, this.progreso, this.kmConteo, this.kmTotal, this.kmTotal, this.timeConteo, this.timeTotalMs, this.timeTotalMs, this.pasosConteo, this.pasosTotal, this.pasosTotal);
        const refUser = this.firestore.collection('usuarios').doc(userId);
        const updateData = {
          usuario: refUser.ref,
          romeriasCompletadas: this.romeriasCompletadas,
          totalHoras:  this.TotalHoras,
          pasosTotales:  this.TotalPasos,
          kmTotales:  this.TotalKm,
          romeriaActiva: this.romeria
        };
        this.firestoreService.updateRomeriaXUser(userId, updateData);
        this.router.navigate(['/romeria']);
      }
    }
  }

  //Cancela la romería y los datos no se guardan
  async cancel() {
    this.vibracion();
    const alert = await this.alertController.create({
      message: '¿Estás seguro de que querés regresar? Se borrarán los datos.',
      buttons: [
        {
          text: 'Sí',
          handler: () => {
            this.vibracion();
            this.router.navigate(['/romeria']);
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

  vibracion(){
    if (this.platform.is("android")) {
      this.vibra.vibrate([50]);
    }
  }
}
