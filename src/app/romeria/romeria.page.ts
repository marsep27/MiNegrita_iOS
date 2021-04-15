import { FirestoreService } from './../services/firestore/firestore.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-romeria',
  templateUrl: './romeria.page.html',
  styleUrls: ['./romeria.page.scss'],
})
export class RomeriaPage {

  contentLoaded           = false;
  romeria:        boolean = false;
  finished:       boolean = false;
  currentRomeria: any;

  private currentUserId: String;
  private romeriaActiva: String;

  private proposito:    String;
  private puntoPartida: String;
  private tipoRomeria:  String;
  private fin:          String;

  constructor(private route: ActivatedRoute,
    private db: AngularFireDatabase,
    private router: Router,
    private firestoreService: FirestoreService,
    private firestore: AngularFirestore) {
    this.currentRomeria = { empty: true }
    //Simulate data loading in
    setTimeout(() => {
      this.contentLoaded = true
    }, 3000);
  }

  ionViewWillEnter() {

    //Carga los datos de la romería actual de usuario
    if (firebase.firestore().collection('romerias').doc(firebase.auth().currentUser.uid)) {
      firebase.firestore().collection('romerias').doc(firebase.auth().currentUser.uid).onSnapshot((romeriasSnapshot) => {
        const info = romeriasSnapshot.data();
        this.getRomeriaInfo(info);
      });
    } else {
      return
    };
  }

  //Se obtienen los datos de la romería actual de usuario
  getRomeriaInfo = (info: any) => {
    console.log(info);
    this.romeria = info.romeriaActiva;
    this.finished = info.finalizada;

    console.log("romeria:" + this.romeria);
    console.log("finalizada:" + this.finished);

    if (info.finalizada == false) {
      this.currentRomeria =
      {
        romeriaActiva: info.romeriaActiva,
        finalizada: info.finalizada
      }
      if (this.currentRomeria.romeriaActiva == true) {
        this.romeria = true;
        console.log(this.finished);
        console.log(this.romeria);
        if (this.currentRomeria.romeriaActiva == true) {
          this.finished = false;
        } else {
          this.finished = true;
        }
      }
      else {
        this.romeria = false;
        console.log(this.finished);
        console.log(this.romeria);
        if (this.currentRomeria.romeriaActiva == true) {
          this.finished = false;
        } else {
          this.finished = true;
        }
      }
    }

  }
  newRomeria() {
    //this.db.database.ref('user/'+this.currentUserId).set({romeria: this.romeria});
    //this.db.database.ref('user/'+this.currentUserId);
    //console.log(this.romeria);
    //this.db.database.ref('user/'+this.currentUserId).push({romeria: this.romeria});
    //var newPostKey = this.db.database.ref('user/'+this.currentUserId).child('romeria').push().key;
    //var updates = {};
    //updates['/romeria/' + newPostKey] = this.data;

    this.router.navigate(['/nueva-romeria']);
  }

  //Lleva al usuario a la ventana continuar-romería
  continuarRomeria() {
    this.router.navigate(['/continuar-romeria']);
  }

  //Lleva al usuario a la ventana romeria-perfil
  miRomeria() {
    this.router.navigate(['/romeria-perfil']);
  }

  //Elimina la romería actual de
  deleteRomeria() {
    this.finished = false;
    this.firestoreService.deleteRomeria(firebase.auth().currentUser.uid);
    this.router.navigate(['/romeria']);
  }

}
